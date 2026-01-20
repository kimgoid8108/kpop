"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { PageLayout } from "../../../../components/PageLayout";
import { AutoT } from "../../../../components/AutoT";
import { dummyActivities } from "../../../../lib/activities";

export default function ActivityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  // 해당 ID의 활동 찾기
  const activity = dummyActivities.find((a) => a.id === id);

  // 날짜 포맷팅
  const formatDate = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 활동이 없을 경우
  if (!activity) {
    return (
      <PageLayout>
        <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
          <div className="bg-white rounded-xl shadow p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              <AutoT text="활동을 찾을 수 없습니다" />
            </h1>
            <p className="text-gray-600 mb-6">
              <AutoT text="요청하신 활동 정보가 존재하지 않습니다." />
            </p>
            <Link
              href="/intro/activities"
              className="inline-block px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              <AutoT text="목록으로 돌아가기" />
            </Link>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto my-8 md:my-16 px-4">
        {/* 페이지 상단 */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            <AutoT text="활동현황 상세" />
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow p-4 md:p-6 lg:p-8">
          {/* 제목 섹션 */}
          <div className="border-b border-gray-200 pb-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
              {activity.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>
                <AutoT text="작성일" />: {formatDate(activity.createdAt)}
              </span>
              <span>
                <AutoT text="조회수" />: {activity.views}
              </span>
              {activity.hasAttachment && (
                <span className="flex items-center gap-1">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                  <AutoT text="첨부파일 있음" />
                </span>
              )}
            </div>
          </div>

          {/* 내용 섹션 */}
          <div className="prose max-w-none mb-8">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {activity.content || (
                <AutoT text="글로벌케이팝진흥원에서 진행된 활동 내용입니다." />
              )}
            </div>
          </div>

          {/* 이미지 섹션 */}
          {activity.images && activity.images.length > 0 && (
            <div className="border-t border-gray-200 pt-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <AutoT text="활동 사진" />
              </h3>
              <div className="flex flex-col gap-4">
                {activity.images.map((image, index) => {
                  // 한글 파일명 처리: 전체 경로를 인코딩
                  const imageSrc = image.startsWith('/')
                    ? encodeURI(image)
                    : encodeURI(image);

                  return (
                    <div
                      key={`${activity.id}-${index}-${image}`}
                      className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300"
                      onClick={() => {
                        // 이미지 클릭 시 새 탭에서 열기
                        window.open(imageSrc, "_blank");
                      }}
                    >
                      <img
                        src={imageSrc}
                        alt={`${activity.title} - 이미지 ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // 인코딩된 경로가 실패하면 원본 경로 시도
                          const target = e.target as HTMLImageElement;
                          if (!target.src.includes(image)) {
                            target.src = image;
                          }
                        }}
                        onLoad={() => {
                          // 이미지 로드 성공 시 콘솔 로그 (디버깅용)
                          console.log('Image loaded:', imageSrc);
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 첨부파일 섹션 (있을 경우) */}
          {activity.hasAttachment && (
            <div className="border-t border-gray-200 pt-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <AutoT text="첨부파일" />
              </h3>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md border border-gray-200">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                  />
                </svg>
                <span className="text-sm text-gray-700">
                  첨부파일_활동현황_{activity.id}.pdf
                </span>
                <button
                  className="ml-auto px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
                  onClick={() => {
                    // 파일 다운로드 로직 (실제 구현 시)
                    alert("파일 다운로드 기능은 구현 예정입니다.");
                  }}
                >
                  <AutoT text="다운로드" />
                </button>
              </div>
            </div>
          )}

          {/* 버튼 섹션 */}
          <div className="flex justify-center gap-3 pt-6 border-t border-gray-200">
            <Link
              href="/intro/activities"
              className="px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors text-sm font-medium"
            >
              <AutoT text="목록으로" />
            </Link>
            <button
              onClick={() => router.back()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium"
            >
              <AutoT text="이전으로" />
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
