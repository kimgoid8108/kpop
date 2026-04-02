이 프로젝트는 [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app)으로 시작된 [Next.js](https://nextjs.org) 프로젝트입니다.

## 시작하기

개발 서버를 실행하려면 아래 명령어 중 하나를 사용하세요:

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
# 또는
bun dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)에 접속하면 결과를 확인할 수 있습니다.

### 주요 파일 구조 및 페이지 설명

- `app/page.tsx`  
  루트 경로(`/`)의 진입점이며, `Layout` 컴포넌트를 렌더합니다. 메인 화면의 실제 UI는 `components/Layout` 및 그 하위에서 구성됩니다.

### 사이드바(Sidebar) 구조

고정 사이드바는 **데이터·UI 조각·조립**으로 나뉘어 있습니다. 메뉴 문구나 경로를 바꿀 때는 아래를 기준으로 찾으면 됩니다.

| 위치 | 설명 |
|------|------|
| `lib/nav/sidebarNav.ts` | 사이드바 전용 네비 타입(`SidebarNavMenuItem` 등), 메뉴 배열 `sidebarSubmenuData`, 강의실 섹션 구분용 상수 `SIDEBAR_CLASSROOM_SECTION_PATH` |
| `components/sidebar/SidebarMenuIcon.tsx` | 상위 메뉴 라벨별 아이콘 SVG |
| `components/sidebar/SidebarLogo.tsx` | 로고 영역(홈 링크) |
| `components/sidebar/SidebarLanguageSelect.tsx` | 언어 선택 |
| `components/sidebar/SidebarNav.tsx` | 접이식 전체 메뉴. 비로그인일 때 **온라인 스튜디오**(`path`가 `/classroom/list`인 그룹)에서는 하위 링크 중 **강의리스트**(`/classroom/list`)만 표시 |
| `components/sidebar/SidebarSearch.tsx` | 검색 입력 및 `/search?q=…` 이동 |
| `components/sidebar/SidebarAuthPanel.tsx` | 로그인·통합로그인·회원가입 모달·로그인 후 회원 메뉴 |
| `components/Sidebar.tsx` | 위 블록을 한 화면에 조립하는 얇은 컴포넌트 |

**하위 호환:** 예전처럼 `components/Sidebar`에서 `submenuData`를 가져오는 코드가 있다면, 내부적으로 `sidebarSubmenuData`와 동일한 배열을 그대로 export합니다. 새 코드에서는 `lib/nav/sidebarNav`의 `sidebarSubmenuData`를 직접 import하는 것을 권장합니다.

페이지를 수정할 때는 해당 `app/.../page.tsx`와 그 페이지가 쓰는 `components`를 보면 됩니다. 개발 서버를 켠 상태에서 저장하면 브라우저에 곧바로 반영됩니다.

### 글꼴 및 최적화

- 이 프로젝트는 [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts)를 활용해 [Geist](https://vercel.com/font) 폰트를 자동 적용 및 최적화합니다.

## 더 알아보기

Next.js에 대한 자세한 정보와 학습 자료:

- [Next.js 공식 문서](https://nextjs.org/docs) - Next.js의 기능과 API 설명
- [Next.js 튜토리얼](https://nextjs.org/learn) - 단계별 실습형 튜토리얼
- [Next.js GitHub](https://github.com/vercel/next.js) - 소스코드와 이슈, 기여 관련

## Vercel에 배포하기

Next.js 앱을 배포하는 가장 쉬운 방법은 [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)을 이용하는 것입니다.

배포에 대한 자세한 내용은 [Next.js 배포 문서](https://nextjs.org/docs/app/building-your-application/deploying)를 참고하세요.
