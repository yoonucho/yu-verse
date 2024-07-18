import React, { useEffect, useState } from "react";

import useDebounce from "../../hooks/useDebounce";

import useBookStore from "@/stores/useBookStore";

import FilterButtonBox from "../filter/FilterButtonBox";
import SearchInput from "../filter/SearchInput";
import Logo from "../logo/Logo";

type HeaderProps = {
	headerText: string;
};

const Header: React.FC<HeaderProps> = ({ headerText }) => {
	const { setQuery, inputValue, setInputValue } = useBookStore();
	const [isSearchTriggered, setIsSearchTriggered] = useState(false);

	const debouncedOnChange = useDebounce(() => {
		setQuery(inputValue);
		setIsSearchTriggered(true);
	}, 500);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	useEffect(() => {
		debouncedOnChange();
	}, [inputValue, debouncedOnChange]);

	return (
		<header className="header">
			<div className="title">
				<Logo />
				<h2>{headerText}</h2>
			</div>
			<FilterButtonBox />
			{/* 검색어 입력창 */}
			<SearchInput value={inputValue} onChange={handleInputChange} />
		</header>
	);
};

export default Header;
