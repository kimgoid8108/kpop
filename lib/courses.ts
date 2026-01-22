export interface Course {
  id: string;
  image: string;
  category: string;
  categoryEn: string;
  title: string;
  intro?: string;
  content?: string;
  reviews?: Review[];
  syllabus?: SyllabusPart[];
  // 추가 필드
  instructor?: string;
  level?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Lesson {
  lessonNumber: number;
  title: string;
}

export interface SyllabusPart {
  partNumber: number;
  title: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  // 담당 강사/수준 정보 없음 (피트니스 강사과정이므로 해당 정보 필요시 추가)
  {
    id: "1",
    image: "/Dance1.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "댄스 피트니스",
    intro: `K-POP댄스를 피트니스로 안무화한 강사과정`,
    content: "K-POP댄스 피트니스를 이해하며 안무화 하여 강사로써의 자질을 갖춘다",
    reviews: [
      {
        id: "1",
        author: "김수진",
        rating: 5,
        comment: "정말 재미있고 운동도 많이 되네요! 강사님이 친절하시고 설명도 잘 해주셔서 초보자인 저도 쉽게 따라할 수 있었습니다.",
        date: "2024.01.15",
      },
      {
        id: "2",
        author: "이민호",
        rating: 4,
        comment: "K-POP 댄스를 배우면서 체력도 기를 수 있어서 일석이조입니다. 다음 강의도 수강하고 싶어요!",
        date: "2024.01.20",
      },
    ],
    syllabus: [
      {
        partNumber: 1,
        title: "K-POP 댄스 피트니스",
        lessons: [
          {
            lessonNumber: 1,
            title: "K-POP 댄스 피트니스의 개념"
          },
          {
            lessonNumber: 2,
            title: "피트니스 & 댄스 융합 모델 이해"
          },
          {
            lessonNumber: 3,
            title: "K-POP 리듬 워밍업 실습"
          },
        ],
      },
      {
        partNumber: 2,
        title: "신체 시스템 이해와 운동원리",
        lessons: [
          {
            lessonNumber: 1,
            title: "유산소&무산소 운동"
          },
          {
            lessonNumber: 2,
            title: "피트니스 루틴 설계법 (FITT 원칙)"
          },
          {
            lessonNumber: 3,
            title: "리듬 트레이닝&스텝 댄스 실습"
          },
        ],
      },
      {
        partNumber: 3,
        title: "근육 루틴의 구조와 적용",
        lessons: [
          {
            lessonNumber: 1,
            title: "상,하체 근육 종류와 기능"
          },
          {
            lessonNumber: 2,
            title: "상,하체 근육 루틴 디자인"
          },
          {
            lessonNumber: 3,
            title: "댄스 피트니스에 적용 가능한 웨이트 트레이닝 실습"
          },
        ],
      },
      {
        partNumber: 4,
        title: "장르별 댄스 이해",
        lessons: [
          {
            lessonNumber: 1,
            title: "힙합/재즈/스트리트댄스 기본 이론"
          },
          {
            lessonNumber: 2,
            title: "K-POP 안무에 활용되는 재즈 댄스 실습1"
          },
          {
            lessonNumber: 3,
            title: "K-POP 안무에 활용되는 재즈 댄스 실습2"
          },
        ],
      },
      {
        partNumber: 5,
        title: "안무 구성 원리",
        lessons: [
          {
            lessonNumber: 1,
            title: "음악구조에 따른 안무 구성 방식"
          },
          {
            lessonNumber: 2,
            title: "포인트 안무와 파트 구분"
          },
          {
            lessonNumber: 3,
            title: "실제 안무 분석 실습"
          },
        ],
      },
      {
        partNumber: 6,
        title: "리듬감 향상과 템포 조절 루틴",
        lessons: [
          {
            lessonNumber: 1,
            title: "리듬 분석과 bpm에 따른 운동 강도"
          },
          {
            lessonNumber: 2,
            title: "카운트 적용법"
          },
          {
            lessonNumber: 3,
            title: "K-POP 스타일 곡에 맞춘 루틴 연습"
          },
        ],
      },
      {
        partNumber: 7,
        title: "피트니스 루틴 안무화 전략",
        lessons: [
          {
            lessonNumber: 1,
            title: "동작 단순화/피트니스화 원리"
          },
          {
            lessonNumber: 2,
            title: "루틴간 연결과 반복 설계"
          },
          {
            lessonNumber: 3,
            title: "피트니스 안무 루틴 실습"
          },
        ],
      },
    ],
    instructor: "김도경",
    level: "강사",
  },
  {
    id: "2",
    image: "/Dance2.png",
    category: "댄스",
    categoryEn: "Dance",
    title: "K-POP 퍼포먼스 실전 마스터",
    intro: `K-POP 안무를 분석해 필요한 기본 능력을 향상하고 퍼포먼스의 표현력과 구성을 이해하여 작품의 완성도를 높입니다.`,
    content: `- K-POP 안무의 기본 구조와 필요한 기본기를 익혀 작품을 완성한다.
- K-POP 안무를 분석하여 표현과 구성 등의 퍼포먼스의 완성도를 높인다.
- 완성도 높은 퍼포먼스로 무대 감각과 창의적 표현력을 향상해 작품의 완성도를 높인다.`,
    reviews: [
      {
        id: "1",
        author: "박지영",
        rating: 5,
        comment: "정말 전문적인 강의입니다. 아이돌 무대를 보는 것 같아서 너무 재미있어요!",
        date: "2024.01.10",
      },
    ],
    syllabus: [
      {
        partNumber: 1,
        title: "Warm-up. Isolation & Stretching",
        lessons: [
          { lessonNumber: 1, title: "Stretching" },
          { lessonNumber: 2, title: "Warm-up" },
          { lessonNumber: 3, title: "Isolation의 디테일한 동작 이해" },
        ],
      },
      {
        partNumber: 2,
        title: "기본 스텝과 정확한 움직임과 K-POP 기초",
        lessons: [
          { lessonNumber: 1, title: "업/다운 바운스 차이 이해" },
          { lessonNumber: 2, title: "기본스텝의 기초 및 이해" },
          { lessonNumber: 3, title: "바운스와 기본기 스텝 응용" },
        ],
      },
      {
        partNumber: 3,
        title: "K-POP 기초 동작",
        lessons: [
          { lessonNumber: 1, title: "선 뻗기 & 본인만의 포즈" },
          { lessonNumber: 2, title: "킥의 방향성, 팔의 라인과 컨트롤" },
          { lessonNumber: 3, title: "바디 컨트롤" },
        ],
      },
      {
        partNumber: 4,
        title: "댄스 기본리듬의 이해",
        lessons: [
          { lessonNumber: 1, title: "기본 리듬의 이해" },
          { lessonNumber: 2, title: "기본 리듬의 방식" },
          { lessonNumber: 3, title: "기본 리듬의 응용" },
        ],
      },
    ],
    instructor: "이현종",
    level: "강사",
  },
  {
    id: "3",
    image: "/Dance3.png",
    category: "댄스",
    categoryEn: "Dance",
    title: "표현력 업! K-POP 댄스 교실",
    intro: `중학생의 신체 성장 발달과 감성 발현을 고려하여 기초적인
K-POP 댄스 동작에서부터 감정을 담은 표현까지 확장된 실습형
수업입니다. 댄스를 통해 신체 조절력, 표현력, 협업 능력을 자연
스럽게 키우며, 간단한 작품 안무도 함께 익히는 경험 중심의 수
업으로 구성됩니다
강의 내용`,
    content: `- 기본 동작을 바르게 익혀 부상 방지와 바른 성장을 할 수 있도록 한다.
- K-POP 안무를 분석해 퍼포먼스를 이해하고 표현한다.
- 기본 동작을 적용해 K-POP 안무를 커버한다.
- 자신의 감정과 개성을 춤으로 표현하고 성취감을 향상한다.`,
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "1주차. K-pop 댄스의 기초 개념과 이해",
        lessons: [
          { lessonNumber: 1, title: "K-pop 장르 소개 & 스트레칭 및 워밍업" },
          { lessonNumber: 2, title: "다양한 리듬 및 분절 동작(아이솔레이션)" },
        ],
      },
      {
        partNumber: 2,
        title: "2주차. K-pop 기초 동작 & 커버 댄스 1",
        lessons: [
          { lessonNumber: 1, title: "K-POP 기초 동작 1 : 팔 앵글 및 라인 만들기" },
          { lessonNumber: 2, title: "커버 댄스 실습 (1)" },
        ],
      },
      {
        partNumber: 3,
        title: "3주차. K-pop 기초 동작 & 커버 댄스 2",
        lessons: [
          { lessonNumber: 1, title: "K-POP 기초 동작 2 : 하체 리듬 및 동작" },
          { lessonNumber: 2, title: "커버 댄스 실습 (2)" },
        ],
      },
      {
        partNumber: 4,
        title: "4주차. K-pop 커버 댄스 3 & K-pop 퍼포먼스 이해",
        lessons: [
          { lessonNumber: 1, title: "커버 댄스 실습 (3)" },
          { lessonNumber: 2, title: "커버 곡의 퍼포먼스 이해 및 포인트 동작 강화" },
        ],
      },
    ],
    instructor: "김수연",
    level: "중등",
  },
  {
    id: "4",
    image: "/Dance4.png",
    category: "댄스",
    categoryEn: "Dance",
    title: "나도 K-POP 스타! 첫 걸음 댄스 수업",
    intro: `춤에 대한 흥미와 재미를 자연스럽게 키우는 입문형 수업으로
성장기 어린이들에게 맞는 기본 동작을 익히고 바른 성장을 위해
K-POP 안무를 수정 보완하여 흥미롭고 재미있는 창의적 체험 학
습입니다`,
    content: `- 성장기에 맞는 기본 동작을 익혀 바른 성장에 도움을 준다.
- 기본 동작을 응용한 안무로 리듬에 맞춰 움직임에 대한 자신감을 키운다.
- K-POP 안무를 쉽고 재미있게 익혀 창의적 표현력과 성취감을 기른다.`,
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "k-pop 기초 스텝 & 바디 웨이브 기본기",
        lessons: [
          { lessonNumber: 1, title: "전신 스트레칭과 k-pop 댄스를 위한 기초 스텝" },
          { lessonNumber: 2, title: "상체, 허리, 다리 온몸으로 웨이브 연결" },
        ],
      },
      {
        partNumber: 2,
        title: "표정과 개성을 찾는 K-POP 동작 만들기",
        lessons: [
          { lessonNumber: 1, title: "선택한 곡의 적절한 표정 표현 연습" },
          { lessonNumber: 2, title: "실제 안무 동작 도입" },
        ],
      },
      {
        partNumber: 3,
        title: "K-POP 커버 댄스 1",
        lessons: [
          { lessonNumber: 1, title: "커버 댄스 실습 (1)" },
          { lessonNumber: 2, title: "커버 댄스 실습 (2)" },
        ],
      },
      {
        partNumber: 4,
        title: "K-POP 커버 댄스 2",
        lessons: [
          { lessonNumber: 1, title: "커버 댄스 실습 (3)" },
          { lessonNumber: 2, title: "커버 댄스 실습 (4)" },
        ],
      },
    ],
    instructor: "김현아",
    level: "초등",
  },
  {
    id: "5",
    image: "/Dance5.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "나도 K-POP 댄스스타",
    intro: `신나고 재미있게 K-POP 댄스를 배우며 자신감을 기를 수 있도록 구성된 실습 중심의 수업입니다.
음악에 맞춰 몸을 움직이고, 기본 동작부터 커버댄스, 표현력, 무대연출까지 단계별로 익히며 댄스에 대한 흥미와 표현력을 키웁니다.
게임처럼 즐기는 리듬 활동과 실습을 통해 적극적인 참여를 유도하며, 친구들과 함께 무대를 만들며 협동심과 성취감을 느낄 수 있습니다. `,
    content: `- 음악에 맞춰 몸을 움직이며, 리듬 감각을 기른다.
- K-POP 댄스의 기본동작을 재미있게 익힌다.
- 표정, 시선 제스쳐를 통해 자신 있게 표현하는 법을 배운다.
- 친구들과 함께 커버댄스를 완성하며 협동심을 키운다.
- 배운 안무를 통해 친구들과 함께 멋있는 무대를 만들어본다.`,
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "춤을 배우기 전 가져야 할 마음가짐이란?",
        lessons: [
          { lessonNumber: 1, title: "춤을 배우기 전에 마음가짐" },
        ],
      },
      {
        partNumber: 2,
        title: "댄스의 웜업과 업다운 바운스가 뭘까요?",
        lessons: [
          { lessonNumber: 1, title: "웜업과 바운스" },
        ],
      },
      {
        partNumber: 3,
        title: "리듬감 키우기와 팔뻗기",
        lessons: [
          { lessonNumber: 1, title: "리듬감 키우기와 팔뻗기" },
        ],
      },
      {
        partNumber: 4,
        title: "몸으로 웨이브하기",
        lessons: [
          { lessonNumber: 1, title: "몸과 팔로 웨이브하기" },
        ],
      },
      {
        partNumber: 5,
        title: "댄스의 다양한 스텝(STEP)",
        lessons: [
          { lessonNumber: 1, title: "다양한 스텝을 배워요" },
          { lessonNumber: 2, title: "다양한 스텝을 배워요 2" },
        ],
      },
      {
        partNumber: 6,
        title: "힙합댄스의 이론과 역사, 스트릿댄스의 종류.",
        lessons: [
          { lessonNumber: 1, title: "힙합 댄스의 역사와 스트릿댄스의 종류." },
          { lessonNumber: 2, title: "힙합 댄스의 역사와 스트릿댄스의 종류 2" },
        ],
      },
      {
        partNumber: 7,
        title: "K-POP 안무 배우기",
        lessons: [
          { lessonNumber: 1, title: "K-POP 안무 배우기" },
          { lessonNumber: 2, title: "K-POP 안무 배우기 2" },
        ],
      },
      {
        partNumber: 8,
        title: "우리만의 멋진 무대 완성하기",
        lessons: [
          { lessonNumber: 1, title: "우리들은 아이돌!" },
          { lessonNumber: 2, title: "우리들은 아이돌! 2" },
        ],
      },
    ],
    instructor: "김온유",
    level: "초등",
  },
  {
    id: "6",
    image: "/vocal1.jpg",
    category: "음악",
    categoryEn: "Music",
    title: "보컬트레이닝 기법",
    intro: `보컬트레이너들을 위한 기초와 실전 트레이닝 기법`,
    content: "트레이닝 기초와 전문 지식의 적립과 향상",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "보컬트레이너란?",
        lessons: [
          { lessonNumber: 1, title: "개념" },
          { lessonNumber: 2, title: "의무와 책임1" },
          { lessonNumber: 3, title: "의무와 책임2" },
        ],
      },
      {
        partNumber: 2,
        title: "2주차. 보컬 트레이닝의 개념과 필요성",
        lessons: [
          { lessonNumber: 1, title: "개념과 필요성1" },
          { lessonNumber: 2, title: "개념과 필요성2" },
          { lessonNumber: 3, title: "개념과 필요성3" },
        ],
      },
      {
        partNumber: 3,
        title: "3주차. 소리의 해부학적 원리",
        lessons: [
          { lessonNumber: 1, title: "원리1" },
          { lessonNumber: 2, title: "원리2" },
          { lessonNumber: 3, title: "원리3" },
        ],
      },
    ],
    instructor: "박래준",
    level: "강사",
  },
  {
    id: "7",
    image: "/Dance6.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "댄스 마스터",
    intro:`본 수업은 댄스의 이론적 배경 및 장르별 안무 이해, 구성 원리, 무대 연출 및 교육 커뮤니케이션을 다루며, 실전 모의 수업을 통해 현장 대응 능력을 강화하며 댄스 강사로서의 전문성과 실제 교육 환경에서의 강의 기획과 피드 백 능력을 함양한다.
수강생은 이론 및 실습 기반 수업을 통해 교육자로서의 소양과 실전 강의 능력을 갖춘 댄스 강사로 성장하게 된다.`,
    content: `학습자는 다양한 장르의 안무를 분석하고 실습함으로써, 댄스 강사로서 반드시 갖추어야 할 기초 강사 역량과 장르 이해도를 단계적으로 구축하게 된다. 이 과정에서 안무 구성 원리, 음악 구조 해석, 퍼포먼스 연출 방식을 실전 중심으로 경험하며, 실제 교육 환경에서 요구되는 안무 구성법, 효과적인 피드백 기술, 수업 커뮤니케이션 전략을 종합적으로 습득한다.

최종적으로는 자신만의 수업을 기획하고 이를 수행할 수 있을 만큼의 실기력·교육력·수업 운영 능력을 갖춘 전문 댄스 강사로 성장하는 것을 목표로 한다。

＊ 수업교재 ： 『큐잉의 모든 것』, Eric Franklin 저, 군자출판사, 2023년
`,
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "댄스 교육자의 역할",
        lessons: [
          { lessonNumber: 1, title: "댄스 강사의 역할" },
          { lessonNumber: 2, title: "수업 운영 방법 및 리더십" },
          { lessonNumber: 3, title: "수업 계획서 작성법" },
        ],
      },
      {
        partNumber: 2,
        title: "K-POP 댄스 이해 1",
        lessons: [
          { lessonNumber: 1, title: "K-POP 댄스의 기원과 변천사" },
          { lessonNumber: 2, title: "세대별 안무 특징과 변화" },
          { lessonNumber: 3, title: "4세대 K-POP 댄스와 미래" },
        ],
      },
      {
        partNumber: 3,
        title: "장르별 댄스 이해 1",
        lessons: [
          { lessonNumber: 1, title: "스트릿 댄스의 역사적 배경" },
          { lessonNumber: 2, title: "스트릿 댄스 장르 1" },
          { lessonNumber: 3, title: "스트릿 댄스 장르 2" },
        ],
      },
      {
        partNumber: 4,
        title: "Warm-up & Isolation",
        lessons: [
          { lessonNumber: 1, title: "Warm-up의 필요성" },
          { lessonNumber: 2, title: "Warm-up 실습" },
          { lessonNumber: 3, title: "Isolation 실습" },
        ],
      },
      {
        partNumber: 5,
        title: "음악과 안무의 구성 원리",
        lessons: [
          { lessonNumber: 1, title: "비트, 리듬 개념 정리" },
          { lessonNumber: 2, title: "음악 구조와 안무 구성" },
          { lessonNumber: 3, title: "바운스 기반 리듬 응용" },
        ],
      },
      {
        partNumber: 6,
        title: "안무 분석",
        lessons: [
          { lessonNumber: 1, title: "안무의 흐름과 구조 파악" },
          { lessonNumber: 2, title: "안무의 구성 요소 이해" },
          { lessonNumber: 3, title: "세부 동작과 디테일 이해" },
        ],
      },
      {
        partNumber: 7,
        title: "K-pop 안무 실습",
        lessons: [
          { lessonNumber: 1, title: "K-pop 안무 동작 구성" },
          { lessonNumber: 2, title: "K-pop 안무 동작 습득" },
          { lessonNumber: 3, title: "K-pop 안무 동작 디테일 심화" },
        ],
      },
      {
        partNumber: 8,
        title: "Choreography 실습",
        lessons: [
          { lessonNumber: 1, title: "Choreography 동작 습득" },
          { lessonNumber: 2, title: "Choreography 동작 습득 2" },
          { lessonNumber: 3, title: "Choreography 동작 심화" },
        ],
      },
      {
        partNumber: 9,
        title: "Choreography & Performance",
        lessons: [
          { lessonNumber: 1, title: "코레오그래피의 개념과 정의" },
          { lessonNumber: 2, title: "안무의 작품화" },
          { lessonNumber: 3, title: "소품과 공간" },
        ],
      },
      {
        partNumber: 10,
        title: "Girlish style 실습",
        lessons: [
          { lessonNumber: 1, title: "워킹 베이직" },
          { lessonNumber: 2, title: "턴 베이직" },
          { lessonNumber: 3, title: "플로어 안무 체득 실습" },
        ],
      },
      {
        partNumber: 11,
        title: "콘셉트와 연출",
        lessons: [
          { lessonNumber: 1, title: "퍼포먼스 콘셉트 기획" },
          { lessonNumber: 2, title: "스타일링/소품/무대효과" },
          { lessonNumber: 3, title: "무대 사례 분석" },
        ],
      },
      {
        partNumber: 12,
        title: "수업 커뮤니케이션",
        lessons: [
          { lessonNumber: 1, title: "학습자 소통 전략" },
          { lessonNumber: 2, title: "동기부여/칭찬/교정" },
          { lessonNumber: 3, title: "문제 상황 대처" },
        ],
      },
      {
        partNumber: 13,
        title: "강의 시연 및 피드백",
        lessons: [
          { lessonNumber: 1, title: "강의 시연 1" },
          { lessonNumber: 2, title: "강의 시연 2" },
          { lessonNumber: 3, title: "피드백 및 질의응답" },
        ],
      },
    ],
    instructor: "유민경",
    level: "강사",
  },
  {
    id: "8",
    image: "/Dance7.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "슈퍼스타 K-POP 댄서",
    intro: `K-POP 댄스 전문 실습 프로그램으로, 기본기부터 퍼포먼스 완성까지 단계별로 구성되어 있습니다. 바디 컨트롤, 리듬 표현, 감정 전달 등 퍼포먼스 능력 향상을 목표로 하며, XR 기반 콘텐츠를 활용해 몰입도 높은 수업을 제공합니다. 댄스뿐만 아니라 보컬과 무대 구성까지 아우르는 종합 예술 활동을 통해 자신감을 높이고, 창의적 자기표현 능력을 개발할 수 있습니다.`,
    content: `- K-POP 댄스의 기본 동작과 루틴을 정확히 익힌다.
- 음악의 리듬과 감정에 맞춘 동작 표현력을 기른다.
- 발성과 보컬 표현을 통해 무대 감각을 함께 향상시킨다.
- XR 기반 콘텐츠를 통해 실감형 댄스 경험을 쌓는다.
- 팀워크를 바탕으로 하나의 무대를 기획·연출하며 발표력을 키운다.`,
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "1주차. 몸 풀기 체조 & 원스텝 리듬 게임",
        lessons: [
          { lessonNumber: 1, title: "워밍업 & 스트레칭 (Warm-up)" },
          { lessonNumber: 2, title: "기본 리듬 감각 익히기 (원스텝 리듬)" },
        ],
      },
      {
        partNumber: 2,
        title: "2주차. 기본 스텝과 정확한 움직임",
        lessons: [
          { lessonNumber: 1, title: "정확한 기본 스텝과 밸런스 잡기" },
          { lessonNumber: 2, title: "기초 회전과 응용" },
        ],
      },
      {
        partNumber: 3,
        title: "3주차. 댄스 기본기 1",
        lessons: [
          { lessonNumber: 1, title: "아이솔레이션 기초 및 응용" },
          { lessonNumber: 2, title: "웨이브 기초 및 응용" },
        ],
      },
      {
        partNumber: 4,
        title: "4주차. 댄스 기본기 2",
        lessons: [
          { lessonNumber: 1, title: "바운스 기초 및 응용" },
          { lessonNumber: 2, title: "댄스 기본기를 활용한 루틴" },
        ],
      },
      {
        partNumber: 5,
        title: "5주차. 안무 스킬 트레이닝",
        lessons: [
          { lessonNumber: 1, title: "호흡을 이용한 안무스킬" },
          { lessonNumber: 2, title: "에너지를 이용한 안무스킬" },
        ],
      },
      {
        partNumber: 6,
        title: "6주차. K-POP 스타일 기본 동작 루틴",
        lessons: [
          { lessonNumber: 1, title: "K-POP 댄스 동작 디테일 & 각도 표현 훈련" },
          { lessonNumber: 2, title: "K-POP 댄스 유사동작 익히기" },
        ],
      },
      {
        partNumber: 7,
        title: "7주차. K-POP 커버 댄스 1",
        lessons: [
          { lessonNumber: 1, title: "K-POP 커버 댄스 part.1" },
          { lessonNumber: 2, title: "K-POP 커버 댄스 part.2" },
        ],
      },
      {
        partNumber: 8,
        title: "8주차. K-POP 커버 댄스 2",
        lessons: [
          { lessonNumber: 1, title: "K-POP 커버 댄스 파트별 연결" },
          { lessonNumber: 2, title: "K-POP 커버 댄스 연습 (느리게, 원래 속도)" },
        ],
      },
    ],
    instructor: "최성룡",
    level: "중등",
  },
  {
    id: "9",
    image: "/AIMusic.png",
    category: "음악",
    categoryEn: "Music",
    title: "누구나 할 수 있는, AI 음악 만들기",
    intro: `AI를 처음 접하는 중학생도 쉽게 따라올 수 있도록 구성된 창작 체험형 음악 수업입니다. Suno, ChatGPT 등 AI 도구를 활용해 음악을 만드는 전 과정을 직접 경험하며 창의력과 디지털 표현력을 키웁니다.`,
    content: `1. AI 작곡 툴의 원리를 이해하고 직접 활용할 수 있다.
2. 기초 음악 지식을 배우고 프롬프트를 활용해 원하는 음악을 만든다.
3. 음악 저작권과 AI 음악의 상업적 활용 범위에 대해 이해할 수 있다.`,
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "AI 작곡의 시작",
        lessons: [
          { lessonNumber: 1, title: "AI 생성 음악이란?" },
          { lessonNumber: 2, title: "AI 작곡 첫걸음" },
        ],
      },
      {
        partNumber: 2,
        title: "리듬과 악기",
        lessons: [
          { lessonNumber: 1, title: "템포, 박자, 리듬" },
          { lessonNumber: 2, title: "악기와 목소리" },
        ],
      },
      {
        partNumber: 3,
        title: "음악의 장르",
        lessons: [
          { lessonNumber: 1, title: "인기 음악 장르 살펴보기" },
          { lessonNumber: 2, title: "다양한 음악 장르 만나보기" },
        ],
      },
      {
        partNumber: 4,
        title: "작사와 곡 구조",
        lessons: [
          { lessonNumber: 1, title: "AI로 가사 만들기" },
          { lessonNumber: 2, title: "곡 구조 배우기" },
        ],
      },
      {
        partNumber: 5,
        title: "OST와 BGM",
        lessons: [
          { lessonNumber: 1, title: "영화/드라마 OST" },
          { lessonNumber: 2, title: "애니메이션/게임 BGM" },
        ],
      },
      {
        partNumber: 6,
        title: "콘텐츠 음악 제작",
        lessons: [
          { lessonNumber: 1, title: "광고/유튜브 음악 만들기" },
          { lessonNumber: 2, title: "다양한 AI 도구들" },
        ],
      },
      {
        partNumber: 7,
        title: "AI 편곡의 세계",
        lessons: [
          { lessonNumber: 1, title: "리믹스 만들기" },
          { lessonNumber: 2, title: "오디오 업로드" },
        ],
      },
      {
        partNumber: 8,
        title: "곡 완성과 저작권",
        lessons: [
          { lessonNumber: 1, title: "사운드 후반 작업" },
          { lessonNumber: 2, title: "저작권과 생성 예술" },
        ],
      },
    ],
    instructor: "박지은",
    level: "중등",
  },
  {
    id: "10",
    image: "/vocal2.jpg",
    category: "음악",
    categoryEn: "Music",
    title: "내가 바로 K-POP 스타",
    intro: `재미있는 K-POP 노래를 배울 수 있고 노래의 기초인 호흡과 발성의 자세를 쉽게 배우고, 음정과 박자감각을 익혀 노래실력을 키울 수 있게 도와줍니다. `,
    content: `- 노래를 부를 때의 바른 자세와 호흡을 배워 건강하게 노래하는 방법을 익혀요.
- K-POP 노래를 배워 노래에 대한 흥미를 가질 수 있어요.
- 노래의 다양한 기술을 배워서 익힐 수 있어요.
- 노래의 리듬감을 키우는 법을 배워요.
- 나만의 멋진 무대를 만들어 자신감을 뿜뿜 키워봐요.`,
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "노래의 호흡과 자세를 배워요",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
      {
        partNumber: 2,
        title: "노래를 부를때의 마음가짐",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
      {
        partNumber: 3,
        title: "노래의 발성과 믹스보이스",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
      {
        partNumber: 4,
        title: "턱과 목에 힘빼기와 공명점 찾기",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
      {
        partNumber: 5,
        title: "끝음 처리와 감정을 담는 법을 알아봐요",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
      {
        partNumber: 6,
        title: "오디션을 알아보고 리듬감도 키워봐요",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
      {
        partNumber: 7,
        title: "노래를 분석해서 잘 따라불러요",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
      {
        partNumber: 8,
        title: "노래를 분석해서 잘 따라불러요 2",
        lessons: [
          { lessonNumber: 1, title: "" },
          { lessonNumber: 2, title: "" },
        ],
      },
    ],
    instructor: "김온유",
    level: "초등",
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
