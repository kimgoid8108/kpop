import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getR2Client, R2_BUCKET } from '@/lib/r2';

/** R2 meta.json 키 (단일 정의) */
export function getMetaKey(courseId) {
  return `courses/${courseId}/meta.json`;
}

/**
 * R2 GetObject Body(stream)를 문자열로 변환 (Node 스트림 대응)
 * @param {import('stream').Readable | { transformToString?: () => Promise<string> } | null} body
 * @returns {Promise<string>}
 */
export async function streamToString(body) {
  if (body == null) return '';
  if (typeof body.transformToString === 'function') {
    return body.transformToString();
  }
  const { Readable } = await import('stream');
  if (!(body instanceof Readable)) {
    return '';
  }
  return new Promise((resolve, reject) => {
    const chunks = [];
    body.on('data', (chunk) => chunks.push(chunk));
    body.on('error', reject);
    body.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}

/**
 * R2에서 courses/{courseId}/meta.json 조회 후 파싱된 객체 반환.
 * 없으면 null.
 * @param {string} courseId
 * @returns {Promise<object | null>}
 */
export async function getCourseMeta(courseId) {
  if (!courseId) return null;
  const key = getMetaKey(courseId);
  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    });
    const res = await getR2Client().send(command);
    const text = await streamToString(res.Body);
    if (!text || !text.trim()) return null;
    try {
      return JSON.parse(text);
    } catch (parseErr) {
      console.error('[courseMeta] meta.json parse error for', courseId, parseErr);
      return null;
    }
  } catch (err) {
    const code = err?.name || err?.$metadata?.httpStatusCode;
    if (code === 'NoSuchKey' || code === 404) return null;
    throw err;
  }
}

/** lessonId 정규화: l1, l01, l001, 25 → 동일 숫자로 비교 */
function normalizeLessonId(id) {
  if (id == null || id === '') return '';
  const s = String(id).trim();
  const num = parseInt(s.replace(/^l/i, ''), 10);
  return Number.isNaN(num) ? s : 'l' + String(num).padStart(3, '0');
}

function sameInstructor(a, b) {
  if (!a && !b) return true;
  const x = String(a || '').trim().toLowerCase();
  const y = String(b || '').trim().toLowerCase();
  return x === y;
}

/**
 * meta에서 partId, lessonId에 해당하는 레슨 객체 반환.
 * instructorId가 주어지면 해당 강사 레슨만 반환(다른 강사 영상 제외).
 * lessonId는 l1 / l001 등 형식 차이 무시하고 숫자 기준으로 매칭.
 * instructorId는 공백/대소문자 차이 무시.
 * @param {object} meta - getCourseMeta 결과
 * @param {string} partId
 * @param {string} lessonId
 * @param {string} [instructorId] - 지정 시 이 강사의 레슨만 반환
 * @returns {{ lessonId: string; title: string; instructorId: string; videoKey: string; createdAt?: string } | null}
 */
export function findLesson(meta, partId, lessonId, instructorId) {
  if (!meta || !Array.isArray(meta.levels) || !partId || !lessonId) return null;
  const level = meta.levels.find((l) => l && String(l.partId).trim() === String(partId).trim());
  if (!level || !Array.isArray(level.lessons)) return null;
  const normalized = normalizeLessonId(lessonId);
  const matchesLessonId = (l) =>
    l && (l.lessonId === lessonId || normalizeLessonId(l.lessonId) === normalized);

  // instructorId가 주어졌으면, "레슨ID + 강사ID"로 먼저 찾는다.
  // (같은 lessonId가 여러 강사에게 존재할 수 있어, lessonId만으로 먼저 찾으면 오검출/404 발생)
  if (instructorId) {
    const lessonForInstructor =
      level.lessons.find((l) => matchesLessonId(l) && sameInstructor(l.instructorId, instructorId)) ?? null;
    return lessonForInstructor;
  }

  return level.lessons.find((l) => matchesLessonId(l)) ?? null;
}
