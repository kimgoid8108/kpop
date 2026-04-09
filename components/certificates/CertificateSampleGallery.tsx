"use client";

import React, { useEffect, useState } from "react";
import {
  CERTIFICATE_SAMPLE_ITEMS,
  SAMPLE_LANG_OPTIONS,
  SAMPLE_LEVEL_OPTIONS,
  type CertificateSampleId,
  type SampleLang,
  type SampleLevel,
  getCertificateSampleSrc,
} from "../../lib/certificates/certificateSamples";
import { AutoT } from "../AutoT";
import { useAutoTranslate } from "../useAutoTranslate";

export function CertificateSampleGallery() {
  const [certId, setCertId] = useState<CertificateSampleId>("dance-trainer");
  const [lang, setLang] = useState<SampleLang>("ko");
  const [level, setLevel] = useState<SampleLevel>("1");
  const [loadFailed, setLoadFailed] = useState(false);

  const src = getCertificateSampleSrc(certId, lang, level);
  const certLabel =
    CERTIFICATE_SAMPLE_ITEMS.find((c) => c.id === certId)?.label ?? "";
  const langLabel = lang === "ko" ? "한글" : "영문";
  const altKo = `${certLabel} 자격증 샘플 (${langLabel} ${level}급)`;
  const alt = useAutoTranslate(altKo);

  useEffect(() => {
    setLoadFailed(false);
  }, [certId, lang, level]);

  return (
    <div className="rounded-md border border-gray-300 bg-gray-50 p-4 md:p-8">
      <p className="mb-5 text-center text-sm text-gray-600">
        <AutoT text="* 본 이미지는 예시이미지입니다. 자격기관별로 하단의 자격증 예시 이미지와 다를 수 있습니다." />
      </p>

      <div className="mb-5 space-y-3">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <AutoT text="자격증" />
          </p>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATE_SAMPLE_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setCertId(item.id)}
                className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                  certId === item.id
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                }`}
              >
                <AutoT text={item.label} />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-start">
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <AutoT text="언어" />
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_LANG_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLang(opt.value)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    lang === opt.value
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <AutoT text={opt.label} />
                </button>
              ))}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              <AutoT text="등급" />
            </p>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_LEVEL_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setLevel(opt.value)}
                  className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                    level === opt.value
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-300 bg-white text-gray-800 hover:bg-gray-100"
                  }`}
                >
                  <AutoT text={opt.label} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto min-h-[280px] max-w-3xl overflow-hidden rounded-md border border-gray-200 bg-white">
        {!loadFailed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={alt}
            className="mx-auto block max-h-[min(70vh,520px)] w-full object-contain p-4"
            onError={() => setLoadFailed(true)}
          />
        ) : (
          <div className="flex min-h-[280px] flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-300 bg-gray-50 px-6 text-center">
            <p className="text-sm font-medium text-gray-700">
              <AutoT text="이미지를 불러올 수 없습니다." />
            </p>
            <p className="text-xs text-gray-500 break-all">
              <AutoT
                text={`다음 경로에 파일을 추가해 주세요: public/certificates/samples/${certId}/${lang}-${level}.png`}
              />
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
