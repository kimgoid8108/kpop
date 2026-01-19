"use client";

import React, { memo } from "react";
import logo from "../public/global_Logo_shot.png";
import { AutoT } from "./AutoT";

// ----- Footer 컴포넌트 -----
// 페이지 하단의 연락처, 주소, 사업자 정보 등 표시
export const Footer = memo(function Footer() {
  return (
    <footer
      className="bg-white border-t border-gray-200 text-gray-700 leading-tight text-sm w-full"
      style={{
        position: "static",
        left: "unset",
        right: "unset",
        marginLeft: "unset",
        marginRight: "unset",
        maxWidth: "100%",
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-10 py-4 sm:py-5 md:py-7 flex flex-wrap gap-3 sm:gap-4 md:gap-6 lg:gap-10 justify-between items-start md:items-center footer-bar-wrap max-w-full overflow-x-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-3 sm:gap-4 md:gap-0">
          <div className="flex flex-1 items-start md:items-center gap-2 sm:gap-3 leading-tight pr-0 md:pr-8 min-w-0">
            {/* 하단 로고 */}
            <img
              src={logo?.src || "/fallback.png"}
              alt="글로벌케이팝진흥원"
              className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 lg:w-28 lg:h-16 flex-shrink-0"
              style={{ objectFit: "contain" }}
              loading="lazy"
              draggable={false}
            />
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <b className="text-sm sm:text-base md:text-lg lg:text-xl block mb-1 sm:mb-2 md:mb-4 break-words">
                <AutoT text="글로벌케이팝진흥원" />
              </b>
              <div
                className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-x-2 md:gap-x-4 gap-y-1 text-xs sm:text-sm"
                style={{ marginBottom: 4 }}
              >
                <span className="flex items-start sm:items-center flex-wrap gap-x-2">
                  <b className="text-gray-800 flex-shrink-0">
                    <AutoT text="주소" />
                  </b>
                  {/* 구분선 */}
                  <span
                    aria-hidden
                    className="hidden sm:inline-block flex-shrink-0"
                    style={{
                      borderLeft: "1px solid #bdbdbd",
                      height: 16,
                      marginLeft: 8,
                      marginRight: 8,
                      alignSelf: "center",
                    }}
                  ></span>
                  <span className="break-words min-w-0">
                    <AutoT text="서울특별시 강남구 압구정로 32길 11 (신사동) 6층" />
                  </span>
                </span>
                <span className="flex-shrink-0">
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    <AutoT text="대표" />
                  </b>{" "}
                  천범주
                </span>
                <span className="break-all sm:break-normal">
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    <AutoT text="이메일" />
                  </b>{" "}
                  global@gw.global.ac.kr
                </span>
              </div>
            </div>
          </div>
          {/* PC화면 시 중간에 구분선 */}
          <div
            aria-hidden
            className="hidden lg:block"
            style={{
              width: 1,
              background: "#bdbdbd",
              alignSelf: "stretch",
              margin: "0 28px",
              minHeight: 44,
            }}
          ></div>
          {/* 우측: 대표 연락처, 운영시간, 담당자 이메일 등 */}
          <div className="flex flex-col flex-1 min-w-0 sm:min-w-[180px] pl-0 md:pl-8 w-full md:w-auto">
            <b className="text-sm sm:text-base md:text-lg lg:text-xl inline-block my-1 sm:my-2 break-words">
              02) 2160-1171
            </b>
            <span className="text-xs sm:text-sm md:text-base inline-block my-1 break-words">
              <AutoT text="평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)" />
            </span>
            <span className="text-xs sm:text-sm md:text-base inline-block my-1 break-all sm:break-normal">
              <AutoT text="이메일" /> : mpp_op@squarenet.co.kr
            </span>
            <div
              className="text-xs text-gray-500 mt-2 break-words"
              style={{ marginTop: 12 }}
            >
              &copy; {new Date().getFullYear()} <AutoT text="글로벌케이팝진흥원. All rights reserved." />
            </div>
          </div>
        </div>
      </div>
      {/* 푸터의 구분선 등 반응형 스타일 */}
      <style jsx>{`
        .footer-bar-wrap {
          position: relative;
        }
        @media (max-width: 1024px) {
          .footer-bar-wrap > div > div[aria-hidden] {
            display: none !important;
          }
        }
      `}</style>
    </footer>
  );
});
