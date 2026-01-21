"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Certificate, categories } from "../../lib/certificates";
import { AutoT } from "../AutoT";
import { CertificateFilters } from "./CertificateFilters";

interface CertificateRelatedListProps {
  certificates: Certificate[];
}

/**
 * 발급 조건 리스트 컴포넌트
 * 종류 안내와 동일한 구조
 */
export function CertificateRelatedList({ certificates }: CertificateRelatedListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  // 필터링된 자격증 목록
  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchesSearch =
        searchQuery === "" ||
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuingOrg.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory;
      const matchesLevel =
        selectedLevel === "all" || cert.levels.toLowerCase().includes(selectedLevel.toLowerCase());
      return matchesSearch && matchesCategory && matchesLevel;
    });
  }, [certificates, searchQuery, selectedCategory, selectedLevel]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8">
      {/* 헤더 */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900">
          <AutoT text="발급 조건" />
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          <AutoT text="자격증별 발급 조건 및 검정 기준을 확인하실 수 있습니다." />
        </p>
      </div>

      {/* 검색 및 필터 */}
      <CertificateFilters
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedLevel={selectedLevel}
        onSearchChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onLevelChange={setSelectedLevel}
      />

      {/* 결과 개수 */}
      <div className="mb-4 text-sm text-gray-600">
        <AutoT text={`총 ${filteredCertificates.length}개의 자격증이 있습니다.`} />
      </div>

      {/* 자격증 목록 */}
      {filteredCertificates.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          <AutoT text="검색 결과가 없습니다." />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {filteredCertificates.map((cert) => (
            <Link
              key={cert.id}
              href={`/certificates/related/${cert.id}`}
              className="block p-4 md:p-6 bg-white border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-2">
                  <AutoT text={cert.category} />
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 break-words">
                  <AutoT text={cert.name} />
                </h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">
                    <AutoT text="등급" />:{" "}
                  </span>
                  <span className="break-words">
                    <AutoT text={cert.levels} />
                  </span>
                </div>
                <div>
                  <span className="font-semibold">
                    <AutoT text="등록번호" />:{" "}
                  </span>
                  <span className="break-words">
                    <AutoT text={cert.registrationNumber} />
                  </span>
                </div>
                <div>
                  <span className="font-semibold">
                    <AutoT text="발급기관" />:{" "}
                  </span>
                  <span className="break-words">
                    <AutoT text={cert.issuingOrg} />
                  </span>
                </div>
              </div>
              <div className="mt-4 text-sm text-blue-600">
                <AutoT text="발급 조건 보기 →" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
