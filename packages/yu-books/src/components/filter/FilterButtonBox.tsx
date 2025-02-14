import React, { useEffect } from "react";

import useFilterStore from "@/stores/useFilterStore";
import useBookStore from "@/stores/useBookStore";
import { FilterButtonProps } from "@/types/BookInfo";

import styles from "./filterButtonBox.module.css";

const relatedKeywords = ["소설", "경제경영", "자기계발", "과학", "역사"];
const priceSortOptions: { label: string; value: "asc" | "desc" }[] = [
  { label: "가격 오름차순", value: "asc" },
  { label: "가격 내림차순", value: "desc" },
];

const FilterButtonBox: React.FC<FilterButtonProps> = ({ onReset }) => {
  const {
    query,
    fetchBooks,
    setQuery,
    selectedKeyword,
    sortOption,
    setSelectedKeyword,
    setCurrentPage,
    setSortOption,
    documents,
    setDocuments, // 추가: 클라이언트 정렬을 위해 문서 상태 변경
  } = useBookStore(); // useBookStore 사용
  const { clearFilters, filters, setFilter, applyFilters } = useFilterStore();

  useEffect(() => {
    if (sortOption) {
      fetchBooks();
    }
  }, [sortOption]);

  /* 초기화 버튼 클릭 시 */
  const handleClear = async () => {
    clearFilters();
    onReset();
    setCurrentPage(1);
    setSortOption(""); // 정렬 옵션 초기화
    await fetchBooks();
  };

  /* 가격 정렬 옵션 클릭 */
  const handleOptionClick = async (value: "asc" | "desc") => {
    if (!query && !selectedKeyword) {
      alert("검색어를 입력해주세요.");
      return;
    }

    // 현재 선택된 값과 동일한 값을 누르면 정렬 해제
    const newSortOption = sortOption === value ? "" : value;
    setSortOption(newSortOption as "asc" | "desc" | ""); // 빈 문자열 허용
    setFilter("priceSortOrder", value);
    applyFilters();
    setCurrentPage(1); // 페이지 초기화

    // **fetchBooks 호출하여 전체 데이터 가져오기**
    await fetchBooks();

    // **정렬 로직 실행**
    if (newSortOption && documents.length > 0) {
      const sortedDocuments = [...documents].sort((a, b) =>
        newSortOption === "asc"
          ? a.sale_price - b.sale_price
          : b.sale_price - a.sale_price
      );
      setDocuments(sortedDocuments); // 클라이언트에서 정렬된 데이터 반영
    }
  };

  /* 카테고리 키워드 클릭 */
  const handleKeywordClick = async (keyword: string) => {
    setSelectedKeyword(keyword);
    setQuery(""); // 검색어 초기화
    setSortOption(""); // 정렬 초기화
    setCurrentPage(1); // 페이지 초기화

    await new Promise((resolve) => setTimeout(resolve, 0));
    await fetchBooks(); // 최신 상태를 반영하여 책 검색
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
                  onClick={() =>
                    handleOptionClick(option.value as "asc" | "desc")
                  }
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
};

export default FilterButtonBox;
