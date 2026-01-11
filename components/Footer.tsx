"use client";

import React, { memo } from "react";
import logo from "../src/GKI.png";

// ----- Footer 컴포넌트 -----
// 페이지 하단의 연락처, 주소, 사업자 정보 등 표시
export const Footer = memo(function Footer() {
  return (
    <footer
      className="bg-gray-300 border-t border-gray-200 text-gray-700 leading-tight text-sm"
      style={{
        width: "100vw",
        position: "static",
        left: "unset",
        right: "unset",
        marginLeft: "unset",
        marginRight: "unset",
        maxWidth: "100vw",
      }}
    >
      <div className="container mx-auto px-10 py-7 flex flex-wrap gap-10 justify-between items-center footer-bar-wrap">
        <div className="flex items-center w-full gap-0">
          <div className="flex flex-1 items-center gap-2 leading-tight pr-8">
            {/* 하단 로고 */}
            <img
              src={logo?.src || "/fallback.png"}
              alt="로고"
              style={{ width: 110, height: 60, objectFit: "contain" }}
              loading="lazy"
              draggable={false}
            />
            <div className="flex flex-col gap-1">
              <b style={{ fontSize: 20, display: "block", marginBottom: 8 }}>
                글로벌케이팝진흥원
              </b>
              <div
                className="flex flex-wrap items-center gap-x-4 gap-y-1"
                style={{ marginBottom: 4 }}
              >
                <span className="flex items-center">
                  <b
                    className="text-gray-800"
                    style={{
                      marginRight: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    주소
                  </b>
                  {/* 구분선 */}
                  <span
                    aria-hidden
                    className="inline-block"
                    style={{
                      borderLeft: "1px solid #bdbdbd",
                      height: 20,
                      marginLeft: 14,
                      marginRight: 14,
                      alignSelf: "center",
                    }}
                  ></span>
                  <span style={{ display: "flex", alignItems: "center" }}>
                    서울특별시 강남구 압구정로 32길 11 (신사동) 6층
                  </span>
                </span>
                <span>
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    대표
                  </b>{" "}
                  천범주
                </span>
                <span>
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    이메일
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
          <div className="flex flex-col flex-1 min-w-[180px] pl-8">
            <b
              style={{ fontSize: 20, display: "inline-block", margin: "8px 0" }}
            >
              02) 2160-1171
            </b>
            <span style={{ display: "inline-block", margin: "5px 0" }}>
              평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)
            </span>
            <span style={{ display: "inline-block", margin: "5px 0" }}>
              이메일 : mpp_op@squarenet.co.kr
            </span>
            <div
              className="text-xs text-gray-500 mt-2"
              style={{ marginTop: 12 }}
            >
              &copy; {new Date().getFullYear()} 글로벌케이팝진흥원. All rights
              reserved.
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

