import useSearch from "@/hooks/useSearch"; // 검색 훅

import FilterButtonBox from "../filter/FilterButtonBox";
import SearchInput from "../filter/SearchInput";
import Logo from "../logo/Logo";

type HeaderProps = {
  headerText: string;
};

const Header: React.FC<HeaderProps> = ({ headerText }) => {
  const {
    searchInput,
    handleInputChange,
    handleResetSearch,
    handleKeywordClick,
  } = useSearch();

  return (
    <header className="header">
      <div className="title">
        <Logo />
        <h2>{headerText}</h2>
      </div>
      <FilterButtonBox
        onReset={handleResetSearch}
        onKeywordClick={handleKeywordClick}
      />
      {/* 검색어 입력창 */}
      <SearchInput
        value={searchInput}
        onChange={handleInputChange}
        onReset={handleResetSearch}
      />
    </header>
  );
};

export default Header;
