export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getR2Client, R2_BUCKET, LEGACY_COURSE_TO_META, getInstructorNameToId } from '@/lib/r2';
import { getCourseMeta, findLesson } from '@/lib/courseMeta';
import { getCourseById } from '@/lib/courses';

const PRESIGN_EXPIRES_IN = 60 * 60; // 1시간
const PART_ORDER = ['lv-e', 'lv-m', 'lv-t'];

/** 코스 11 뮤직 멘토링(김운진): 파트별 레슨 시작 인덱스 (0-based). 파트 8·15는 레슨 없음. */
const COURSE_11_PART_OFFSETS = [
  0, 3, 6, 9, 12, 15, 18, 21, 21, 24, 27, 30, 33, 36, 39,
];
const COURSE_11_LESSONS_PER_PART = [3, 3, 3, 3, 3, 3, 3, 0, 3, 3, 3, 3, 3, 3, 0];

function levelToMetaPartId(level) {
  const raw = (level || '').trim();
  if (raw === '초등') return 'lv-e';
  if (raw === '중등') return 'lv-m';
  if (raw === '강사') return 'lv-t';
  return null;
}

function computeLinearLessonIdCourse11(partNum, lessonNum) {
  const partIndex = partNum >= 1 && partNum <= 15 ? partNum - 1 : -1;
  if (partIndex < 0) return null;
  const maxLessons = COURSE_11_LESSONS_PER_PART[partIndex] || 0;
  if (lessonNum < 1 || lessonNum > maxLessons) return null;
  const offset = COURSE_11_PART_OFFSETS[partIndex] ?? 0;
  const index = offset + (lessonNum - 1);
  return 'l' + String(index + 1).padStart(3, '0');
}

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

  const part = parts.find((p) => p.partNumber === partNum);
  const maxInPart = part && Array.isArray(part.lessons) ? part.lessons.length : 0;
  if (lessonNum < 1 || lessonNum > maxInPart) return null;

  const index = offset + (lessonNum - 1);
  if (index < 0) return null;
  return 'l' + String(index + 1).padStart(3, '0');
}

function toMetaIds(courseId, partId, lessonId, course) {
  const metaCourseId = LEGACY_COURSE_TO_META[courseId] ?? courseId;
  const partNum = parseInt(partId, 10);
  const lessonNum = parseInt(lessonId, 10);

  // 코스 11(뮤직 멘토링·김운진): 파트 8/15 비어 있어 고정 오프셋으로 확실히 매핑 (업로드 l001~l039와 1:1 대응)
  const isCourse11 = String(courseId).trim() === '11' || Number(courseId) === 11;
  if (isCourse11 && metaCourseId === 'music' && !Number.isNaN(partNum) && !Number.isNaN(lessonNum)) {
    const metaLessonId = computeLinearLessonIdCourse11(partNum, lessonNum);
    if (metaLessonId) {
      return {
        metaCourseId,
        metaPartId: 'lv-t',
        metaLessonId,
      };
    }
  }

  // 공통 규칙: 코스(강의)별 syllabus 기준으로 (파트, 레슨)을 lNNN으로 일렬 매핑
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

    const course = getCourseById(courseId);
    const { metaCourseId, metaPartId, metaLessonId } = toMetaIds(courseId, partId, lessonId, course);

    const meta = await getCourseMeta(metaCourseId);
    if (!meta) {
      console.warn('[video/url] meta not found for courseId:', metaCourseId, '(original:', courseId, ')');
      return NextResponse.json(
        {
          error: '코스 메타를 찾을 수 없습니다. (courseId: ' + courseId + ')',
          debug: { metaCourseId, hint: 'R2에 courses/' + metaCourseId + '/meta.json 이 있는지 확인하세요. 음악 강의는 한 번이라도 업로드하면 생성됩니다.' },
        },
        { status: 404 }
      );
    }

    const nameToId = getInstructorNameToId();
    let expectedInstructorId = course?.instructor
      ? nameToId[String(course.instructor).trim()] ?? null
      : null;
    if (!expectedInstructorId && (String(courseId).trim() === '11' || Number(courseId) === 11)) {
      expectedInstructorId = 'kim-woon-jin';
    }
    let lesson = findLesson(meta, metaPartId, metaLessonId, expectedInstructorId || undefined);
    if (!lesson && expectedInstructorId && (String(courseId).trim() === '11' || Number(courseId) === 11)) {
      const anyMatch = findLesson(meta, metaPartId, metaLessonId, undefined);
      if (anyMatch && String(anyMatch.instructorId || '').trim().toLowerCase() === expectedInstructorId.toLowerCase()) {
        lesson = anyMatch;
      }
    }
    if (!lesson) {
      const level = meta.levels && meta.levels.find((l) => l && String(l.partId).trim() === String(metaPartId).trim());
      const lessonIds = level && Array.isArray(level.lessons) ? level.lessons.map((l) => l?.lessonId) : [];
      console.warn('[video/url] lesson not found:', { metaCourseId, metaPartId, metaLessonId, expectedInstructorId, lessonIdsSample: lessonIds.slice(0, 20) });
      return NextResponse.json(
        {
          error: expectedInstructorId ? '이 레슨에 해당 강사님 영상이 등록되지 않았습니다.' : '레슨을 찾을 수 없습니다.',
          debug: {
            lookedFor: { metaCourseId, metaPartId, metaLessonId, expectedInstructorId },
            inMeta: { levelFound: !!level, lessonCount: lessonIds.length, sampleLessonIds: lessonIds.slice(0, 15) },
            hint: '업로드 시 코스=음악, 수준=강사, 선생님=김운진, 레슨 슬롯을 25번(l025) 등으로 맞춰 올렸는지 확인하세요.',
            checkMeta: '브라우저에서 /api/meta?courseId=music 으로 저장된 메타를 확인할 수 있습니다.',
          },
        },
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
