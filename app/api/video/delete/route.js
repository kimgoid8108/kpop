export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, R2_BUCKET, LEGACY_COURSE_TO_META } from '@/lib/r2';
import { getCourseMeta, findLesson, getMetaKey } from '@/lib/courseMeta';
import { validateAdminToken } from '@/lib/adminAuth';

export async function POST(req) {
  if (!validateAdminToken(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const raw = body || {};
    const courseId = (raw.courseId != null ? String(raw.courseId).trim() : '') || '';
    const partId = (raw.partId != null ? String(raw.partId).trim() : '') || '';
    const lessonId = (raw.lessonId != null ? String(raw.lessonId).trim() : '') || '';
    const instructorId = (raw.instructorId != null ? String(raw.instructorId).trim() : '') || null;

    if (!courseId || !partId || !lessonId) {
      return NextResponse.json(
        { error: 'courseId, partId, lessonId are required' },
        { status: 400 }
      );
    }

    const metaCourseId = LEGACY_COURSE_TO_META[courseId] ?? courseId;
    const meta = await getCourseMeta(metaCourseId);
    if (!meta) {
      return NextResponse.json(
        { error: '코스 메타를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const lesson = findLesson(meta, partId, lessonId, instructorId || undefined);
    if (!lesson) {
      return NextResponse.json(
        { error: '해당 레슨을 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const videoKey = lesson.videoKey;
    if (videoKey && typeof videoKey === 'string') {
      await getR2Client().send(
        new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: videoKey })
      );
    }

    const levels = Array.isArray(meta.levels) ? [...meta.levels] : [];
    const levelIndex = levels.findIndex((l) => l.partId === partId);
    if (levelIndex >= 0) {
      const level = { ...levels[levelIndex] };
      const removeKey = (l) => l.lessonId === lessonId && (!instructorId || l.instructorId === instructorId);
      level.lessons = Array.isArray(level.lessons)
        ? level.lessons.filter((l) => !removeKey(l))
        : [];
      levels[levelIndex] = level;
    }

    const updatedMeta = { ...meta, levels };
    const metaKey = getMetaKey(metaCourseId);
    const putCommand = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: metaKey,
      Body: JSON.stringify(updatedMeta, null, 2),
      ContentType: 'application/json; charset=utf-8',
    });
    await getR2Client().send(putCommand);

    return NextResponse.json({ success: true, deletedKey: videoKey || null });
  } catch (err) {
    console.error('video delete error', err);
    return NextResponse.json(
      { error: '영상 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
