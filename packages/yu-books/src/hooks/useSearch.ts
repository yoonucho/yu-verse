import { useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';
import useBookStore from '@/stores/useBookStore';

const useSearch = () => {
	const { searchInput, setSearchInput, setQuery, setSelectedKeyword, setSortOption, resetSearch } = useBookStore();

	// 1초 후 실행될 검색 함수 (검색어 검증 포함)
	const debouncedSearch = useMemo(
		() =>
			debounce((inputValue: string) => {
				if (inputValue.length === 1) {
					alert('검색어를 2글자 이상 입력해주세요.');
					return;
				}

				if (inputValue.length >= 2) {
					setQuery(inputValue);
					setSelectedKeyword(''); // 🔹 기존 카테고리 선택 초기화
					setSortOption(''); // 🔹 기존 정렬 옵션 초기화
				}
			}, 1000),
		[setQuery, setSelectedKeyword, setSortOption]
	);

	// 입력 값 변경 핸들러 (Zustand의 setSearchInput 사용)
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		setSearchInput(value);
		debouncedSearch(value); // 🔹 `debounce`된 검색 실행
	};

	// 검색어가 완전히 지워지면 초기화 실행
	useEffect(() => {
		if (searchInput.trim() === '') {
			resetSearch();
		}
	}, [searchInput, resetSearch]);

	// 검색 초기화 (초기화 버튼 클릭 시 호출됨)
	const handleResetSearch = () => {
		resetSearch(); // 🔹 Zustand의 검색 상태 초기화
	};

	return {
		searchInput,
		handleInputChange,
		handleResetSearch,
	};
};

export default useSearch;
