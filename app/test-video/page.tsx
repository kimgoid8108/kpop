"use client";
import { useEffect, useState } from "react";

export default function TestVideoPage() {
  const [url, setUrl] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/video-url?courseId=testcourse")
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || "Unknown error occurred");
        }
        return res.json();
      })
      .then((data) => {
        setUrl(data.signedUrl);
        setErr(null);
      })
      .catch((e) => {
        // e가 Error 객체가 아니거나 e.message가 없을 수도 있으므로 방어적으로 처리
        setErr(e?.message ? String(e.message) : String(e));
        setUrl(null);
      });
  }, []);

  if (err)
    return (
      <div style={{ padding: 16, color: "red", whiteSpace: "pre-wrap" }}>
        <b>에러 발생</b>
        <div>{err}</div>
        <button
          style={{
            marginTop: 12,
            padding: "6px 16px",
            background: "#eee",
            borderRadius: 4,
            border: "1px solid #aaa",
          }}
          onClick={() => {
            setErr(null);
            setUrl(null);
          }}>
          다시 시도
        </button>
      </div>
    );

  if (!url) return <div>Loading...</div>;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ marginBottom: 12, wordBreak: "break-all" }}>
        <a href={url} target="_blank" rel="noreferrer">
          signedUrl 열기
        </a>
      </div>
      <video controls src={url} style={{ width: "100%", maxWidth: 900 }} />
    </div>
  );
}
