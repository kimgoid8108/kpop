"use client";

import React from "react";
import { Sidebar } from "./Sidebar";
import { submenuData } from "./NavBar";

// ----- 인사말(Intro Greeting) 컴포넌트 -----
export default function IntroductionGreeting() {
  // NavBar의 submenuData에서 진흥원 메뉴 데이터 가져오기
  const introMenu = submenuData.find((menu) => menu.label === "진흥원");

  return (
    <div className="w-full max-w-5xl mx-auto my-8 md:my-16 px-4 flex flex-col md:flex-row gap-4 md:gap-8 box-border">
      {/* 왼쪽 사이드 서브 메뉴 */}
      {introMenu && (
        <Sidebar title={introMenu.label} items={introMenu.submenu} />
      )}

      {/* 메인 컨텐츠 */}
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">원장님 인사말</h1>
        <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
          {/* 화면(비주얼 영역) 추가 */}
          <div className="flex justify-center items-center mb-10">
            <video
              className="rounded-lg border shadow w-full max-w-2xl"
              src="/intro-greeting.mp4"
              controls
              autoPlay
              muted
              playsInline
              poster="/intro-greeting-poster.jpg"
              style={{ background: "#eee" }}
            >
              브라우저가 video 태그를 지원하지 않습니다.
            </video>
          </div>
          <p className="mb-4 text-lg text-gray-800 leading-relaxed">
            안녕하세요. <b className="text-indigo-700">글로벌케이팝진흥원</b> 을
            방문해주셔서 감사합니다.
          </p>
          <p className="mb-4 text-gray-700">
            대한민국 대중문화는 세계 속에 한류라고 하는 시대적인 흐름과 현상을
            만들어내고 있으며, 이러한 한류는 한국의 대중음악 즉, ‘K-POP’이
            선도하고 있는 상황으로 ‘K-POP’은 유행하는 하나의 문화 장르로서가
            아닌 국가를 대표하는 전략적 자산으로서 산업적 가치가 충분하며,
            ‘글로벌케이팝진흥원’은 이러한 ‘K-POP’ 의 지속적인 미래를
            이끌어가고자 합니다.
          </p>
          <p className="mb-4 text-gray-700">
            다만, K-POP 을 포함한 한류는 이제 소수의 대형사업자가 독점하여
            포식하는 경제/물질적 가치를 넘어서 인류 모두가 같이 만들어가는
            정신적/ 문화적 가치로써 성장하여야 하며, 다수의 문화사업자들이
            제공하는 진정한 가치를 공유하는 세계적 생태계로써의 미래 가치를
            담아야 할 것입니다.
          </p>
          <p className="mb-6 text-gray-700">
            앞으로도 <b className="text-indigo-700">글로벌케이팝진흥원</b>에
            많은 관심과 성원 부탁드립니다.
          </p>
          <div className="text-right mt-6 md:mt-8 text-black-600 text-lg md:text-xl lg:text-[30px] font-bold">
            <span>글로벌케이팝진흥원 원장 천범주</span>
          </div>
        </section>
      </div>
    </div>
  );
}
