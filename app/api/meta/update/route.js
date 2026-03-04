import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
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
    const { courseId, meta } = body || {};

    if (!courseId || !meta) {
      return NextResponse.json(
        { error: 'courseId and meta are required' },
        { status: 400 }
      );
    }

    const key = `courses/${courseId}/meta.json`;

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: JSON.stringify(meta, null, 2),
      ContentType: 'application/json; charset=utf-8',
    });

    await r2Client.send(command);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('update meta error', err);
    return NextResponse.json(
      { error: 'Failed to update meta.json' },
      { status: 500 }
    );
  }
}

