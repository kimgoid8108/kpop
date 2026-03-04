import { NextResponse } from 'next/server';
import { CreateMultipartUploadCommand, UploadPartCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { r2Client, R2_BUCKET, buildVideoKey } from "@/lib/r2";

const PART_SIZE = 15 * 1024 * 1024; // 15MB
const PRESIGN_EXPIRES_IN = 6 * 60 * 60; // 6 hours

function validateAdminToken(req) {
  const token = req.headers.get('x-admin-token');
  const expected = process.env.ADMIN_UPLOAD_TOKEN;
  return expected && token === expected;
}

export async function POST(req) {
  if (!validateAdminToken(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { courseId, partId, instructorId, lessonId, fileSize, contentType } = body || {};

    if (!courseId || !partId || !instructorId || !lessonId || !fileSize) {
      return NextResponse.json(
        { error: 'courseId, partId, instructorId, lessonId, fileSize are required' },
        { status: 400 }
      );
    }

    const key = buildVideoKey(courseId, instructorId, partId, lessonId);
    const totalParts = Math.ceil(fileSize / PART_SIZE);

    const createCommand = new CreateMultipartUploadCommand({
      Bucket: R2_BUCKET,
      Key: key,
      ContentType: contentType || 'video/mp4',
    });

    const createResult = await r2Client.send(createCommand);

    const uploadId = createResult.UploadId;
    if (!uploadId) {
      return NextResponse.json(
        { error: 'Failed to create multipart upload' },
        { status: 500 }
      );
    }

    const presignedUrls = [];

    for (let partNumber = 1; partNumber <= totalParts; partNumber++) {
      const uploadPartCommand = new UploadPartCommand({
        Bucket: R2_BUCKET,
        Key: key,
        UploadId: uploadId,
        PartNumber: partNumber,
      });

      const url = await getSignedUrl(r2Client, uploadPartCommand, {
        expiresIn: PRESIGN_EXPIRES_IN,
      });

      presignedUrls.push({ partNumber, url });
    }

    return NextResponse.json({
      uploadId,
      key,
      partSize: PART_SIZE,
      totalParts,
      presignedUrls,
    });
  } catch (err) {
    console.error('initiate upload error', err);
    return NextResponse.json(
      { error: 'Failed to initiate multipart upload' },
      { status: 500 }
    );
  }
}

