"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

// 공통 Table 타입
type AlignType = "left" | "center" | "right" | "justify" | "char" | undefined;

type QualificationRow = {
  grade: string;
  age: string;
  education: string;
  etc: string;
};

type ExamCriteriaRow = {
  grade: string;
  criteria: string;
};

type ExamMethodRow = {
  grade: string;
  assignment: string;
  practical: string;
  interview: string;
  pass: string;
};

// ▶보컬트레이너
const VOCAL_QUALIFICATION_ROWS: QualificationRow[] = [
  {
    grade: "1급",
    age: "무관",
    education: "전문학사 이상",
    etc: `아래 중 택1\n1. 해당분야 교육경력 또는 실무경력 (공연, 방송, 앨범 등) 5년 이상인 자\n2. 본 기관의 2급 자격을 취득한 자\n3. 본 기관의 관련학과 졸업(예정)자 중 평균학점 C (70점) 이상인 자\n4. 외국인으로서 상기의 내용과 동일한 등급의 자격을 갖춘 자`,
  },
  {
    grade: "2급",
    age: "무관",
    education: "무관",
    etc: `아래 중 택1\n1. 해당분야 교육경력 또는 실무경력 (공연, 방송, 앨범 등) 2년 이상인 자\n2. 본 기관이 주관하는 교육과정 이수(예정)자\n3. 외국인으로서 상기의 내용과 동일한 등급의 자격을 갖춘 자`,
  },
];

const VOCAL_EXAM_CRITERIA_ROWS: ExamCriteriaRow[] = [
  {
    grade: "1급",
    criteria:
      "보컬 전문가를 희망하는 지망생 등을 대상으로 교육 프로그램 기획과 개발, 교육 및 지도업무 등을 수행할 수 있는 직무역량을 갖추고 있는지를 기준으로 검정",
  },
  {
    grade: "2급",
    criteria:
      "보컬 초보자, 취미자 등을 대상으로 교육 및 지도업무 등을 수행할 수 있는 직무역량을 갖추고 있는지를 기준으로 검정",
  },
];

const VOCAL_EXAM_METHOD_ROWS: ExamMethodRow[] = [
  {
    grade: "1급",
    assignment: "보컬 트레이닝 수업계획 (15회차 이상)",
    practical: "자유곡 및 지정곡 시연 (창작, 연주, 랩, 힙합 포함)",
    interview: "전문 심사위원과의 질의응답",
    pass: "과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득 \n합격 판정",
  },
  {
    grade: "2급",
    assignment: "보컬 트레이닝 수업계획 (10회차 이상)",
    practical: "자유곡 및 지정곡 시연 (랩, 힙합 포함)",
    interview: "전문 심사위원과의 질의응답",
    pass: "과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득 \n합격 판정",
  },
];

// ▶댄스트레이너
const DANCE_QUALIFICATION_ROWS: QualificationRow[] = [
  {
    grade: "1급",
    age: "무관",
    education: "전문학사 이상",
    etc: `아래 중 택1\n1. 해당분야 교육경력 또는 실무경력 (공연, 방송, 앨범 등) 5년 이상인 자\n2. 본 기관의 2급 자격을 취득한 자\n3. 본 기관의 관련학과 졸업(예정)자 중 평균학점 C (70점) 이상인 자\n4. 외국인으로서 상기의 내용과 동일한 등급의 자격을 갖춘 자`,
  },
  {
    grade: "2급",
    age: "무관",
    education: "무관",
    etc: `아래 중 택1\n1. 해당분야 교육경력 또는 실무경력 (공연, 방송, 앨범 등) 2년 이상인 자\n2. 본 기관이 주관하는 교육과정 이수(예정)자\n3. 외국인으로서 상기의 내용과 동일한 등급의 자격을 갖춘 자`,
  },
];

const DANCE_EXAM_CRITERIA_ROWS: ExamCriteriaRow[] = [
  {
    grade: "1급",
    criteria:
      "댄스 전문가를 희망하는 지망생 등을 대상으로 교육 프로그램 기획과 개발, 교육 및 지도업무 등을 수행할 수 있는 직무역량을 갖추고 있는지를 기준으로 검정",
  },
  {
    grade: "2급",
    criteria:
      "댄스 초보자, 취미자 등을 대상으로 교육 및 지도업무 등을 수행할 수 있는 직무역량을 갖추고 있는지를 기준으로 검정",
  },
];

const DANCE_EXAM_METHOD_ROWS: ExamMethodRow[] = [
  {
    grade: "1급",
    assignment: "댄스 트레이닝 수업계획 (15회차 이상)",
    practical: "코레오그래피(걸리쉬, 힐코레오, 케이팝코레오 등) 및 창작 댄스 시연",
    interview: "전문 심사위원과의 질의응답",
    pass: "과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득 \n합격 판정",
  },
  {
    grade: "2급",
    assignment: "댄스 트레이닝 수업계획 (10회차 이상)",
    practical: "방송댄스, 커버댄스 및 전공 댄스 실기 시연",
    interview: "전문 심사위원과의 질의응답",
    pass: "과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득 \n합격 판정",
  },
];

