import { S3Client } from "@aws-sdk/client-s3";

let _r2Client = null;

function getR2Client() {
  if (_r2Client) return _r2Client;
  if (!process.env.R2_ENDPOINT) {
    throw new Error("R2_ENDPOINT env var is required");
  }
  if (!process.env.R2_ACCESS_KEY_ID || !process.env.R2_SECRET_ACCESS_KEY) {
    throw new Error(
      "R2_ACCESS_KEY_ID and R2_SECRET_ACCESS_KEY env vars are required",
    );
  }
  _r2Client = new S3Client({
    region: "auto",
    endpoint: process.env.R2_ENDPOINT,
    forcePathStyle: true,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });
  return _r2Client;
}

// R2 bucket (env 우선, 없으면 기본값) — 빌드 시 참조만 하므로 에러 없음
export const R2_BUCKET = process.env.R2_BUCKET || "lms-video";

/** 런타임에만 R2 클라이언트 생성. API에서 getR2Client() 사용. */
export { getR2Client };

// 코스 한글 제목
export const COURSE_TITLES = {
  dance: "댄스",
  music: "음악",
};

// 레벨(파트) 한글 제목
export const PART_TITLES = {
  "lv-e": "초등",
  "lv-m": "중등",
  "lv-t": "강사",
};

// 강사 마스터 (ID ↔ 이름)
export const INSTRUCTORS = {
  "kim-do-kyung": { instructorId: "kim-do-kyung", name: "김도경" },
  "lee-hyun-jong": { instructorId: "lee-hyun-jong", name: "이현종" },
  "yoo-min-kyung": { instructorId: "yoo-min-kyung", name: "유민경" },
  "kim-su-yeon": { instructorId: "kim-su-yeon", name: "김수연" },
  "choi-seong-ryong": { instructorId: "choi-seong-ryong", name: "최성룡" },
  "kim-hyun-ah": { instructorId: "kim-hyun-ah", name: "김현아" },
  "kim-on-yu": { instructorId: "kim-on-yu", name: "김온유" },
  "park-rae-jun": { instructorId: "park-rae-jun", name: "박래준" },
  "park-ji-eun": { instructorId: "park-ji-eun", name: "박지은" },
  "kim-woon-jin": { instructorId: "kim-woon-jin", name: "김운진" },
};

// 코스/레벨별 강사 배치
export const COURSE_LEVEL_INSTRUCTORS = {
  dance: {
    "lv-t": ["kim-do-kyung", "lee-hyun-jong", "yoo-min-kyung"],
    "lv-m": ["kim-su-yeon", "choi-seong-ryong"],
    "lv-e": ["kim-hyun-ah", "kim-on-yu"],
  },
  music: {
    "lv-t": ["park-rae-jun", "kim-woon-jin"],
    "lv-m": ["park-ji-eun"],
    "lv-e": ["kim-on-yu"],
  },
};

// 목록/플레이어 숫자 ID → R2 meta courseId (단일 소스)
export const LEGACY_COURSE_TO_META = {
  "1": "dance", "2": "dance", "3": "dance", "4": "dance", "5": "dance",
  "7": "dance", "8": "dance",
  "6": "music", "9": "music", "10": "music", "11": "music",
};

/** 강사 이름 → instructorId 맵 (한 번만 생성) */
let _instructorNameToId = null;
export function getInstructorNameToId() {
  if (_instructorNameToId) return _instructorNameToId;
  const map = {};
  for (const [id, info] of Object.entries(INSTRUCTORS)) {
    if (info?.name) map[String(info.name).trim()] = id;
  }
  _instructorNameToId = map;
  return map;
}

// UI 드롭다운용 (admin/공통)
export const COURSE_OPTIONS = [
  { id: "dance", label: COURSE_TITLES.dance },
  { id: "music", label: COURSE_TITLES.music },
];
export const PART_OPTIONS = Object.entries(PART_TITLES).map(([id, label]) => ({ id, label }));

// 비디오 키 생성 (강사 포함)
export function buildVideoKey(courseId, instructorId, partId, lessonId) {
  return `courses/${courseId}/instructors/${instructorId}/parts/${partId}/lessons/${lessonId}/video/source.mp4`;
}
