export interface Course {
  id: string;
  image: string;
  category: string;
  categoryEn: string;
  title: string;
  description?: string;
  content?: string;
  reviews?: Review[];
  syllabus?: SyllabusPart[];
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
  description: string;
}

export interface SyllabusPart {
  partNumber: number;
  title: string;
  lessons: Lesson[];
}

export const courses: Course[] = [
  {
    id: "1",
    image: "/Dance1.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "댄스 피트니스",
    description: "K-POP댄스를 피트니스로 안무화한 강사과정",
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
        title: "기본 스텝과 리듬감 익히기",
        lessons: [
          {
            lessonNumber: 1,
            title: "기본 스텝 학습",
            description: "K-POP 댄스의 기본 스텝을 배웁니다.",
          },
          {
            lessonNumber: 2,
            title: "리듬감 향상",
            description: "음악에 맞춰 리듬감을 익힙니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "상체 움직임과 팔 동작",
        lessons: [
          {
            lessonNumber: 1,
            title: "상체 유연성 기르기",
            description: "상체의 유연성을 기릅니다.",
          },
          {
            lessonNumber: 2,
            title: "팔 동작 연습",
            description: "다양한 팔 동작을 연습합니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "하체 움직임과 발동작",
        lessons: [
          {
            lessonNumber: 1,
            title: "하체 근력 강화",
            description: "하체 근력을 강화합니다.",
          },
          {
            lessonNumber: 2,
            title: "발동작 익히기",
            description: "정확한 발동작을 익힙니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "전체 동작 연결하기",
        lessons: [
          {
            lessonNumber: 1,
            title: "동작 연결 연습",
            description: "배운 동작들을 연결합니다.",
          },
          {
            lessonNumber: 2,
            title: "완성 안무 만들기",
            description: "완성된 안무를 만들어봅니다.",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    image: "/Dance2.png",
    category: "댄스",
    categoryEn: "Dance",
    title: "K-POP 퍼포먼스 실전 마스터",
    description: "K-POP 아이돌처럼 화려한 퍼포먼스를 완성하는 실전 중심 강의입니다.",
    content: "이 강의는 K-POP 퍼포먼스의 모든 요소를 마스터할 수 있도록 구성되었습니다. 기본 동작부터 고급 테크닉까지 단계적으로 학습하며, 실제 무대에서 사용할 수 있는 퍼포먼스 스킬을 습득합니다.",
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
        title: "퍼포먼스 기초",
        lessons: [
          {
            lessonNumber: 1,
            title: "기본 개념 이해",
            description: "퍼포먼스의 기본 개념을 배웁니다.",
          },
          {
            lessonNumber: 2,
            title: "기본 자세",
            description: "올바른 자세를 익힙니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "표현력 향상",
        lessons: [
          {
            lessonNumber: 1,
            title: "표정 연습",
            description: "표정을 통한 표현력을 기릅니다.",
          },
          {
            lessonNumber: 2,
            title: "몸짓 연습",
            description: "몸짓을 통한 표현력을 기릅니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "실전 안무",
        lessons: [
          {
            lessonNumber: 1,
            title: "K-POP 안무 학습",
            description: "실제 K-POP 곡의 안무를 배웁니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "무대 매너",
        lessons: [
          {
            lessonNumber: 1,
            title: "무대 매너",
            description: "무대에서의 매너를 익힙니다.",
          },
          {
            lessonNumber: 2,
            title: "포즈 연습",
            description: "무대 포즈를 연습합니다.",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    image: "/Dance3.png",
    category: "댄스",
    categoryEn: "Dance",
    title: "표현력 업! K-POP 댄스 교실",
    description: "표현력을 극대화하여 감동적인 무대를 만드는 강의입니다.",
    content: "이 강의는 단순히 춤을 추는 것이 아니라, 감정을 전달하고 관객을 사로잡는 표현력을 기르는 데 중점을 둡니다. 다양한 연습을 통해 자신만의 스타일을 찾아보세요.",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "표현력 기초",
        lessons: [
          {
            lessonNumber: 1,
            title: "기본 원리 이해",
            description: "표현력의 기본 원리를 이해합니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "감정 표현",
        lessons: [
          {
            lessonNumber: 1,
            title: "감정 표현 기법",
            description: "다양한 감정을 춤으로 표현하는 방법을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "스타일 개발",
        lessons: [
          {
            lessonNumber: 1,
            title: "나만의 스타일 찾기",
            description: "자신만의 독특한 스타일을 개발합니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "완성도 높이기",
        lessons: [
          {
            lessonNumber: 1,
            title: "완성도 향상",
            description: "전체적인 완성도를 높여 완벽한 무대를 만듭니다.",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    image: "/Dance4.png",
    category: "댄스",
    categoryEn: "Dance",
    title: "나도 K-POP 스타! 첫 걸음 댄스 수업",
    description: "처음 시작하는 분들을 위한 기초부터 차근차근 배우는 강의입니다.",
    content: "K-POP 댄스를 처음 배우시는 분들을 위한 친절하고 체계적인 강의입니다. 두려워하지 마세요! 천천히 따라하다 보면 어느새 멋진 댄서가 되어 있을 거예요.",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "첫 걸음",
        lessons: [
          {
            lessonNumber: 1,
            title: "기본 자세",
            description: "기본 자세를 배웁니다.",
          },
          {
            lessonNumber: 2,
            title: "워밍업",
            description: "워밍업을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "기본 동작",
        lessons: [
          {
            lessonNumber: 1,
            title: "기본 동작 익히기",
            description: "가장 기본이 되는 동작들을 익힙니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "리듬 타기",
        lessons: [
          {
            lessonNumber: 1,
            title: "리듬 이해하기",
            description: "음악에 맞춰 리듬을 타는 방법을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "간단한 안무",
        lessons: [
          {
            lessonNumber: 1,
            title: "안무 완성하기",
            description: "배운 것들을 모아 간단한 안무를 완성합니다.",
          },
        ],
      },
    ],
  },
  {
    id: "5",
    image: "/Dance5.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "나도 K-POP 댄스스타",
    description: "K-POP 댄스의 모든 것을 마스터하여 진정한 댄스스타가 되는 강의입니다.",
    content: "이 강의는 K-POP 댄스의 모든 요소를 종합적으로 다루는 고급 과정입니다. 기본부터 고급까지 모든 것을 배울 수 있습니다.",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "기초 다지기",
        lessons: [
          {
            lessonNumber: 1,
            title: "기초 연습",
            description: "기초를 탄탄히 다집니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "중급 테크닉",
        lessons: [
          {
            lessonNumber: 1,
            title: "중급 테크닉 학습",
            description: "중급 수준의 테크닉을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "고급 안무",
        lessons: [
          {
            lessonNumber: 1,
            title: "고급 안무 연습",
            description: "고급 안무를 연습합니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "완성",
        lessons: [
          {
            lessonNumber: 1,
            title: "최종 완성",
            description: "최종 완성 단계입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "6",
    image: "/vocal1.jpg",
    category: "음악",
    categoryEn: "Music",
    title: "보컬트레이닝 기법",
    description: "전문 보컬 트레이닝 기법을 배워 완벽한 보컬리스트가 되는 강의입니다.",
    content: "이 강의는 보컬의 기본부터 고급 기법까지 체계적으로 배울 수 있는 종합 보컬 트레이닝 프로그램입니다. 호흡법, 발성법, 감정 표현 등 모든 것을 배울 수 있습니다.",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "호흡법",
        lessons: [
          {
            lessonNumber: 1,
            title: "기본 호흡법",
            description: "올바른 호흡법을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "발성법",
        lessons: [
          {
            lessonNumber: 1,
            title: "정확한 발성",
            description: "정확한 발성법을 익힙니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "음정과 박자",
        lessons: [
          {
            lessonNumber: 1,
            title: "음정 연습",
            description: "정확한 음정을 연습합니다.",
          },
          {
            lessonNumber: 2,
            title: "박자 연습",
            description: "정확한 박자를 연습합니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "감정 표현",
        lessons: [
          {
            lessonNumber: 1,
            title: "감정 담기",
            description: "노래에 감정을 담는 방법을 배웁니다.",
          },
        ],
      },
    ],
  },
  {
    id: "7",
    image: "/Dance6.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "댄스 마스터",
    description: "댄스의 모든 것을 마스터하는 고급 강의입니다.",
    content: "이 강의는 댄스의 모든 요소를 종합적으로 다루는 마스터 과정입니다.",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "기초",
        lessons: [
          {
            lessonNumber: 1,
            title: "기초 다지기",
            description: "기초를 다집니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "중급",
        lessons: [
          {
            lessonNumber: 1,
            title: "중급 학습",
            description: "중급을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "고급",
        lessons: [
          {
            lessonNumber: 1,
            title: "고급 연습",
            description: "고급을 연습합니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "마스터",
        lessons: [
          {
            lessonNumber: 1,
            title: "마스터 단계",
            description: "마스터 단계입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "8",
    image: "/Dance7.jpg",
    category: "댄스",
    categoryEn: "Dance",
    title: "슈퍼스타 K-POP 댄서",
    description: "슈퍼스타가 되는 그날까지! 최고의 K-POP 댄서를 만드는 강의입니다.",
    content: "이 강의는 최고 수준의 K-POP 댄서를 양성하기 위한 전문 과정입니다.",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "기초",
        lessons: [
          {
            lessonNumber: 1,
            title: "기초 다지기",
            description: "기초를 다집니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "중급",
        lessons: [
          {
            lessonNumber: 1,
            title: "중급 학습",
            description: "중급을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "고급",
        lessons: [
          {
            lessonNumber: 1,
            title: "고급 연습",
            description: "고급을 연습합니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "완성",
        lessons: [
          {
            lessonNumber: 1,
            title: "완성 단계",
            description: "완성 단계입니다.",
          },
        ],
      },
    ],
  },
  {
    id: "9",
    image: "/vocal2.jpg",
    category: "음악",
    categoryEn: "Music",
    title: "내가 바로 K-POP 스타",
    description: "K-POP 스타가 되는 모든 것을 배우는 종합 강의입니다.",
    content: "이 강의는 K-POP 스타가 되기 위한 모든 요소를 종합적으로 다루는 프로그램입니다.",
    reviews: [],
    syllabus: [
      {
        partNumber: 1,
        title: "기초",
        lessons: [
          {
            lessonNumber: 1,
            title: "기초 다지기",
            description: "기초를 다집니다.",
          },
        ],
      },
      {
        partNumber: 2,
        title: "중급",
        lessons: [
          {
            lessonNumber: 1,
            title: "중급 학습",
            description: "중급을 배웁니다.",
          },
        ],
      },
      {
        partNumber: 3,
        title: "고급",
        lessons: [
          {
            lessonNumber: 1,
            title: "고급 연습",
            description: "고급을 연습합니다.",
          },
        ],
      },
      {
        partNumber: 4,
        title: "완성",
        lessons: [
          {
            lessonNumber: 1,
            title: "완성 단계",
            description: "완성 단계입니다.",
          },
        ],
      },
    ],
  },
];

export function getCourseById(id: string): Course | undefined {
  return courses.find((course) => course.id === id);
}
