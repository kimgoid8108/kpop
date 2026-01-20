"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function OfflineCenterPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-10">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900">
            <AutoT text="오프라인센터" />
          </h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">

            <div className="space-y-6">
              <div className="border-l-4 border-indigo-500 pl-4">
                <h2 className="text-lg md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="POPKON(케이팝홍보관)소개" />
                </h2>
                <p className="text-gray-700">
                  <AutoT text="글로벌사이버대학교(강남구 압구정동)에 위치한 케이팝 홍보관 ‘POPKON’은 ‘K-POP+ON’의 의미를 담아, 밤하늘의 수많은 별처럼 한국의 케이팝 스타들이 탄생하는 인큐베이터이자, 케이팝을 사랑하는 팬들의 아늑한 놀이터를 지향합니다.
이곳에서는 방탄소년단(BTS), ATEEZ, 엔하이픈, 투모로우바이투게더, 제로베이스원 등 세계적인 케이팝 스타들이 배출되었고, 팬들과 교류하며 함께 즐길 수 있는 소중한 공간의 필요성을 느꼈습니다. 비록 공간은 크지 않지만, 세계 각국의 청년들과 많은 이들이 K-POP을 통해 힐링과 사랑을 나누는 중심지가 되기를 바랍니다. POPKON은 케이팝 팬뿐 아니라 모두가 함께 어울릴 수 있는 문화 한류센터이기도 합니다.
K-POP 홍보관 POPKON은 ‘팬의 놀이터’라는 취지답게 팬들이 직접 공간을 만들어 갑니다. 전 세계 케이팝 팬들이 갤러리 존을 꾸미고, 팬 아트로 만든 다양한 굿즈를 전시·홍보하고 판매할 수 있는 장으로 운영됩니다. 오픈 스튜디오에서는 POPKON 유튜브 채널도 운영되고, 팬들의 궁금증을 풀어주는 ‘팝콘을 튀겨라’ 등 다양한 프로그램이 첫 유튜브 콘텐츠로 준비되어 있습니다. 팬들이 플리 마켓으로 활용하거나, 스스로 노래방처럼 공간을 자유롭게 사용할 수도 있습니다. 젊은 아이디어들이 모여 계속해서 새로운 K-POP 콘텐츠를 만들어갈 계획입니다." />
                </p>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
                {[
                  {
                    src: "/global_cyber.png",
                    alt: "글로벌사이버대학교 서울학습관",
                    caption: "글로벌사이버대학교 서울학습관"
                  },
                  {
                    src: "/popkon.png",
                    alt: "외부전경(POPKON 입구)",
                    caption: "외부전경(POPKON 입구)"
                  },
                  {
                    src: "/coffeepopkon.png",
                    alt: "Coffee POPKON",
                    caption: "Coffee POPKON"
                  },
                  {
                    src: "/stargoods.png",
                    alt: "스타 굿즈존",
                    caption: "스타 굿즈존"
                  },
                  {
                    src: "/stargallery.png",
                    alt: "스타 갤러리",
                    caption: "스타 갤러리"
                  },
                  {
                    src: "/inside.png",
                    alt: "내부전경",
                    caption: "내부전경"
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    {/* 실제 실 서비스에서는 next/image의 Image 컴포넌트 사용 권장 */}
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="w-full rounded-lg object-cover h-40 mb-2 shadow"
                    />
                    <div className="text-center text-sm text-gray-700 mt-1">
                      <AutoT text={item.caption} />
                    </div>
                  </div>
                ))}
              </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
