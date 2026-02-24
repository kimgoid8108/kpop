"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function LessonPlayerPage() {
  const params = useParams();
  const courseId = params?.courseId as string;
  const partId = params?.partId as string;
  const lessonId = params?.lessonId as string;

  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!courseId || !partId || !lessonId) {
      setLoading(false);
      setError("Missing route params");
      return;
    }

    const qs = new URLSearchParams({ courseId, partId, lessonId }).toString();
    fetch(`/api/video-url?${qs}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to get video URL");
        return res.json();
      })
      .then((data: { signedUrl: string }) => {
        setSignedUrl(data.signedUrl);
        setError(null);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load video");
        setSignedUrl(null);
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

  if (error || !signedUrl) {
    return (
      <div className="p-4 max-w-4xl mx-auto">
        <p className="text-red-600 mb-4">{error ?? "Video unavailable"}</p>
        <Link href={`/classroom/list/${courseId}`} className="text-blue-600 hover:underline">
          Back to course
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="mb-4">
        <Link
          href={`/classroom/list/${courseId}`}
          className="text-blue-600 hover:underline text-sm">
          ← Back to course
        </Link>
      </div>
      <video controls src={signedUrl} className="w-full rounded-lg bg-black" />
    </div>
  );
}
