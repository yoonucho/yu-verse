import React, { useEffect } from "react";

import useFilterStore from "@/stores/useFilterStore";
import useBookStore from "@/stores/useBookStore";
import usePaginationStore from "@/stores/usePaginationStore";

import styles from "./filterButtonBox.module.css";

const relatedKeywords = ["소설", "경제경영", "자기계발", "과학", "역사"];
const priceSortOptions = [
	{ label: "가격 오름차순", value: "asc" },
	{ label: "가격 내림차순", value: "desc" },
];

const FilterButtonBox: React.FC = () => {
	const { query, selectedKeyword, setSelectedKeyword, setSortOption, fetchBooks } = useBookStore();
	const { clearFilters, filters, setFilter, applyFilters } = useFilterStore();
	const { resetSearch } = useBookStore();
	const { resetPagination, setCurrentPage } = usePaginationStore();

	useEffect(() => {
		const loadBooks = async () => {
			await fetchBooks();
		};
		loadBooks();
	}, [fetchBooks]);

	/* 초기화 버튼 클릭 시 */
	const handleClear = () => {
		clearFilters();
		resetSearch();
		resetPagination();
		fetchBooks();
	};

	const handleOptionClick = async (value: string) => {
		// query 또는 selectedKeyword가 없을때 경고창 띄우기
		if (!query && !selectedKeyword) {
			alert("검색어를 입력해주세요.");
			return;
		}

		setSortOption(value);
		setFilter("priceSortOrder", value);
		applyFilters();
		setCurrentPage(1);
		await fetchBooks();
	};

	const isOptionSelected = (value: string) => {
		return filters.priceSortOrder === value;
	};

	const handleKeywordClick = async (keyword: string) => {
		setSelectedKeyword(keyword);
		setCurrentPage(1);
		await fetchBooks();
	};

	return (
		<>
			<div className={styles.filterButtonBox}>
				<div className={styles.inner}>
					{/* 장르 버튼 */}
					<div className={styles.tagButtonBar}>
						{relatedKeywords.map(keyword => (
							<div key={keyword} className={styles.tagButtonContainer}>
								<button className={`${styles.tagButton} ${selectedKeyword === keyword ? styles.active : ""}`} onClick={() => handleKeywordClick(keyword)}>
									{keyword}
								</button>
							</div>
						))}
					</div>
					{/* 가격 정렬 버튼 */}
					<div className={styles.tagButtonBar}>
						{priceSortOptions.map(option => (
							<div key={option.value} className={styles.tagButtonContainer}>
								<button className={`${styles.btn} ${isOptionSelected(option.value) ? styles.active : ""}`} onClick={() => handleOptionClick(option.value)}>
									{option.label}
								</button>
							</div>
						))}
					</div>
					<button className={styles.btn} onClick={handleClear}>
						초기화
					</button>
				</div>
			</div>
		</>
	);
};

export default FilterButtonBox;
