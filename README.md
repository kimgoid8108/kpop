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
  - 이 파일은 메인 페이지의 컴포넌트와 논리를 담고 있습니다.
  - 예시로, 로고 컴포넌트(`LogoArea`), 메뉴 및 서브메뉴, 그리고 메뉴 관련 데이터(`submenuData`)가 정의되어 있습니다.
  - 메뉴 항목(`MenuItem`)과 서브메뉴(`SubMenu`) 컴포넌트가 분리되어 있어 관리가 편리합니다.
  - 각 메뉴에 마우스를 올리면 서브메뉴가 드롭다운으로 나타나는 구조입니다.
  - 데이터(`submenuData`)는 추후 별도의 파일이나 상수로 분리할 수 있습니다.
  - 전체 스타일은 Tailwind CSS 클래스로 적용되어 있습니다.

> 💡 페이지를 수정하고 싶다면 `app/page.tsx` 파일을 변경하세요. 저장 시 자동 반영되어 브라우저에서 바로 확인할 수 있습니다.

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
