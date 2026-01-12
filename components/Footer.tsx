"use client";

import React, { memo } from "react";
import logo from "../src/GKI.png";
import { useLanguage } from "./LanguageContext";

// ----- Footer 컴포넌트 -----
// 페이지 하단의 연락처, 주소, 사업자 정보 등 표시
export const Footer = memo(function Footer() {
  const { t } = useLanguage();

  return (
    <footer
      className="bg-gray-300 border-t border-gray-200 text-gray-700 leading-tight text-sm w-full"
      style={{
        position: "static",
        left: "unset",
        right: "unset",
        marginLeft: "unset",
        marginRight: "unset",
        maxWidth: "100%",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-10 py-4 md:py-7 flex flex-wrap gap-4 md:gap-6 lg:gap-10 justify-between items-center footer-bar-wrap">
        <div className="flex flex-col md:flex-row items-start md:items-center w-full gap-4 md:gap-0">
          <div className="flex flex-1 items-start md:items-center gap-2 leading-tight pr-0 md:pr-8">
            {/* 하단 로고 */}
            <img
              src={logo?.src || "/fallback.png"}
              alt={t("footer.organization")}
              className="w-20 h-12 md:w-24 md:h-14 lg:w-28 lg:h-16"
              style={{ objectFit: "contain" }}
              loading="lazy"
              draggable={false}
            />
            <div className="flex flex-col gap-1">
              <b className="text-base md:text-lg lg:text-xl block mb-2 md:mb-4">
                {t("footer.organization")}
              </b>
              <div
                className="flex flex-col md:flex-row md:flex-wrap items-start md:items-center gap-x-2 md:gap-x-4 gap-y-1"
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
                    {t("footer.address")}
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
                    {t("footer.addressValue")}
                  </span>
                </span>
                <span>
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    {t("footer.representative")}
                  </b>{" "}
                  천범주
                </span>
                <span>
                  <b className="text-gray-800" style={{ marginRight: 2 }}>
                    {t("footer.email")}
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
          <div className="flex flex-col flex-1 min-w-[180px] pl-0 md:pl-8 w-full md:w-auto">
            <b className="text-base md:text-lg lg:text-xl inline-block my-2 md:my-2">
              {t("footer.phone")}
            </b>
            <span className="text-sm md:text-base inline-block my-1 md:my-1">
              {t("footer.hours")}
            </span>
            <span className="text-sm md:text-base inline-block my-1 md:my-1">
              {t("footer.email")} : mpp_op@squarenet.co.kr
            </span>
            <div
              className="text-xs text-gray-500 mt-2"
              style={{ marginTop: 12 }}
            >
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
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
