import { GetObjectCommand } from '@aws-sdk/client-s3';
import { r2Client, R2_BUCKET } from '@/lib/r2';

const META_KEY_PREFIX = 'courses/';
const META_KEY_SUFFIX = '/meta.json';

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
  const key = `${META_KEY_PREFIX}${courseId}${META_KEY_SUFFIX}`;
  try {
    const command = new GetObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
    });
    const res = await r2Client.send(command);
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

/**
 * meta에서 partId, lessonId에 해당하는 레슨 객체 반환.
 * @param {object} meta - getCourseMeta 결과
 * @param {string} partId
 * @param {string} lessonId
 * @returns {{ lessonId: string; title: string; instructorId: string; videoKey: string; createdAt?: string } | null}
 */
export function findLesson(meta, partId, lessonId) {
  if (!meta || !Array.isArray(meta.levels) || !partId || !lessonId) return null;
  const level = meta.levels.find((l) => l.partId === partId);
  if (!level || !Array.isArray(level.lessons)) return null;
  return level.lessons.find((l) => l.lessonId === lessonId) ?? null;
}