// ▶케이팝댄스핏트레이너
const KPOP_FIT_QUALIFICATION_ROWS: QualificationRow[] = [
  {
    grade: "1급",
    age: "무관",
    education: "전문학사 이상",
    etc: `아래 중 택1\n1. 해당분야 교육경력 또는 실무경력 (공연, 방송, 앨범 등) 5년 이상인 자\n2. 본 기관의 2급 자격을 취득한 자\n3. 본 기관의 관련학과 졸업(예정)자 중 평균학점 C (70점) 이상인 자\n4. 외국인으로서 상기의 내용과 동일한 등급의 자격을 갖춘 자`,
  },
  {
    grade: "2급",
    age: "무관",
    education: "무관",
    etc: `아래 중 택1\n1. 해당분야 교육경력 또는 실무경력 (공연, 방송, 앨범 등) 2년 이상인 자\n2. 본 기관이 주관하는 교육과정 이수(예정)자\n3. 외국인으로서 상기의 내용과 동일한 등급의 자격을 갖춘 자`,
  },
];

const KPOP_FIT_EXAM_CRITERIA_ROWS: ExamCriteriaRow[] = [
  {
    grade: "1급",
    criteria:
      "댄스 피트니스 전문가를 희망하는 지망생 등을 대상으로 교육 프로그램 기획과 개발, 교육 및 지도업무 등을 수행할 수 있는 직무역량을 갖추고 있는지를 기준으로 검정",
  },
  {
    grade: "2급",
    criteria:
      "댄스 피트니스 초보자, 취미자 등을 대상으로 교육 및 지도업무 등을 수행할 수 있는 직무역량을 갖추고 있는지를 기준으로 검정",
  },
];

const KPOP_FIT_EXAM_METHOD_ROWS: ExamMethodRow[] = [
  {
    grade: "1급",
    assignment: "케이팝 댄스 피트니스 트레이닝 수업계획(15회차 이상)",
    practical: "창작 시퀀스 구성 및 시연",
    interview: "전문 심사위원과의 질의응답",
    pass: "과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득 \n합격 판정",
  },
  {
    grade: "2급",
    assignment: "케이팝 댄스 피트니스 트레이닝 수업계획(10회차 이상)",
    practical: "커버 댄스 및 전공 댄스 실기 시연",
    interview: "전문 심사위원과의 질의응답",
    pass: "과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득 \n합격 판정",
  },
];

