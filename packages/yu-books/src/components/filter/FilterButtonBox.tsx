"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import styles from "./filterButtonBox.module.css";
import { shouldAllowSort } from "@/utils/search";

const relatedKeywords = ["소설", "경제경영", "자기계발", "과학", "역사"];
const priceSortOptions: { label: string; value: "asc" | "desc" }[] = [
  { label: "가격 오름차순", value: "asc" },
  { label: "가격 내림차순", value: "desc" },
];

type FilterButtonBoxProps = {
  onReset: () => void;
  onKeywordClick: (keyword: string) => void;
};

export default function FilterButtonBox({
  onReset,
  onKeywordClick,
}: FilterButtonBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const inputQuery = searchParams.get("query") || "";
  const selectedKeyword = searchParams.get("keyword");
  const sortOption = searchParams.get("sort");

  const handleSortClick = (value: "asc" | "desc") => {
    const params = new URLSearchParams(searchParams.toString());

    // 검색 조건이 전혀 없으면 정렬을 막습니다. (입력어 또는 카테고리 중 하나 필요)
    if (!shouldAllowSort(inputQuery, selectedKeyword)) {
      alert("검색어를 먼저 입력하거나 카테고리를 선택해주세요.");
      return;
    }

    const newSortOption = sortOption === value ? null : value;

    if (newSortOption) {
      params.set("sort", newSortOption);
    } else {
      params.delete("sort");
    }
    params.delete("page"); // Reset page on sort change
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleKeywordClick = (keyword: string) => {
    onKeywordClick(keyword);
  };

  const handleClear = () => {
    onReset();
  };

  return (
    <>
      <div className={styles.filterButtonBox}>
        <div className={`${styles.inner} scrollbar`}>
          {/* 장르 버튼 */}
          <div className={styles.tagButtonBar}>
            {relatedKeywords.map((keyword) => (
              <div key={keyword} className={styles.tagButtonContainer}>
                <button
                  className={`${styles.tagButton} ${
                    selectedKeyword === keyword ? styles.active : ""
                  }`}
                  onClick={() => handleKeywordClick(keyword)}
                >
                  {keyword}
                </button>
              </div>
            ))}
          </div>
          {/* 가격 정렬 버튼 */}
          <div className={styles.tagButtonBar}>
            {priceSortOptions.map((option) => (
              <div key={option.value} className={styles.tagButtonContainer}>
                <button
                  className={`${styles.btn} ${
                    sortOption === option.value ? styles.active : ""
                  }`}
                  onClick={() => handleSortClick(option.value)}
                >
                  {option.label}
                </button>
              </div>
            ))}
          </div>
          {/* 초기화 버튼 */}
          <button className={styles.btn} onClick={handleClear}>
            초기화
          </button>
        </div>
      </div>
    </>
  );
}
