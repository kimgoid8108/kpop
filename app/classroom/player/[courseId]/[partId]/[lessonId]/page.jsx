'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getCourseById } from '@/lib/courses';

export default function LessonPlayerPage() {
  const params = useParams();
  const courseId = params?.courseId ?? '';
  const partId = params?.partId ?? '';
  const lessonId = params?.lessonId ?? '';

  const [url, setUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const course = useMemo(() => getCourseById(String(courseId)), [courseId]);
  const syllabus = useMemo(
    () => (Array.isArray(course?.syllabus) ? course.syllabus : []),
    [course?.syllabus]
  );

  const currentPartNum = partId ? String(partId).trim() : '';
  const currentLessonNum = lessonId ? String(lessonId).trim() : '';

  useEffect(() => {
    const cid = typeof courseId === 'string' ? courseId.trim() : String(courseId ?? '').trim();
    const pid = typeof partId === 'string' ? partId.trim() : String(partId ?? '').trim();
    const lid = typeof lessonId === 'string' ? lessonId.trim() : String(lessonId ?? '').trim();

    if (!cid || !pid || !lid) {
      setLoading(false);
      setError('경로가 올바르지 않습니다. (courseId, partId, lessonId 필요)');
      return;
    }

    fetch('/api/video/url', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ courseId: cid, partId: pid, lessonId: lid }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((d) => {
            throw new Error(d?.error ?? '영상 URL을 가져오지 못했습니다.');
          });
        }
        return res.json();
      })
      .then((data) => {
        setUrl(data.url ?? null);
        setTitle(data.title ?? '');
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : '영상 로드 실패');
        setUrl(null);
      })
      .finally(() => setLoading(false));
  }, [courseId, partId, lessonId]);

  if (loading) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <p className="text-red-600 mb-4">{error ?? 'Video unavailable'}</p>
        <Link href={`/classroom/list/${courseId}`} className="text-blue-600 hover:underline">
          Back to course
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <div className="mb-4">
        <Link
          href={`/classroom/list/${courseId}`}
          className="text-blue-600 hover:underline text-sm"
        >
          ← 강의로 돌아가기
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* 레슨 목록 */}
        <aside className="w-full lg:w-72 shrink-0">
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm">
              {course?.title ?? '레슨 목록'}
            </h3>
            {syllabus.length === 0 ? (
              <p className="text-gray-500 text-sm">등록된 레슨이 없습니다.</p>
            ) : (
              <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                {syllabus.map((part) => (
                  <li key={part.partNumber}>
                    <p className="text-xs font-medium text-gray-500 mt-2 first:mt-0">
                      파트 {part.partNumber}: {part.title}
                    </p>
                    <ul className="ml-2 mt-1 space-y-0.5">
                      {(part.lessons ?? []).map((lesson) => {
                        const isActive =
                          currentPartNum === String(part.partNumber) &&
                          currentLessonNum === String(lesson.lessonNumber);
                        return (
                          <li key={`${part.partNumber}-${lesson.lessonNumber}`}>
                            <Link
                              href={`/classroom/player/${courseId}/${part.partNumber}/${lesson.lessonNumber}`}
                              className={`block py-1.5 px-2 rounded text-sm ${
                                isActive
                                  ? 'bg-blue-100 text-blue-800 font-medium'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              레슨 {lesson.lessonNumber}
                              {lesson.title ? ` - ${lesson.title}` : ''}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>

        {/* 영상 영역 */}
        <div className="flex-1 min-w-0">
          {title ? (
            <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
          ) : null}
          <div className="w-full bg-black rounded-lg overflow-hidden border border-gray-200">
            <video
              key={url}
              controls
              src={url}
              className="w-full"
              playsInline
              preload="metadata"
              onError={() => setError('영상 재생 실패 (파일 없음 또는 CORS 설정 확인)')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
