"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getCourseById } from "@/lib/courses";
import { PageLayout } from "@/components/PageLayout";
import { AutoT } from "@/components/AutoT";

const PATH_ERROR_KO =
  "경로가 올바르지 않습니다. (courseId, partId, lessonId 필요)";
const VIDEO_UNAVAILABLE_KO = "영상을 불러올 수 없습니다.";
const LOAD_FAIL_KO = "영상 로드 실패";
const PLAYBACK_FAIL_KO =
  "영상 재생 실패 (파일 없음 또는 CORS 설정 확인)";
const URL_FETCH_FAIL_KO = "영상 URL을 가져오지 못했습니다.";

export default function LessonPlayerPage() {
  const params = useParams();
  const courseId = params?.courseId ?? "";
  const partId = params?.partId ?? "";
  const lessonId = params?.lessonId ?? "";

  const [url, setUrl] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const course = useMemo(
    () => getCourseById(String(courseId)),
    [courseId],
  );
  const syllabus = useMemo(
    () => (Array.isArray(course?.syllabus) ? course.syllabus : []),
    [course],
  );

  const currentPartNum = partId ? String(partId).trim() : "";
  const currentLessonNum = lessonId ? String(lessonId).trim() : "";

  useEffect(() => {
    let alive = true;

    const cid =
      typeof courseId === "string"
        ? courseId.trim()
        : String(courseId ?? "").trim();
    const pid =
      typeof partId === "string"
        ? partId.trim()
        : String(partId ?? "").trim();
    const lid =
      typeof lessonId === "string"
        ? lessonId.trim()
        : String(lessonId ?? "").trim();

    if (!cid || !pid || !lid) {
      setLoading(false);
      setError(PATH_ERROR_KO);
      return;
    }

    setLoading(true);
    setError(null);

    fetch("/api/video/url", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: cid,
        partId: pid,
        lessonId: lid,
      }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const raw =
            typeof data?.error === "string" && data.error
              ? data.error
              : URL_FETCH_FAIL_KO;
          const err = new Error(raw) as Error & {
            debug?: Record<string, unknown>;
          };
          err.debug = data?.debug;
          throw err;
        }
        return data;
      })
      .then((data) => {
        if (!alive) return;
        setUrl((data.url as string) ?? null);
        setTitle(typeof data.title === "string" ? data.title : "");
        setError(null);
      })
      .catch((err: unknown) => {
        const e = err as Error & {
          debug?: {
            hint?: string;
            lookedFor?: { metaLessonId?: string; metaPartId?: string };
          };
        };
        let msg = e instanceof Error ? e.message : LOAD_FAIL_KO;
        if (e?.debug?.hint) msg += " — " + String(e.debug.hint);
        if (e?.debug?.lookedFor) {
          const lf = e.debug.lookedFor;
          const q = [lf.metaLessonId, lf.metaPartId].filter(Boolean).join(", ");
          if (q) msg += " (조회: " + q + ")";
        }
        if (!alive) return;
        setError(msg);
        setUrl(null);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [courseId, partId, lessonId]);

  const handleVideoError = useCallback(() => {
    setError(PLAYBACK_FAIL_KO);
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="p-4 max-w-4xl mx-auto">
          <p className="text-gray-600">
            <AutoT text="로딩 중..." />
          </p>
        </div>
      </PageLayout>
    );
  }

  if (error || !url) {
    return (
      <PageLayout>
        <div className="p-4 max-w-4xl mx-auto">
          <p className="text-red-600 mb-4 whitespace-pre-wrap">
            {error ? (
              <AutoT text={error} />
            ) : (
              <AutoT text={VIDEO_UNAVAILABLE_KO} />
            )}
          </p>
          <Link
            href={`/classroom/list/${courseId}`}
            className="text-blue-600 hover:underline"
          >
            <AutoT text="강의로 돌아가기" />
          </Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="p-4 max-w-6xl mx-auto">
        <div className="mb-4">
          <Link
            href={`/classroom/list/${courseId}`}
            className="text-blue-600 hover:underline text-sm"
          >
            ← <AutoT text="강의로 돌아가기" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <aside className="w-full lg:w-72 shrink-0">
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-3">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm">
                {course?.title ? (
                  <AutoT text={course.title} />
                ) : (
                  <AutoT text="레슨 목록" />
                )}
              </h3>
              {syllabus.length === 0 ? (
                <p className="text-gray-500 text-sm">
                  <AutoT text="등록된 레슨이 없습니다." />
                </p>
              ) : (
                <ul className="space-y-2 max-h-[60vh] overflow-y-auto">
                  {syllabus.map((part) => (
                    <li key={part.partNumber}>
                      <p className="text-xs font-medium text-gray-500 mt-2 first:mt-0">
                        <AutoT text="파트" /> {part.partNumber}:{" "}
                        <AutoT text={part.title} />
                      </p>
                      <ul className="ml-2 mt-1 space-y-0.5">
                        {(part.lessons ?? []).map((lesson) => {
                          const isActive =
                            currentPartNum === String(part.partNumber) &&
                            currentLessonNum === String(lesson.lessonNumber);
                          return (
                            <li
                              key={`${part.partNumber}-${lesson.lessonNumber}`}
                            >
                              <Link
                                href={`/classroom/player/${courseId}/${part.partNumber}/${lesson.lessonNumber}`}
                                className={`block py-1.5 px-2 rounded text-sm ${
                                  isActive
                                    ? "bg-blue-100 text-blue-800 font-medium"
                                    : "text-gray-700 hover:bg-gray-100"
                                }`}
                              >
                                <AutoT text="레슨" /> {lesson.lessonNumber}
                                {lesson.title ? (
                                  <>
                                    {" "}
                                    — <AutoT text={lesson.title} />
                                  </>
                                ) : null}
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

          <div className="flex-1 min-w-0">
            {title ? (
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                <AutoT text={title} />
              </h2>
            ) : null}
            <div className="w-full bg-black rounded-lg overflow-hidden border border-gray-200">
              <video
                key={url}
                controls
                src={url}
                className="w-full"
                playsInline
                preload="metadata"
                onError={handleVideoError}
              />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
