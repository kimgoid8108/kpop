"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Certificate, categories } from "../../lib/certificates";
import { AutoT } from "../AutoT";

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
      // 검색어 필터 (제목/발급기관)
      const matchesSearch =
        searchQuery === "" ||
        cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.issuingOrg.toLowerCase().includes(searchQuery.toLowerCase());

      // 카테고리 필터
      const matchesCategory = selectedCategory === "all" || cert.category === selectedCategory;

      // 등급 필터
      const matchesLevel =
        selectedLevel === "all" ||
        cert.levels.toLowerCase().includes(selectedLevel.toLowerCase());

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
      <div className="mb-6 space-y-4">
        {/* 검색바 */}
        <div className="w-full">
          <input
            type="text"
            placeholder="자격증명 또는 발급기관으로 검색..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
          />
        </div>

        {/* 필터 */}
        <div className="flex flex-wrap gap-3">
          {/* 카테고리 필터 */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base bg-white"
          >
            <option value="all">전체 카테고리</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          {/* 등급 필터 */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base bg-white"
          >
            <option value="all">전체 등급</option>
            <option value="1급">1급</option>
            <option value="2급">2급</option>
          </select>
        </div>
      </div>

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
              href={`/certificates/${cert.id}`}
              className="block p-4 md:p-6 bg-white border border-gray-300 rounded-lg hover:shadow-lg transition-shadow"
            >
              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded mb-2">
                  {cert.category}
                </span>
                <h3 className="text-lg md:text-xl font-bold text-gray-900 mt-2 break-words">
                  {cert.name}
                </h3>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>
                  <span className="font-semibold">등급: </span>
                  <span className="break-words">{cert.levels}</span>
                </div>
                <div>
                  <span className="font-semibold">등록번호: </span>
                  <span className="break-words">{cert.registrationNumber}</span>
                </div>
                <div>
                  <span className="font-semibold">발급기관: </span>
                  <span className="break-words">{cert.issuingOrg}</span>
                </div>
              </div>
              <div className="mt-4 text-sm text-blue-600">
                <AutoT text="자세히 보기 →" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
