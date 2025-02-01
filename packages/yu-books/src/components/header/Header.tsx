import React, { useEffect, useState } from 'react';

import useDebounce from '../../hooks/useDebounce';

import useBookStore from '@/stores/useBookStore';

import FilterButtonBox from '../filter/FilterButtonBox';
import SearchInput from '../filter/SearchInput';
import Logo from '../logo/Logo';

type HeaderProps = {
	headerText: string;
};

const Header: React.FC<HeaderProps> = ({ headerText }) => {
	const { query, setSelectedKeyword, setSortOption, setQuery, resetSearch } = useBookStore();
	const [isSearchTriggered, setIsSearchTriggered] = useState(false);

	const debouncedOnChange = useDebounce(() => {
		if (query.trim() === '') {
			resetSearch(); // 검색어가 없으면 초기화 화면으로 돌아가기
		} else {
			setQuery(query);
			setIsSearchTriggered(true);
		}
	}, 500);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
		setSelectedKeyword(''); // 검색 시 카테고리 초기화
		setSortOption(''); // 검색 시 정렬 초기화

		// ✅ 검색어가 비어 있으면 데이터만 초기화 (새로고침 없음)
		if (e.target.value.trim() === '') {
			resetSearch();
		}
	};

	useEffect(() => {
		debouncedOnChange();
	}, [query, debouncedOnChange]);

	return (
		<header className="header">
			<div className="title">
				<Logo />
				<h2>{headerText}</h2>
			</div>
			<FilterButtonBox />
			{/* 검색어 입력창 */}
			<SearchInput value={query} onChange={handleInputChange} />
		</header>
	);
};

export default Header;
