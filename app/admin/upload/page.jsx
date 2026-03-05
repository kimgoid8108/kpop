'use client';

import { useEffect, useMemo, useState } from 'react';

const COURSE_OPTIONS = [
  { id: 'dance', label: '댄스' },
  { id: 'music', label: '음악' },
];

const PART_OPTIONS = [
  { id: 'lv-e', label: '초등' },
  { id: 'lv-m', label: '중등' },
  { id: 'lv-t', label: '강사' },
];

// 클라이언트 전용 강사/레벨 매핑 (서버 lib/r2.js 와 동일한 소스 오브 트루스)
const INSTRUCTORS = {
  'kim-do-kyung': { instructorId: 'kim-do-kyung', name: '김도경' },
  'lee-hyun-jong': { instructorId: 'lee-hyun-jong', name: '이현종' },
  'yoo-min-kyung': { instructorId: 'yoo-min-kyung', name: '유민경' },
  'kim-su-yeon': { instructorId: 'kim-su-yeon', name: '김수연' },
  'choi-seong-ryong': { instructorId: 'choi-seong-ryong', name: '최성룡' },
  'kim-hyun-ah': { instructorId: 'kim-hyun-ah', name: '김현아' },
  'kim-on-yu': { instructorId: 'kim-on-yu', name: '김온유' },
  'park-rae-jun': { instructorId: 'park-rae-jun', name: '박래준' },
  'park-ji-eun': { instructorId: 'park-ji-eun', name: '박지은' },
};

const COURSE_LEVEL_INSTRUCTORS = {
  dance: {
    'lv-t': ['kim-do-kyung', 'lee-hyun-jong', 'yoo-min-kyung'],
    'lv-m': ['kim-su-yeon', 'choi-seong-ryong'],
    'lv-e': ['kim-hyun-ah', 'kim-on-yu'],
  },
  music: {
    'lv-t': ['park-rae-jun'],
    'lv-m': ['park-ji-eun'],
    'lv-e': ['kim-on-yu'],
  },
};

function computeNextLessonId(meta, partId, instructorId) {
  if (!meta || !Array.isArray(meta.levels) || !instructorId) return 'l001';

  const level = meta.levels.find((l) => l.partId === partId);
  if (!level || !Array.isArray(level.lessons) || level.lessons.length === 0) {
    return 'l001';
  }

  const lessonsForInstructor = level.lessons.filter(
    (lesson) => lesson.instructorId === instructorId
  );

  if (lessonsForInstructor.length === 0) return 'l001';

  const maxNumber = lessonsForInstructor.reduce((max, lesson) => {
    const raw = (lesson.lessonId || '').replace(/^l/i, '');
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return max;
    return Math.max(max, n);
  }, 0);

  const next = maxNumber + 1;
  return `l${String(next).padStart(3, '0')}`;
}

function buildVideoKeyPreview(courseId, instructorId, partId, lessonId) {
  if (!courseId || !instructorId || !partId || !lessonId) return '';
  return `courses/${courseId}/instructors/${instructorId}/parts/${partId}/lessons/${lessonId}/video/source.mp4`;
}

