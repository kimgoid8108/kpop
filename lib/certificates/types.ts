export type Certificate = {
  id: string;
  category: string; // 예: "댄스", "보컬", "프로듀싱"
  name: string;
  levels: string; // "1급/2급"
  registrationNumber: string; // 등록번호
  issuingOrg: string; // 발급기관 (요약)
  summary: string; // 간단 소개
  description: {
    intro: string; // 과정 소개 첫 번째 문단
    career: string; // 취득 이후 진로/활용 분야
    levels: Array<{
      level: string; // "1급" 또는 "2급"
      courses: string; // 이수 과목
      target: string; // 대상 및 활동 내용
    }>;
  };
  qualificationInfo: Array<[string, string]>; // 자격정보 표 [라벨, 값]
  orgInfo: Array<[string, string]>; // 기관정보 표 [라벨, 값]
  details: {
    steps: Array<{
      title: string; // STEP1...
      type: "table" | "list" | "text";
      table?: { headers: string[]; rows: string[][] };
      list?: string[];
      text?: string;
    }>;
  };
  notice: string; // 소비자 안내/주의
};
