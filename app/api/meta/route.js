import { NextResponse } from 'next/server';
import { GetObjectCommand, NoSuchKey } from '@aws-sdk/client-s3';
import {
  r2Client,
  R2_BUCKET,
  COURSE_TITLES,
  PART_TITLES,
  INSTRUCTORS,
  COURSE_LEVEL_INSTRUCTORS,
} from '@/lib/r2';

// 목록/강의상세에서 쓰는 숫자 ID → R2 meta courseId (읽기 시 매핑)
const LEGACY_COURSE_TO_META = {
  '1': 'dance', '2': 'dance', '3': 'dance', '4': 'dance', '5': 'dance',
  '7': 'dance', '8': 'dance',
  '6': 'music', '9': 'music', '10': 'music',
};

function buildDefaultMeta(courseId) {
  const courseTitle = COURSE_TITLES[courseId] || courseId;
  const levelMap = COURSE_LEVEL_INSTRUCTORS[courseId] || {};

  const levelEntries = Object.entries(PART_TITLES).map(([partId, title]) => {
    const instructorIds = levelMap[partId] || [];
    return {
      partId,
      title,
      instructorIds,
      lessons: [],
    };
  });

  // 이 코스에서 사용되는 강사 목록만 정리
  const usedInstructorIds = new Set(
    Object.values(levelMap).flatMap((ids) => ids || [])
  );

  const instructors = Array.from(usedInstructorIds).map((instructorId) => {
    const info = INSTRUCTORS[instructorId];
    return {
      instructorId,
      name: info?.name || instructorId,
    };
  });

  return {
    courseId,
    title: courseTitle,
    instructors,
    levels: levelEntries,
  };
}

/** GET: 공개 읽기. 목록/플레이어에서 courseId=10 등 레거시 ID로 호출 가능. */
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const rawCourseId = searchParams.get('courseId');

  if (!rawCourseId) {
    return NextResponse.json(
      { error: 'courseId query param is required' },
      { status: 400 }
    );
  }

  // 레거시 숫자 ID(예: 10) → meta용 courseId(예: music)
  const courseId = LEGACY_COURSE_TO_META[String(rawCourseId).trim()] ?? String(rawCourseId).trim();
  const key = `courses/${courseId}/meta.json`;

  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    });

    const res = await r2Client.send(command);
    const text =
      typeof res.Body?.transformToString === 'function'
        ? await res.Body.transformToString()
        : '';

    if (!text) {
      return NextResponse.json(buildDefaultMeta(courseId));
    }

    const meta = JSON.parse(text);
    return NextResponse.json(meta);
  } catch (err) {
    const status = err?.$metadata?.httpStatusCode;

    if (err instanceof NoSuchKey || status === 404) {
      return NextResponse.json(buildDefaultMeta(courseId));
    }

    console.error('get meta error', err);
    return NextResponse.json(
      { error: 'Failed to load meta.json' },
      { status: 500 }
    );
  }
}

