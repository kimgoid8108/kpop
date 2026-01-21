"use client";

import React from "react";
import { AutoT } from "../AutoT";

interface InfoTableProps {
  title: string;
  data: Array<[string, string]>; // [라벨, 값]
}

/**
 * 자격정보, 기관정보 등을 표시하는 재사용 가능한 표 컴포넌트
 * 반응형: 모바일에서도 겹치지 않도록 처리
 */
export function InfoTable({ title, data }: InfoTableProps) {
  return (
    <section className="mb-6 md:mb-8">
      <h2 className="text-lg md:text-xl font-bold mb-4 pb-2 border-b-2 border-gray-300 text-gray-900">
        <AutoT text={title} />
      </h2>
      <div className="w-full overflow-x-auto">
        <table className="w-full border border-gray-300 text-sm md:text-base bg-white" style={{ minWidth: "400px" }}>
          <tbody>
            {data.map(([label, value], index) => (
              <tr key={index} className="border-b border-gray-200 last:border-b-0">
                <th className="px-3 py-2 md:px-4 md:py-3 bg-gray-50 border-r border-gray-300 text-left font-semibold text-gray-900 align-top w-[120px] md:w-[140px]">
                  <AutoT text={label} />
                </th>
                <td className="px-3 py-2 md:px-4 md:py-3 text-gray-800 break-words align-top">
                  <AutoT text={value} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
