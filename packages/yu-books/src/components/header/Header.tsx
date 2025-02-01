import React, { useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';

import useBookStore from '@/stores/useBookStore';

import FilterButtonBox from '../filter/FilterButtonBox';
import SearchInput from '../filter/SearchInput';
import Logo from '../logo/Logo';

type HeaderProps = {
	headerText: string;
};

const Header: React.FC<HeaderProps> = ({ headerText }) => {
	const { searchInput, setSearchInput, setSelectedKeyword, setSortOption, setQuery, resetSearch } = useBookStore();

	// 1초 후 실행될 검색 함수 (lodash `debounce` 활용)
	const debouncedSearch = useMemo(
		() =>
			debounce((inputValue: string) => {
				if (inputValue.length === 1) {
					alert('검색어를 2글자 이상 입력해주세요.');
					return;
				}

				if (inputValue.length >= 2) {
					setQuery(inputValue);
					setSelectedKeyword(''); // 기존 카테고리 선택 초기화
					setSortOption(''); // 기존 정렬 옵션 초기화
				}
			}, 1000),
		[setQuery, setSelectedKeyword, setSortOption]
	);
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchInput(e.target.value);
		debouncedSearch(e.target.value);
	};

	// 검색어가 완전히 지워지면 초기화 실행
	useEffect(() => {
		if (searchInput.trim() === '') {
			resetSearch();
		}
	}, [searchInput, resetSearch]);

	// 검색 초기화 (초기화 버튼 클릭시 호출됨)
	const handleResetSearch = () => {
		resetSearch(); // 검색 상태 초기화
	}

	return (
		<header className="header">
			<div className="title">
				<Logo />
				<h2>{headerText}</h2>
			</div>
			<FilterButtonBox onReset={handleResetSearch} />
			{/* 검색어 입력창 */}
			<SearchInput value={searchInput} onChange={handleInputChange} onReset={handleResetSearch} />
		</header>
	);
};

export default Header;
