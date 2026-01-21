"use client";

import React from "react";
import { AutoT } from "../AutoT";

interface StepSectionProps {
  step: {
    title: string;
    type: "table" | "list" | "text";
    table?: { headers: string[]; rows: string[][] };
    list?: string[];
    text?: string;
  };
}

/**
 * STEP 섹션 컴포넌트
 * table, list, text 타입을 지원
 */
export function StepSection({ step }: StepSectionProps) {
  return (
    <section className="mb-6 md:mb-8">
      <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4 text-gray-900 flex items-center gap-2">
        <span className="text-blue-700">{step.title.split(".")[0]}.</span>
        <span>{step.title.split(".").slice(1).join(".").trim()}</span>
      </h3>

      {step.type === "table" && step.table && (
        <div className="w-full overflow-x-auto">
          <table
            className="w-full border border-gray-300 text-sm md:text-base bg-white"
            style={{ minWidth: "600px" }}
          >
            <thead>
              <tr className="bg-gray-50 text-gray-900 font-semibold">
                {step.table.headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-3 py-2 md:px-4 md:py-3 border-r last:border-r-0 border-gray-300 text-left"
                  >
                    <AutoT text={header} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {step.table.rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-gray-200 last:border-b-0">
                  {row.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className="px-3 py-2 md:px-4 md:py-3 border-r last:border-r-0 border-gray-300 text-gray-800 whitespace-pre-line break-words align-top"
                    >
                      <AutoT text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {step.type === "list" && step.list && (
        <ul className="list-disc list-inside space-y-2 text-gray-800 text-sm md:text-base pl-2">
          {step.list.map((item, idx) => (
            <li key={idx} className="break-words">
              <AutoT text={item} />
            </li>
          ))}
        </ul>
      )}

      {step.type === "text" && step.text && (
        <div className="text-gray-800 whitespace-pre-line break-words leading-relaxed text-sm md:text-base">
          <AutoT text={step.text} />
        </div>
      )}
    </section>
  );
}
