/**
 * 발급 안내 — 샘플 이미지 경로 규칙
 *
 * 각 자격증 폴더에 아래 파일명으로 이미지를 두면 됩니다 (public 기준):
 *   public/certificates/samples/{id}/ko-1.png  … 한글 1급
 *   public/certificates/samples/{id}/ko-2.png  … 한글 2급
 *   public/certificates/samples/{id}/en-1.png  … 영문 1급
 *   public/certificates/samples/{id}/en-2.png  … 영문 2급
 */

export type CertificateSampleId =
  | "dance-trainer"
  | "kpop-dance-fit-trainer"
  | "vocal-trainer";

export type SampleLang = "ko" | "en";

export type SampleLevel = "1" | "2";

export const CERTIFICATE_SAMPLE_ITEMS: {
  id: CertificateSampleId;
  label: string;
}[] = [
  { id: "dance-trainer", label: "댄스트레이너" },
  { id: "kpop-dance-fit-trainer", label: "케이팝댄스핏트레이너" },
  { id: "vocal-trainer", label: "보컬트레이너" },
];

export const SAMPLE_LANG_OPTIONS: { value: SampleLang; label: string }[] = [
  { value: "ko", label: "한글" },
  { value: "en", label: "영문" },
];

export const SAMPLE_LEVEL_OPTIONS: { value: SampleLevel; label: string }[] = [
  { value: "1", label: "1급" },
  { value: "2", label: "2급" },
];

export function getCertificateSampleSrc(
  id: CertificateSampleId,
  lang: SampleLang,
  level: SampleLevel,
): string {
  return `/certificates/samples/${id}/${lang}-${level}.png`;
}
