import { S3Client, GetObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const endpoint = process.env.R2_ENDPOINT;
const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const bucket = process.env.R2_BUCKET || 'lms-video';

if (!endpoint || !accessKeyId || !secretAccessKey) {
  console.error('Missing env. Need R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY (and optionally R2_BUCKET).');
  process.exit(1);
}

const s3 = new S3Client({
  region: 'auto',
  endpoint,
  forcePathStyle: true,
  credentials: { accessKeyId, secretAccessKey },
});

async function getMeta(courseId) {
  const res = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: `courses/${courseId}/meta.json` }),
  );
  const text = await res.Body.transformToString();
  return JSON.parse(text);
}

function validateKeyPattern(courseId, lesson) {
  const vk = lesson.videoKey;
  if (typeof vk !== 'string') return { ok: false, reason: 'videoKey missing' };
  const prefix = `courses/${courseId}/instructors/`;
  if (!vk.startsWith(prefix)) return { ok: false, reason: `videoKey not under ${prefix}` };
  if (!vk.endsWith('/video/source.mp4')) return { ok: false, reason: 'videoKey not ending /video/source.mp4' };
  return { ok: true };
}

async function head(key) {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return { ok: true };
  } catch (e) {
    return { ok: false, code: e?.name || e?.$metadata?.httpStatusCode };
  }
}

async function audit(courseId) {
  const meta = await getMeta(courseId);
  const lessons = [];
  for (const lvl of meta.levels || []) {
    for (const l of lvl.lessons || []) lessons.push({ partId: lvl.partId, ...l });
  }

  const collisions = new Map(); // partId|lessonId -> Set(instructorId)
  for (const l of lessons) {
    const k = `${l.partId}|${l.lessonId}`;
    if (!collisions.has(k)) collisions.set(k, new Set());
    collisions.get(k).add(String(l.instructorId || ''));
  }
  const collisionEntries = [...collisions.entries()].filter(([, set]) => set.size > 1);

  let missingObjects = 0;
  let badPattern = 0;
  const missingSamples = [];
  const badPatternSamples = [];

  for (const l of lessons) {
    const pat = validateKeyPattern(courseId, l);
    if (!pat.ok) {
      badPattern++;
      if (badPatternSamples.length < 10) badPatternSamples.push({ ...l, reason: pat.reason });
      continue;
    }
    const h = await head(l.videoKey);
    if (!h.ok) {
      missingObjects++;
      if (missingSamples.length < 10) missingSamples.push({ ...l, code: h.code });
    }
  }

  console.log(`== ${courseId} ==`);
  console.log('lessons:', lessons.length);
  console.log('collisions(partId|lessonId with >1 instructor):', collisionEntries.length);
  if (collisionEntries.length) console.log('collision sample:', collisionEntries.slice(0, 5).map(([k, set]) => [k, [...set]]));
  console.log('badPattern:', badPattern);
  if (badPatternSamples.length) console.log('badPattern sample:', badPatternSamples);
  console.log('missingObjects:', missingObjects);
  if (missingSamples.length) console.log('missingObjects sample:', missingSamples);
  console.log('');
}

await audit('dance');
await audit('music');

