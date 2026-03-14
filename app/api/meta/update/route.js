import { NextResponse } from 'next/server';
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, R2_BUCKET } from '@/lib/r2';
import { getCourseMeta } from '@/lib/courseMeta';

function validateAdminToken(req) {
  const token = req.headers.get('x-admin-token');
  const expected = process.env.ADMIN_UPLOAD_TOKEN;
  return expected && token === expected;
}

/** 기존 R2 meta와 클라이언트가 보낸 meta를 병합. 기존 레슨을 유지하고 새 레슨만 추가/갱신 */
function mergeMeta(existing, incoming) {
  if (!existing || !incoming) return incoming || existing;
  const merged = {
    courseId: incoming.courseId ?? existing.courseId,
    title: incoming.title ?? existing.title,
    instructors: [...(existing.instructors || [])],
    levels: (existing.levels || []).map((lev) => ({
      ...lev,
      lessons: Array.isArray(lev.lessons) ? [...lev.lessons] : [],
    })),
  };

  const instrById = new Map((merged.instructors || []).map((i) => [i.instructorId, i]));
  (incoming.instructors || []).forEach((i) => {
    if (i?.instructorId && !instrById.has(i.instructorId)) {
      merged.instructors.push({ instructorId: i.instructorId, name: i.name ?? i.instructorId });
      instrById.set(i.instructorId, i);
    }
  });

  (incoming.levels || []).forEach((incomingLevel) => {
    const partId = incomingLevel?.partId;
    if (!partId) return;
    let level = merged.levels.find((l) => l.partId === partId);
    if (!level) {
      level = {
        partId,
        title: incomingLevel.title ?? partId,
        instructorIds: incomingLevel.instructorIds || [],
        lessons: [],
      };
      merged.levels.push(level);
    } else {
      level = { ...level };
      const idx = merged.levels.findIndex((l) => l.partId === partId);
      merged.levels[idx] = level;
      const existingIds = new Set((level.instructorIds || []));
      (incomingLevel.instructorIds || []).forEach((id) => existingIds.add(id));
      level.instructorIds = [...existingIds];
    }
    const lessonKey = (l) => `${l.lessonId}:${l.instructorId || ''}`;
    const byKey = new Map((level.lessons || []).map((l) => [lessonKey(l), l]));
    (incomingLevel.lessons || []).forEach((l) => {
      if (l?.lessonId != null) byKey.set(lessonKey(l), { ...l });
    });
    level.lessons = [...byKey.values()];
  });

  return merged;
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
    const existing = await getCourseMeta(courseId);
    const toWrite = mergeMeta(existing, meta);

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: JSON.stringify(toWrite, null, 2),
      ContentType: 'application/json; charset=utf-8',
    });

    await getR2Client().send(command);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('update meta error', err);
    return NextResponse.json(
      { error: 'Failed to update meta.json' },
      { status: 500 }
    );
  }
}