// 공통 Table 컴포넌트
function SimpleTable<T>({
  columns,
  rows,
  title,
  minWidth,
}: {
  columns: { header: string; key: keyof T; className?: string; align?: AlignType }[];
  rows: T[];
  title?: string;
  minWidth?: string;
}) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-lg md:text-xl font-bold mb-2 text-gray-900">
          <AutoT text={title} />
        </h2>
      )}
      <div className={`w-full overflow-x-auto my-4`}>
        <table
          className="w-full border border-gray-300 text-sm md:text-base bg-white"
          style={minWidth ? { minWidth } : {}}
        >
          <thead>
            <tr className="bg-gray-100 text-gray-900 font-semibold">
              {columns.map((col) => (
                <th
                  key={col.header}
                  className={`px-3 py-2 border-r last:border-r-0 border-gray-300 ${col.className ?? ""}`}
                  align={col.align}
                >
                  <AutoT text={col.header} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="border-b border-gray-200 last:border-b-0">
                {columns.map((col) => (
                  <td
                    key={col.key as string}
                    className={`px-3 py-2 align-top whitespace-pre-line break-words ${col.className ?? ""} border-r last:border-r-0 border-gray-300`}
                    align={col.align}
                  >
                    <AutoT text={String(row[col.key] ?? "")} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function TrainerBox({
  title,
  description,
  qualificationRows,
  examCriteriaRows,
  examMethodRows,
  passNote,
  durationNote,
}: {
  title: string;
  description: string;
  qualificationRows: QualificationRow[];
  examCriteriaRows: ExamCriteriaRow[];
  examMethodRows: ExamMethodRow[];
  passNote: string;
  durationNote: string;
}) {
  return (
    <div
      className="max-w-[850px] mx-auto mb-10 md:mb-14 px-4 py-8 bg-white shadow-sm border border-gray-300 rounded-lg"
      style={{
        boxShadow: "0 1px 8px 0 rgb(16 30 54 / 4%)",
      }}
    >
      <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
        <AutoT text={title} />
      </h1>
      <p className="mb-7 md:mb-12 text-gray-700 text-[15px]">
        <AutoT text={description} />
      </p>
      {/* STEP1 */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg md:text-xl text-blue-700">STEP 1.</span>
          <span className="font-bold text-lg md:text-xl text-gray-900">교육과정 이수 자격요건</span>
        </div>
      </div>
      <SimpleTable<QualificationRow>
        title={`${title} 등급별 응시자격`}
        columns={[
          { header: "등급", key: "grade", className: "w-[60px]" },
          { header: "연령", key: "age", className: "w-[70px]" },
          { header: "학력", key: "education", className: "w-[110px]" },
          { header: "기타사항 (택1)", key: "etc", className: "min-w-[300px]" },
        ]}
        rows={qualificationRows}
        minWidth="600px"
      />

      {/* STEP2 */}
      <div className="mb-2 flex items-center gap-2">
        <span className="font-bold text-lg md:text-xl text-blue-700">STEP 2.</span>
        <span className="font-bold text-lg md:text-xl text-gray-900">검정기준</span>
      </div>
      <SimpleTable<ExamCriteriaRow>
        title={`${title} 등급별 검정기준`}
        columns={[
          { header: "등급", key: "grade", className: "w-[60px]" },
          { header: "검정기준", key: "criteria", className: "min-w-[320px]" },
        ]}
        rows={examCriteriaRows}
        minWidth="450px"
      />

      {/* STEP3 */}
      <div className="mb-2 flex items-center gap-2">
        <span className="font-bold text-lg md:text-xl text-blue-700">STEP 3.</span>
        <span className="font-bold text-lg md:text-xl text-gray-900">검정방법 및 검정과목</span>
      </div>
      <SimpleTable<ExamMethodRow>
        title={`${title} 등급별 검정방법 및 검정과목`}
        columns={[
          { header: "등급", key: "grade", className: "w-[60px]" },
          { header: "검정방법", key: "assignment", className: "min-w-[150px]" },
          { header: "검정과목(분야 또는 영역)", key: "practical", className: "min-w-[150px]" },
          { header: "면접", key: "interview", className: "min-w-[120px]" },
          { header: "합격 기준", key: "pass", className: "min-w-[120px]" },
        ]}
        rows={examMethodRows}
        minWidth="760px"
      />
      <div className="mt-6 mb-6 text-sm text-gray-800">
        <AutoT text={passNote} />
      </div>
      {/* STEP4 */}
      <div className="mb-4 flex items-center gap-2">
        <span className="font-bold text-lg md:text-xl text-blue-700">STEP 4.</span>
        <span className="font-bold text-lg md:text-xl text-gray-900">자격취득</span>
      </div>
      <div className="text-gray-800 whitespace-pre-line leading-relaxed text-sm md:text-base mb-0">
        <AutoT text={durationNote} />
      </div>
    </div>
  );
}

export default function CertificatesRelatedPage() {
  return (
    <PageLayout>
      <div className="max-w-[850px] mx-auto my-12 md:my-16 px-2">
        <TrainerBox
          title="댄스트레이너"
          description="댄스트레이너 자격증 등급별 응시자격, 검정 기준, 검정방법 및 유효기간 등 세부사항입니다."
          qualificationRows={DANCE_QUALIFICATION_ROWS}
          examCriteriaRows={DANCE_EXAM_CRITERIA_ROWS}
          examMethodRows={DANCE_EXAM_METHOD_ROWS}
          passNote=": 과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득한 자를 합격자로 판정한다."
          durationNote=": 댄스트레이너 자격은 취득 후 5년간 유효기간을 두며, 유효기간 만료 시 재등록을 하여야 한다."
        />
        <TrainerBox
          title="보컬트레이너"
          description="보컬트레이너 자격증 등급별 응시자격, 검정 기준, 검정방법 및 유효기간 등 세부사항입니다."
          qualificationRows={VOCAL_QUALIFICATION_ROWS}
          examCriteriaRows={VOCAL_EXAM_CRITERIA_ROWS}
          examMethodRows={VOCAL_EXAM_METHOD_ROWS}
          passNote=": 과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득한 자를 합격자로 판정한다."
          durationNote=": 보컬트레이너 자격은 취득 후 5년간 유효기간을 두며, 유효기간 만료 시 재등록을 하여야 한다."
        />
        <TrainerBox
          title="케이팝댄스핏트레이너"
          description="케이팝댄스핏트레이너 자격증 등급별 응시자격, 검정 기준, 검정방법 및 유효기간 등 세부사항입니다."
          qualificationRows={KPOP_FIT_QUALIFICATION_ROWS}
          examCriteriaRows={KPOP_FIT_EXAM_CRITERIA_ROWS}
          examMethodRows={KPOP_FIT_EXAM_METHOD_ROWS}
          passNote=": 과제평가, 실기시험, 면접시험 모두 100점 만점 기준 60점 이상 획득한 자를 합격자로 판정한다."
          durationNote=": 케이팝댄스핏트레이너 자격은 취득 후 5년간 유효기간을 두며, 유효기간 만료 시 재등록을 하여야 한다."
        />
        <div className="mt-4 mb-2 text-xs text-gray-600 text-center">
          <AutoT text="※ 위 기준은 변동될 수 있으므로, 반드시 학과 공지사항/홈페이지를 통해 최신 내용을 확인 바랍니다." />
        </div>
      </div>
    </PageLayout>
  );
}
