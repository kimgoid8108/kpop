"use client";

import React from "react";
import { PageLayout } from "../../../components/PageLayout";
import { AutoT } from "../../../components/AutoT";

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        <div className="w-full">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6 text-gray-900"><AutoT text="진흥원 소개" /></h1>
          <section className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
            <p className="mb-4 text-lg text-gray-800 leading-relaxed">
              <b className="text-indigo-700"><AutoT text="글로벌케이팝 진흥원이란?" /></b>
               <br  />
               <AutoT text="글로벌케이팝진흥원은 지난 15여년간 500여명의 아티스트를 배출해낸 글로벌사이버대학교 방송연예학과의 교육시스템을 발판으로 지속적으로 세계적인 인재를 양성하는 곳입니다." /> <br />
<AutoT text="K-POP의 요람이라 불리며 수많은 아티스트들의 출발점이 되어준 일지아트홀을 통한 산업과의 교류를 통해 공연, 영상, 음악 등의 콘텐츠뿐만이 아닌" /> <br /><AutoT text="출판, 전시, 굿즈 등 2차 IP의 개발을 통해 글로벌 팬들과 함께하는 케이팝의 놀이터이자 터전이 될 것을 약속 드립니다." />
              
            </p>
            <div className="space-y-4 md:space-y-6 my-20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="rounded-lg border shadow bg-gray-50 p-5 flex flex-col items-center">
                  <span className="text-2xl mb-2">🎤</span>
                  <h3 className="font-bold text-indigo-700 mb-1"><AutoT text="인재 양성 사업 교육" /></h3>
                  <p className="text-gray-700 text-sm text-center my-2">
                   - <AutoT text="케이팝전문가양성과정" /> -
                  </p>
                  <p className="text-gray-700 text-sm text-center my-2">
                    - <AutoT text="한류교육과정 해외보급" /> -
                  </p>
                </div>
                <div className="rounded-lg border shadow bg-gray-50 p-5 flex flex-col items-center">
                  <span className="text-2xl mb-2">🌐</span>
                  <h3 className="font-bold text-indigo-700 mb-1"><AutoT text="콘텐츠 프로덕션" /></h3>
                  <p className="text-gray-700 text-sm text-center my-2">
                    - <AutoT text="케이팝 공연" /> -
                  </p>
                  <p className="text-gray-700 text-sm text-center my-2">
                    - <AutoT text="케이팝 영상 스튜디오" /> -
                  </p>
                  <p className="text-gray-700 text-sm text-center my-2">
                    - <AutoT text="한류 행사 등" /> -
                  </p>
                </div>
                <div className="rounded-lg border shadow bg-gray-50 p-5 flex flex-col items-center">
                  <span className="text-2xl mb-2">🤝</span>
                  <h3 className="font-bold text-indigo-700 mb-1"><AutoT text="K-POP 플랫폼" /></h3>
                  <p className="text-gray-700 text-sm text-center my-2">
                    - <AutoT text="케이팝 홍보관 운영" /> -
                  </p>
                  <p className="text-gray-700 text-sm text-center my-2">
                    - <AutoT text="글로벌 IP 유통" /> - <br />(<AutoT text="교육 전시 등" />)
                  </p>
                 
                </div>
              </div>
              <div className="border-l-4 border-indigo-500 pl-4 my-20">
                <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-900">
                  <AutoT text="발전 방향" />
                </h2>
                <p className="text-gray-700">
                <AutoT text="글로벌케이팝진흥원은 스타들과 팬들이 함께 즐기며 콘텐츠를 만들면서 서로간의 문화를 공유하고 소통하는 하나의 문화 시그니처로 역할을 하게 될 것입니다." /> <br /> <AutoT text="K-POP을 통해 스타와 팬을 둘러싼 다양한 현상을 계속 연구하고 탐구해서 체계화하고," /> <br /><AutoT text="이를 다른 형태의 문화로 적용해나가는 선순환 생태계를 만들어 가고자 합니다." /> <br /><AutoT text="아시아로부터 시작해 전세계로 K-POP의 전문가와 홍보관을 확장해 나갈 계획입니다." />
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </PageLayout>
  );
}
