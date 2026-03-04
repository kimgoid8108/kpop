import { NextResponse } from 'next/server';
import { CompleteMultipartUploadCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_BUCKET } from '@/lib/r2';

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
    const { uploadId, key, parts } = body || {};

    if (!uploadId || !key || !Array.isArray(parts) || parts.length === 0) {
      return NextResponse.json(
        { error: 'uploadId, key, parts are required' },
        { status: 400 }
      );
    }

    const sortedParts = [...parts]
      .filter((p) => p.partNumber && p.etag)
      .sort((a, b) => a.partNumber - b.partNumber)
      .map((p) => ({
        ETag: p.etag,
        PartNumber: p.partNumber,
      }));

    if (sortedParts.length === 0) {
      return NextResponse.json(
        { error: 'No valid parts provided' },
        { status: 400 }
      );
    }

    const command = new CompleteMultipartUploadCommand({
      Bucket: R2_BUCKET,
      Key: key,
      UploadId: uploadId,
      MultipartUpload: { Parts: sortedParts },
    });

    const result = await r2Client.send(command);

    return NextResponse.json({
      bucket: result.Bucket,
      key: result.Key,
      location: result.Location,
      etag: result.ETag,
    });
  } catch (err) {
    console.error('complete upload error', err);
    return NextResponse.json(
      { error: 'Failed to complete multipart upload' },
      { status: 500 }
    );
  }
}

