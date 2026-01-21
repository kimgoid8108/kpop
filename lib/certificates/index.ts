import { Certificate } from "./types";
import { danceTrainer } from "./danceTrainer";
import { vocalTrainer } from "./vocalTrainer";
import { kpopDanceFitTrainer } from "./kpopDanceFitTrainer";

export type { Certificate } from "./types";

export const certificates: Certificate[] = [
  danceTrainer,
  vocalTrainer,
  kpopDanceFitTrainer,
];

// 카테고리 목록
export const categories = Array.from(new Set(certificates.map((c) => c.category)));

// ID로 자격증 찾기
export function getCertificateById(id: string): Certificate | undefined {
  return certificates.find((c) => c.id === id);
}
