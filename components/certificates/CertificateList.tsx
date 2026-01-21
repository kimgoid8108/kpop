"use client";

import React, { useState, useMemo } from "react";
import { Certificate } from "../../lib/certificates";
import { AutoT } from "../AutoT";
import { CertificateCard } from "./CertificateCard";
import { CertificateFilters } from "./CertificateFilters";

interface CertificateListProps {
  certificates: Certificate[];
}

/**
 * 자격증 리스트 컴포넌트
 * 검색 및 필터 기능 포함
 */
export function CertificateList({ certificates }: CertificateListProps) {
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
          <AutoT text="종류 안내" />
        </h1>
        <p className="text-gray-600 text-sm md:text-base">
          <AutoT text="글로벌케이팝진흥원에서 발급하는 자격증 목록입니다." />
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
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      )}
    </div>
  );
}