export default function AdminUploadPage() {
  const [adminToken, setAdminToken] = useState('');
  const [courseId, setCourseId] = useState('dance');
  const [partId, setPartId] = useState('lv-e');
  const [instructorId, setInstructorId] = useState('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [file, setFile] = useState(null);
  const [meta, setMeta] = useState(null);
  const [nextLessonId, setNextLessonId] = useState('l001');
  /** 'auto' = 다음 자동, 또는 '1'~'20' = 해당 번호 레슨에 업로드(덮어쓰기 가능) */
  const [lessonSlot, setLessonSlot] = useState('auto');
  const [uploading, setUploading] = useState(false);
  const [deletingVideo, setDeletingVideo] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);

  const availableInstructorOptions = useMemo(() => {
    if (meta && Array.isArray(meta.levels) && Array.isArray(meta.instructors)) {
      const level = meta.levels.find((l) => l.partId === partId);
      const instructorIds = level?.instructorIds || [];
      return instructorIds
        .map((id) => meta.instructors.find((i) => i.instructorId === id))
        .filter(Boolean)
        .map((i) => ({ id: i.instructorId, label: i.name }));
    }
    const ids = COURSE_LEVEL_INSTRUCTORS[courseId]?.[partId] || [];
    return ids
      .map((id) => INSTRUCTORS[id])
      .filter(Boolean)
      .map((i) => ({ id: i.instructorId, label: i.name }));
  }, [courseId, partId, meta]);

  const appendLog = (message) => {
    const ts = new Date().toLocaleTimeString();
    setLogs((prev) => [...prev, `[${ts}] ${message}`]);
  };

  const fetchMeta = async (targetCourseId) => {
    if (!adminToken) return;

    try {
      appendLog(`meta.json 불러오는 중... (courseId=${targetCourseId})`);
      const res = await fetch(`/api/meta?courseId=${encodeURIComponent(targetCourseId)}`, {
        method: 'GET',
        headers: {
          'x-admin-token': adminToken,
        },
      });

      if (!res.ok) {
        appendLog(`meta.json 로드 실패 (status ${res.status})`);
        return;
      }

      const data = await res.json();
      setMeta(data);
      appendLog('meta.json 로드 완료');
    } catch (err) {
      console.error(err);
      appendLog(`meta.json 로드 에러: ${err.message}`);
    }
  };

  useEffect(() => {
    if (!adminToken) return;
    fetchMeta(courseId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, adminToken]);

  // 코스/수준이 바뀔 때 선생님 목록 갱신 + 다음 자동 레슨 번호
  useEffect(() => {
    if (availableInstructorOptions.length === 0) {
      setInstructorId('');
      setNextLessonId('l001');
      return;
    }
    const exists = availableInstructorOptions.some((opt) => opt.id === instructorId);
    const nextInstructorId = exists ? instructorId : availableInstructorOptions[0].id;
    setInstructorId(nextInstructorId);
    const nextId = computeNextLessonId(meta, partId, nextInstructorId);
    setNextLessonId(nextId);
  }, [availableInstructorOptions, instructorId, meta, partId]);

  const effectiveLessonId = lessonSlot === 'auto' ? (nextLessonId || 'l001') : `l${String(parseInt(lessonSlot, 10)).padStart(3, '0')}`;

  const lessonSlotOptions = useMemo(() => {
    const autoLabel = `다음 자동 (${nextLessonId || 'l001'})`;
    const options = [{ value: 'auto', label: autoLabel }];
    if (!meta || !Array.isArray(meta.levels)) {
      for (let n = 1; n <= 20; n++) {
        options.push({ value: String(n), label: `${n}번 (l${String(n).padStart(3, '0')})` });
      }
      return options;
    }
    const level = meta.levels.find((l) => l.partId === partId);
    const lessons = Array.isArray(level?.lessons) ? [...level.lessons] : [];
    const byNumber = {};
    lessons.forEach((l) => {
      const num = parseInt((l.lessonId || '').replace(/^l/i, ''), 10);
      if (!Number.isNaN(num)) byNumber[num] = l;
    });
    const maxExisting = Object.keys(byNumber).length ? Math.max(...Object.keys(byNumber).map(Number)) : 0;
    const upTo = Math.max(20, maxExisting + 5);
    for (let n = 1; n <= upTo; n++) {
      const existing = byNumber[n];
      const lid = `l${String(n).padStart(3, '0')}`;
      options.push({
        value: String(n),
        label: existing ? `${n}번 (${lid}) - ${(existing.title || '').trim() || '제목 없음'}` : `${n}번 (${lid})`,
        hasVideo: !!existing?.videoKey,
      });
    }
    return options;
  }, [meta, partId, nextLessonId]);

  const selectedSlotOption = lessonSlotOptions.find((o) => o.value === lessonSlot);
  const canDeleteVideo = !!(
    adminToken &&
    courseId &&
    partId &&
    instructorId &&
    lessonSlot !== 'auto'
  );
  const hasVideoInSlot = !!selectedSlotOption?.hasVideo;

  const handleDeleteVideo = async () => {
    if (!canDeleteVideo) return;
    if (!confirm(`현재 선택한 레슨(${effectiveLessonId})의 영상을 삭제합니다. 메타에서도 제거됩니다. 계속할까요?`)) return;

    setDeletingVideo(true);
    appendLog(`레슨 영상 삭제 중: ${effectiveLessonId}`);
    try {
      const res = await fetch('/api/video/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          courseId,
          partId: partId,
          lessonId: effectiveLessonId,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        appendLog(`삭제 실패: ${data?.error || res.status}`);
        alert(data?.error || '삭제에 실패했습니다.');
        return;
      }
      appendLog('영상 삭제 완료. meta 갱신됨.');
      setLessonTitle('');
      await fetchMeta(courseId);
      alert('삭제되었습니다.');
    } catch (err) {
      console.error(err);
      appendLog(`삭제 에러: ${err.message}`);
      alert('삭제 중 오류가 발생했습니다.');
    } finally {
      setDeletingVideo(false);
    }
  };

  const abortMultipart = async (uploadId, key) => {
    try {
      await fetch('/api/upload/abort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({ uploadId, key }),
      });
    } catch (err) {
      console.error('abort multipart error', err);
    }
  };

  const buildUpdatedMeta = (
    baseMeta,
    { courseId, partId, instructorId, lessonId, lessonTitle, videoKey }
  ) => {
    const createdAt = new Date().toISOString();

    const safeMeta =
      baseMeta && baseMeta.courseId === courseId
        ? { ...baseMeta }
        : {
            courseId,
            title: COURSE_OPTIONS.find((c) => c.id === courseId)?.label || courseId,
            instructors: [],
            levels: PART_OPTIONS.map((p) => ({
              partId: p.id,
              title: p.label,
              instructorIds: [],
              lessons: [],
            })),
          };

    const instructors = Array.isArray(safeMeta.instructors) ? [...safeMeta.instructors] : [];
    const levels = Array.isArray(safeMeta.levels) ? [...safeMeta.levels] : [];

    // 강사 목록에 현재 강사가 없으면 추가
    if (!instructors.some((i) => i.instructorId === instructorId)) {
      const info = INSTRUCTORS[instructorId];
      instructors.push({
        instructorId,
        name: info?.name || instructorId,
      });
    }

    // 레벨/강사 레슨 추가
    const levelIndex = levels.findIndex((lvl) => lvl.partId === partId);
    const newLesson = {
      lessonId,
      title: lessonTitle,
      instructorId,
      videoKey,
      createdAt,
    };

    const sortLessons = (list) => {
      return [...list].sort((a, b) => {
        const na = parseInt((a.lessonId || '').replace(/^l/i, ''), 10) || 0;
        const nb = parseInt((b.lessonId || '').replace(/^l/i, ''), 10) || 0;
        return na - nb;
      });
    };

    if (levelIndex === -1) {
      levels.push({
        partId,
        title: PART_OPTIONS.find((p) => p.id === partId)?.label || partId,
        instructorIds: [instructorId],
        lessons: [newLesson],
      });
    } else {
      const level = { ...levels[levelIndex] };
      const instructorIds = Array.isArray(level.instructorIds) ? [...level.instructorIds] : [];
      let lessons = Array.isArray(level.lessons) ? [...level.lessons] : [];

      if (!instructorIds.includes(instructorId)) {
        instructorIds.push(instructorId);
      }

      const existingIndex = lessons.findIndex((l) => l.lessonId === lessonId);
      if (existingIndex >= 0) {
        lessons = lessons.map((l, i) => (i === existingIndex ? { ...newLesson, createdAt: l.createdAt || newLesson.createdAt } : l));
      } else {
        lessons = sortLessons([...lessons, newLesson]);
      }

      levels[levelIndex] = {
        ...level,
        instructorIds,
        lessons,
      };
    }

    return {
      ...safeMeta,
      instructors,
      levels,
    };
  };

  const handleUpload = async () => {
    if (!adminToken) {
      alert('ADMIN_UPLOAD_TOKEN 값을 페이지 상단에 입력하세요.');
      return;
    }

    if (!file) {
      alert('업로드할 비디오 파일을 선택하세요.');
      return;
    }

    if (!lessonTitle.trim()) {
      alert('레슨 제목을 입력하세요.');
      return;
    }

    if (!instructorId) {
      alert('선생님을 선택하세요.');
      return;
    }

    setUploading(true);
    setProgress(0);
    setLogs([]);

    const currentLessonId = effectiveLessonId;

    try {
      appendLog('멀티파트 업로드 초기화 중...');

      const initRes = await fetch('/api/upload/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          courseId,
          partId: partId,
          instructorId: instructorId,
          lessonId: currentLessonId,
          fileSize: file.size,
          contentType: file.type || 'video/mp4',
        }),
      });

      if (!initRes.ok) {
        const text = await initRes.text();
        appendLog(`initiate 실패: ${text}`);
        if (initRes.status === 401) {
          appendLog('→ ADMIN 토큰을 입력했는지 확인하세요. Vercel 등 배포 환경에서는 프로젝트 설정에 ADMIN_UPLOAD_TOKEN 환경 변수를 추가해야 합니다.');
          throw new Error('인증 실패(401). 토큰을 확인하거나 서버 환경 변수 ADMIN_UPLOAD_TOKEN을 설정하세요.');
        }
        throw new Error('Failed to initiate multipart upload');
      }

      const initData = await initRes.json();
      const { uploadId, key, partSize, presignedUrls } = initData;

      if (!uploadId || !key || !Array.isArray(presignedUrls)) {
        throw new Error('Invalid initiate response');
      }

      appendLog(`업로드 ID: ${uploadId}`);
      appendLog(`총 파트 수: ${presignedUrls.length}`);

      let uploadedBytes = 0;
      const uploadedParts = [];

      for (const { partNumber, url } of presignedUrls) {
        const start = (partNumber - 1) * partSize;
        const end = Math.min(start + partSize, file.size);
        const blobPart = file.slice(start, end);

        appendLog(`파트 ${partNumber}/${presignedUrls.length} 업로드 중...`);

        const res = await fetch(url, {
          method: 'PUT',
          body: blobPart,
        });

        if (!res.ok) {
          appendLog(`파트 ${partNumber} 업로드 실패 (status ${res.status})`);
          await abortMultipart(uploadId, key);
          throw new Error(`Part ${partNumber} upload failed`);
        }

        const etag = res.headers.get('ETag') || res.headers.get('etag');
        if (!etag) {
          appendLog(`파트 ${partNumber} ETag 누락 (계속 진행)`);
        }

        uploadedBytes += blobPart.size;
        setProgress((uploadedBytes / file.size) * 100);

        uploadedParts.push({
          partNumber,
          etag,
        });

        appendLog(`파트 ${partNumber} 업로드 완료`);
      }

      appendLog('모든 파트 업로드 완료, Complete 요청 중...');

      const completeRes = await fetch('/api/upload/complete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          uploadId,
          key,
          parts: uploadedParts,
        }),
      });

      if (!completeRes.ok) {
        const text = await completeRes.text();
        appendLog(`complete 실패: ${text}`);
        throw new Error('Failed to complete multipart upload');
      }

      await completeRes.json();
      appendLog('R2 Multipart 업로드 완료');

      appendLog('meta.json 업데이트 중...');
      const updatedMeta = buildUpdatedMeta(meta, {
        courseId,
        partId: partId,
        instructorId: instructorId,
        lessonId: currentLessonId,
        lessonTitle: lessonTitle.trim(),
        videoKey: key,
      });

      const metaRes = await fetch('/api/meta/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': adminToken,
        },
        body: JSON.stringify({
          courseId,
          meta: updatedMeta,
        }),
      });

      if (!metaRes.ok) {
        const text = await metaRes.text();
        appendLog(`meta.json 업데이트 실패: ${text}`);
        throw new Error('Failed to update meta.json');
      }

      setMeta(updatedMeta);
      setLessonTitle('');
      setFile(null);
      setProgress(100);
      appendLog('meta.json 업데이트 완료');
      appendLog('업로드 전체 완료');
      if (lessonSlot === 'auto') {
        const nextId = computeNextLessonId(updatedMeta, partId, instructorId);
        setNextLessonId(nextId);
      }

      const fileInput = document.getElementById('admin-upload-file-input');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (err) {
      console.error(err);
      appendLog(`에러 발생: ${err.message}`);
    } finally {
      setUploading(false);
    }
  };

  const videoKeyPreview = buildVideoKeyPreview(
    courseId,
    instructorId,
    partId,
    effectiveLessonId
  );

  return (
    <div
      style={{
        maxWidth: '760px',
        margin: '40px auto',
        padding: '24px',
        border: '1px solid #e5e7eb',
        borderRadius: '12px',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
      }}
    >
      <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '16px' }}>
        관리자 비디오 업로드
      </h1>
      <p style={{ fontSize: '14px', color: '#4b5563', marginBottom: '24px' }}>
        Cloudflare R2 멀티파트 업로드를 이용해 대용량 비디오를 업로드하고,
        <code
          style={{
            background: '#f3f4f6',
            padding: '2px 4px',
            borderRadius: '4px',
            marginLeft: 4,
          }}
        >
          meta.json
        </code>
        을 자동으로 갱신합니다.
      </p>

      <section style={{ marginBottom: '24px' }}>
        <label
          htmlFor="admin-token"
          style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}
        >
          ADMIN_UPLOAD_TOKEN
        </label>
        <input
          id="admin-token"
          type="password"
          value={adminToken}
          onChange={(e) => setAdminToken(e.target.value)}
          placeholder="서버 .env.local 의 ADMIN_UPLOAD_TOKEN 값을 입력하세요"
          style={{
            width: '100%',
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
          }}
        />
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          토큰을 입력하면 자동으로 meta.json 을 불러옵니다. <strong>Vercel 배포 시</strong> 프로젝트 설정 → Environment Variables에 <code>ADMIN_UPLOAD_TOKEN</code>을 추가하고, 여기 입력하는 값과 동일하게 설정하세요.
        </p>
      </section>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div>
          <label
            htmlFor="course-select"
            style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}
          >
            코스 (courseId)
          </label>
          <select
            id="course-select"
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              backgroundColor: 'white',
            }}
          >
            {COURSE_OPTIONS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label} ({c.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="part-select"
            style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}
          >
            수준
          </label>
          <select
            id="part-select"
            value={partId}
            onChange={(e) => setPartId(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              backgroundColor: 'white',
            }}
          >
            {PART_OPTIONS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label} ({p.id})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="instructor-select"
            style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}
          >
            선생님
          </label>
          <select
            id="instructor-select"
            value={instructorId}
            onChange={(e) => setInstructorId(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 10px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              fontSize: '14px',
              backgroundColor: 'white',
            }}
          >
            {availableInstructorOptions.length === 0 ? (
              <option value="">선생님이 없습니다</option>
            ) : (
              availableInstructorOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label} ({opt.id})
                </option>
              ))
            )}
          </select>
        </div>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <label
          htmlFor="lesson-slot-select"
          style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}
        >
          업로드할 레슨
        </label>
        <select
          id="lesson-slot-select"
          value={lessonSlot}
          onChange={(e) => setLessonSlot(e.target.value)}
          style={{
            width: '100%',
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
            backgroundColor: 'white',
          }}
        >
          {lessonSlotOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          목록은 현재 코스·수준의 meta에서 불러옵니다. 번호 지정 시 해당 슬롯에 넣으며, 이미 있으면 덮어쓰기 됩니다. 특정 번호를 선택하면 아래에 「이 레슨 영상 삭제」 버튼이 나타납니다.
        </p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <label
          htmlFor="lesson-title"
          style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}
        >
          레슨 제목
        </label>
        <input
          id="lesson-title"
          type="text"
          value={lessonTitle}
          onChange={(e) => setLessonTitle(e.target.value)}
          placeholder="예: 호흡 기초"
          style={{
            width: '100%',
            padding: '8px 10px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '14px',
          }}
        />
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          레슨 제목을 직접 입력하세요.
        </p>
      </section>

      <section style={{ marginBottom: '24px' }}>
        <label
          htmlFor="admin-upload-file-input"
          style={{ display: 'block', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}
        >
          비디오 파일 선택 (최대 3GB)
        </label>
        <input
          id="admin-upload-file-input"
          type="file"
          accept="video/mp4,video/*"
          onChange={(e) => {
            const f = e.target.files?.[0] || null;
            setFile(f);
          }}
        />
        <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
          브라우저에서 Cloudflare R2로 직접 업로드합니다. 서버는 presigned URL만 발급합니다.
        </p>
      </section>

      <section style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', marginBottom: '4px' }}>
          <strong>사용될 lessonId:</strong>{' '}
          <code
            style={{
              background: '#f3f4f6',
              padding: '2px 6px',
              borderRadius: '4px',
            }}
          >
            {effectiveLessonId}
          </code>
          {lessonSlot !== 'auto' && (
            <span style={{ fontSize: '12px', color: '#6b7280', marginLeft: '8px' }}>
              (지정 슬롯, 기존 레슨이 있으면 덮어쓰기)
            </span>
          )}
        </div>
        <div style={{ fontSize: '13px', color: '#4b5563' }}>
          <strong>최종 R2 Key 미리보기:</strong>{' '}
          {videoKeyPreview ? (
            <code
              style={{
                background: '#f3f4f6',
                padding: '2px 6px',
                borderRadius: '4px',
              }}
            >
              {videoKeyPreview}
            </code>
          ) : (
            <span style={{ color: '#9ca3af' }}>코스·파트 선택 시 표시됩니다.</span>
          )}
        </div>
      </section>

      {canDeleteVideo && (
        <section style={{ marginBottom: '24px' }}>
          <button
            type="button"
            onClick={handleDeleteVideo}
            disabled={deletingVideo || uploading}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              border: '1px solid #dc2626',
              backgroundColor: deletingVideo ? '#fca5a5' : 'white',
              color: '#dc2626',
              fontWeight: 600,
              fontSize: '13px',
              cursor: deletingVideo || uploading ? 'not-allowed' : 'pointer',
            }}
          >
            {deletingVideo ? '삭제 중...' : '이 레슨 영상 삭제'}
          </button>
          <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
            {hasVideoInSlot
              ? 'R2 영상 파일을 삭제하고, meta에서도 이 레슨 항목을 제거합니다. 되돌릴 수 없습니다.'
              : '선택한 레슨 번호(' + effectiveLessonId + ')에 등록된 영상이 있으면 삭제합니다. 없으면 안내만 표시됩니다.'}
          </p>
        </section>
      )}

      <section style={{ marginBottom: '24px' }}>
        <button
          type="button"
          onClick={handleUpload}
          disabled={uploading || !adminToken || !file || !instructorId}
          style={{
            padding: '10px 18px',
            borderRadius: '999px',
            border: 'none',
            backgroundColor: uploading ? '#9ca3af' : '#2563eb',
            color: 'white',
            fontWeight: 600,
            fontSize: '14px',
            cursor: uploading ? 'not-allowed' : 'pointer',
          }}
        >
          {uploading ? '업로드 중...' : '업로드'}
        </button>
        <span style={{ marginLeft: '12px', fontSize: '13px', color: '#6b7280' }}>
          {uploading ? '대용량 파일 업로드에는 시간이 걸릴 수 있습니다.' : '필수: ADMIN 토큰 + 파일 + 코스·수준·선생님 선택'}
        </span>
      </section>

      <section style={{ marginBottom: '16px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '13px',
            marginBottom: '4px',
          }}
        >
          <span>진행률</span>
          <span>{progress.toFixed(1)}%</span>
        </div>
        <div
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '999px',
            background: '#e5e7eb',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${Math.min(100, Math.max(0, progress))}%`,
              height: '100%',
              background: progress >= 100 ? '#16a34a' : '#2563eb',
              transition: 'width 0.2s ease-out',
            }}
          />
        </div>
      </section>

      <section>
        <h2
          style={{
            fontSize: '16px',
            fontWeight: 600,
            marginBottom: '8px',
          }}
        >
          로그
        </h2>
        <div
          style={{
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            background: '#f9fafb',
            padding: '8px',
            maxHeight: '220px',
            overflowY: 'auto',
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            fontSize: '12px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {logs.length === 0 ? (
            <div style={{ color: '#9ca3af' }}>업로드 진행 상황이 여기 표시됩니다.</div>
          ) : (
            logs.map((line, idx) => <div key={idx}>{line}</div>)
          )}
        </div>
      </section>
    </div>
  );
}

