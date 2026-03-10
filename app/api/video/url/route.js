export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getR2Client, R2_BUCKET, INSTRUCTORS } from '@/lib/r2';
import { getCourseMeta, findLesson } from '@/lib/courseMeta';
import { getCourseById } from '@/lib/courses';

const PRESIGN_EXPIRES_IN = 60 * 60; // 1시간

// 목록/강의상세에서 쓰는 숫자 ID → R2 meta courseId
const LEGACY_COURSE_TO_META = {
  '1': 'dance', '2': 'dance', '3': 'dance', '4': 'dance', '5': 'dance',
  '7': 'dance', '8': 'dance',
  '6': 'music', '9': 'music', '10': 'music',
};

const PART_ORDER = ['lv-e', 'lv-m', 'lv-t'];

function levelToMetaPartId(level) {
  const raw = (level || '').trim();
  if (raw === '초등') return 'lv-e';
  if (raw === '중등') return 'lv-m';
  if (raw === '강사') return 'lv-t';
  return null;
}

function buildInstructorNameToId() {
  const map = {};
  for (const [instructorId, info] of Object.entries(INSTRUCTORS || {})) {
    if (info?.name) {
      map[String(info.name).trim()] = instructorId;
    }
  }
  return map;
}

const INSTRUCTOR_NAME_TO_ID = buildInstructorNameToId();

function computeLinearLessonIdFromSyllabus(syllabus, partNum, lessonNum) {
  if (!Array.isArray(syllabus) || Number.isNaN(partNum) || Number.isNaN(lessonNum)) return null;
  const parts = [...syllabus]
    .filter((p) => p && typeof p.partNumber === 'number')
    .sort((a, b) => a.partNumber - b.partNumber);

  let offset = 0;
  for (const p of parts) {
    if (p.partNumber < partNum) {
      offset += Array.isArray(p.lessons) ? p.lessons.length : 0;
    }
  }

  const index = offset + (lessonNum - 1);
  if (index < 0) return null;
  return 'l' + String(index + 1).padStart(3, '0');
}

function toMetaIds(courseId, partId, lessonId) {
  const metaCourseId = LEGACY_COURSE_TO_META[courseId] ?? courseId;
  const partNum = parseInt(partId, 10);
  const lessonNum = parseInt(lessonId, 10);

  // 공통 규칙: 코스(강의)별 syllabus 기준으로 (파트, 레슨)을 lNNN으로 일렬 매핑
  // - partId: URL의 "파트 번호"
  // - lessonId: URL의 "레슨 번호"
  // - metaPartId: 강의의 level(초등/중등/강사)로 결정
  const course = getCourseById(courseId);
  if (course && !Number.isNaN(partNum) && !Number.isNaN(lessonNum)) {
    const metaPartId = levelToMetaPartId(course.level) ?? 'lv-e';
    const metaLessonId = computeLinearLessonIdFromSyllabus(course.syllabus, partNum, lessonNum);
    if (metaLessonId) {
      return { metaCourseId, metaPartId, metaLessonId };
    }
  }

  // fallback: 기존 단순 규칙(옛 페이지에서 1~3레벨만 있던 경우)
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

    // 이 코스(강의) 담당 강사만 재생: 다른 강사 영상이 나오지 않도록
    const legacyCourse = getCourseById(courseId);
    const expectedInstructorId =
      (legacyCourse?.instructor ? INSTRUCTOR_NAME_TO_ID[String(legacyCourse.instructor).trim()] : null) || null;
    const lesson = findLesson(meta, metaPartId, metaLessonId, expectedInstructorId);
    if (!lesson) {
      console.warn('[video/url] lesson not found or not by this instructor:', { metaCourseId, metaPartId, metaLessonId, expectedInstructorId, original: { courseId, partId, lessonId } });
      return NextResponse.json(
        { error: expectedInstructorId ? '이 레슨에 해당 강사님 영상이 등록되지 않았습니다.' : '레슨을 찾을 수 없습니다. (partId: ' + partId + ', lessonId: ' + lessonId + ')' },
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
