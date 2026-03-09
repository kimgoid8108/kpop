export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getR2Client, R2_BUCKET } from '@/lib/r2';
import { getCourseMeta, findLesson } from '@/lib/courseMeta';

const PRESIGN_EXPIRES_IN = 60 * 60; // 1시간

// 목록/강의상세에서 쓰는 숫자 ID → R2 meta courseId
const LEGACY_COURSE_TO_META = {
  '1': 'dance', '2': 'dance', '3': 'dance', '4': 'dance', '5': 'dance',
  '7': 'dance', '8': 'dance',
  '6': 'music', '9': 'music', '10': 'music',
};

const PART_ORDER = ['lv-e', 'lv-m', 'lv-t'];

function toMetaIds(courseId, partId, lessonId) {
  const metaCourseId = LEGACY_COURSE_TO_META[courseId] ?? courseId;
  const partNum = parseInt(partId, 10);
  const lessonNum = parseInt(lessonId, 10);

  // 특수 케이스 1: 댄스 피트니스 강사수준 (courseId: 1)
  // - meta 상에서는 dance / lv-t 레벨 하나로 관리
  // - 화면에는 파트 1~N, 각 파트에 레슨 1~3
  // → (파트 번호, 레슨 번호)를 lv-t 안에서 l001, l002, l003... 순서로 매핑
  if (courseId === '1' && metaCourseId === 'dance' && !Number.isNaN(partNum) && !Number.isNaN(lessonNum)) {
    const lessonsPerPart = 3;
    const lessonIndexInLevel = (partNum - 1) * lessonsPerPart + (lessonNum - 1); // 0-based
    const metaPartId = 'lv-t';
    const metaLessonId = 'l' + String(lessonIndexInLevel + 1).padStart(3, '0');
    return { metaCourseId, metaPartId, metaLessonId };
  }

  // 특수 케이스 2: 슈퍼스타 K-POP 댄서 (courseId: 8) - 최성룡, 중등
  // - meta 상에서는 dance / lv-m 하나로 관리
  // - 파트 1~8, 각 파트에 레슨 1~2 → l001~l016
  if (courseId === '8' && metaCourseId === 'dance' && !Number.isNaN(partNum) && !Number.isNaN(lessonNum)) {
    const lessonsPerPart = 2;
    const lessonIndexInLevel = (partNum - 1) * lessonsPerPart + (lessonNum - 1);
    const metaPartId = 'lv-m';
    const metaLessonId = 'l' + String(lessonIndexInLevel + 1).padStart(3, '0');
    return { metaCourseId, metaPartId, metaLessonId };
  }

  // 특수 케이스 3: 음악 코스 중 "내가 바로 K-POP 스타" (id: 10)
  // - 초등(lv-e) 김온유 강사
  // - 파트 1~8, 각 파트에 레슨 1~2
  // → 전체를 lv-e 하나의 레벨로 보고,
  //   (파트 번호, 레슨 번호)를 순서대로 l001, l002, l003 ... 에 매핑
  if (courseId === '10' && metaCourseId === 'music' && !Number.isNaN(partNum) && !Number.isNaN(lessonNum)) {
    const lessonsPerPart = 2;
    const lessonIndexInLevel = (partNum - 1) * lessonsPerPart + (lessonNum - 1); // 0-based
    const metaPartId = 'lv-e';
    const metaLessonId = 'l' + String(lessonIndexInLevel + 1).padStart(3, '0');
    return { metaCourseId, metaPartId, metaLessonId };
  }

  let metaPartId =
    !Number.isNaN(partNum) && partNum >= 1 ? PART_ORDER[(partNum - 1) % PART_ORDER.length] ?? partId : partId;
  let metaLessonId = lessonId;

  if (!Number.isNaN(lessonNum)) {
    metaLessonId = 'l' + String(lessonNum).padStart(3, '0');
  } else if (/^\d+$/.test(lessonId)) {
    metaLessonId = 'l' + String(parseInt(lessonId, 10)).padStart(3, '0');
  }

  if (!PART_ORDER.includes(metaPartId)) {
    metaPartId = PART_ORDER[0];
  }

  return { metaCourseId, metaPartId, metaLessonId };
}

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}));
    const raw = body || {};
    const courseId = raw.courseId != null ? String(raw.courseId).trim() : '';
    const partId = raw.partId != null ? String(raw.partId).trim() : '';
    const lessonId = raw.lessonId != null ? String(raw.lessonId).trim() : '';

    if (!courseId || !partId || !lessonId) {
      return NextResponse.json(
        { error: 'courseId, partId, lessonId are required' },
        { status: 400 }
      );
    }

    const { metaCourseId, metaPartId, metaLessonId } = toMetaIds(courseId, partId, lessonId);

    const meta = await getCourseMeta(metaCourseId);
    if (!meta) {
      console.warn('[video/url] meta not found for courseId:', metaCourseId, '(original:', courseId, ')');
      return NextResponse.json(
        { error: '코스 메타를 찾을 수 없습니다. (courseId: ' + courseId + ')' },
        { status: 404 }
      );
    }

    const lesson = findLesson(meta, metaPartId, metaLessonId);
    if (!lesson) {
      console.warn('[video/url] lesson not found:', { metaCourseId, metaPartId, metaLessonId, original: { courseId, partId, lessonId } });
      return NextResponse.json(
        { error: '레슨을 찾을 수 없습니다. (partId: ' + partId + ', lessonId: ' + lessonId + ')' },
        { status: 404 }
      );
    }

    const videoKey = lesson.videoKey;
    if (!videoKey || typeof videoKey !== 'string') {
      return NextResponse.json(
        { error: '이 레슨에 등록된 영상 키가 없습니다.' },
        { status: 404 }
      );
    }

    const command = new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: videoKey,
    });

    const url = await getSignedUrl(getR2Client(), command, {
      expiresIn: PRESIGN_EXPIRES_IN,
    });

    const title = typeof lesson.title === 'string' ? lesson.title : '';

    return NextResponse.json({ url, title });
  } catch (err) {
    const code = err?.name || err?.$metadata?.httpStatusCode;
    if (code === 'NoSuchKey' || code === 404) {
      return NextResponse.json(
        { error: 'R2에 해당 영상 파일이 없습니다.' },
        { status: 404 }
      );
    }
    console.error('video url error', err);
    return NextResponse.json(
      { error: '영상 URL 생성 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
}
