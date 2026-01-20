// 파트너/협약기관 데이터 타입 정의
export interface Partner {
  id: string;
  name: string;
  logo: string;
  url?: string;
}

// 엔터/기업 로고 데이터
export const enterprisePartners: Partner[] = [
  {
    id: "enterprise-1",
    name: "기업 파트너 1",
    logo: "/Enter1.png",
    url: "#",
  },
  {
    id: "enterprise-2",
    name: "기업 파트너 2",
    logo: "/Enter2.png",
    url: "#",
  },

];

// 공공/청소년기관 데이터
export const publicPartners: Partner[] = [
  {
    id: "public-1",
    name: "공공기관 1",
    logo: "/public1.png",
    url: "#",
  },
  {
    id: "public-2",
    name: "청소년기관 1",
    logo: "/public2.png",
    url: "#",
  },
  {
    id: "public-3",
    name: "공공기관 2",
    logo: "/public3.png",
    url: "#",
  },
  {
    id: "public-4",
    name: "청소년기관 2",
    logo: "/public4.png",
    url: "#",
  },
  {
    id: "public-5",
    name: "공공기관 3",
    logo: "/public5.png",
    url: "#",
  },
];

// 지도 정보
export const mapInfo = {
  address: "서울특별시 강남구 압구정로 32길 11 (신사동) 6층",
  embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3164.3237593484296!2d127.0396187!3d37.5238647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca38825c1e6b3%3A0xbff2bfe7d5ac9441!2z7J287KeA7JWE7Yq47ZmA!5e0!3m2!1sko!2skr!4v1768221735308",
};
