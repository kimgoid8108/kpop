export interface Activity {
  id: string;
  title: string;
  content?: string;
  createdAt: Date;
  views: number;
  hasAttachment: boolean;
  images?: string[]; // 이미지 경로 배열 (public 폴더 기준)
}

// 더미 데이터
export const dummyActivities: Activity[] = [
  {
    id: "2",
    title: "<2025 나누면 배가 되는 압구정 희망나눔 페어> 홍보부스 운영 및 축하무대 공연",
    content: "홍보부스 운영 및 축하무대 공연",
    createdAt: new Date(2025, 10, 25),
    views: 60,
    hasAttachment: false,
    images: [
      "/압구정 희망나눔 1.jpg",
      "/압구정 희망나눔 2.jpg",
      "/압구정 희망나눔 3.jpg",
    ],
  },
  {
    id: "1",
    title: "<2025 홍성 글로벌 바비큐 페스티벌> 홍보부스 운영 및 버스킹 공연",
    content: "홍보부스 운영 및 버스킹 공연",
    createdAt: new Date(2025, 10, 30),
    views: 55,
    hasAttachment: false,
    images: [
      "/홍성 글로벌 1.jpg",
      "/홍성 글로벌 2.jpg",
    ],
  },
];
