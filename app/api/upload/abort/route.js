import { NextResponse } from 'next/server';
import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
import { getR2Client, R2_BUCKET } from '@/lib/r2';
import { validateAdminToken } from '@/lib/adminAuth';

export async function POST(req) {
  if (!validateAdminToken(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { uploadId, key } = body || {};

    if (!uploadId || !key) {
      return NextResponse.json(
        { error: 'uploadId and key are required' },
        { status: 400 }
      );
    }

    const command = new AbortMultipartUploadCommand({
      Bucket: R2_BUCKET,
      Key: key,
      UploadId: uploadId,
    });

    await getR2Client().send(command);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('abort upload error', err);
    return NextResponse.json(
      { error: 'Failed to abort multipart upload (best-effort)' },
      { status: 500 }
    );
  }
}

