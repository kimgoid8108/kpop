import { NextResponse } from 'next/server';
import { AbortMultipartUploadCommand } from '@aws-sdk/client-s3';
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

    await r2Client.send(command);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('abort upload error', err);
    return NextResponse.json(
      { error: 'Failed to abort multipart upload (best-effort)' },
      { status: 500 }
    );
  }
}

