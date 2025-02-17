import { useEffect, useMemo, useState } from "react";
import debounce from "lodash/debounce";
import useBookStore from "@/stores/useBookStore";

const useSearch = () => {
  const {
    searchInput,
    setSearchInput,
    setQuery,
    setSelectedKeyword,
    setIsSearchTriggered,
    setSortOption,
    resetSearch,
  } = useBookStore();

  const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null); // 디바운스 중인지 추적
  const [isTyping, setIsTyping] = useState(false); // 입력중 여부 플래그

  // 1초 후 실행될 검색 함수 (검색어 검증 포함)
  const debouncedSearch = useMemo(
    () =>
      debounce((inputValue: string) => {
        if (inputValue.length >= 2) {
          setQuery(inputValue);
          setSelectedKeyword(""); // 기존 카테고리 선택 초기화
          setSortOption(""); // 정렬 옵션 초기화
          setIsSearchTriggered(true);
        }
        setIsTyping(false); // 입력 완료 시 입력 중 상태 해제
      }, 1000),
    [setQuery, setSelectedKeyword, setSortOption, setIsSearchTriggered]
  );

  // 입력 값 변경 핸들러 (Zustand의 setSearchInput 사용)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 입력된 값 저장
    setSearchInput(value);
    setIsTyping(true); // 입력 시작 시 기존 데이터 유지

    // 기존 타이머가 있으면 초기화
    if (alertTimer) {
      clearTimeout(alertTimer);
    }

    // 검색어를 2글자 이상 입력하면 디바운스 시작
    if (value.length >= 2) {
      debouncedSearch(value);
    }

    // 1초 후에도 2글자 미만이면 alert 표시
    const newTimer = setTimeout(() => {
      if (value.length > 0 && value.length < 2) {
        alert("검색어를 2글자 이상 입력해주세요.");
      }
    }, 1000);
    setAlertTimer(newTimer);

    // 검색어가 비어있으면 즉시 초기화
    if (value.trim() === "") {
      resetSearch(); // 상태 즉시 초기화
      setIsSearchTriggered(false); // 트리거 해제
      debouncedSearch.cancel();
      clearTimeout(newTimer);
      setIsTyping(false);
      return;
    }
    
    setSelectedKeyword(""); // 검색어 입력 시 카테고리 선택 초기화
    setSortOption(""); // 정렬 옵션 초기화
  };

  // 검색어가 완전히 지워지면 검색어와 정렬 옵션 초기화
  useEffect(() => {
    if (searchInput.trim() === "") {
      console.log("초기화?");
      setQuery("");
      setSortOption("");
      setIsSearchTriggered(false);
    }
  }, [searchInput, setQuery, setSortOption, setIsSearchTriggered]);

  // 검색 초기화 (초기화 버튼 클릭 시 호출됨)
  const handleResetSearch = () => {
    resetSearch(); // Zustand의 검색 상태 초기화
  };

  // 카테고리 선택 시 검색어와 정렬 옵션만 초기화
  const handleKeywordClick = (keyword: string) => {
    setSelectedKeyword(keyword); // 선택된 키워드 설정
    setSearchInput(""); // 검색어 초기화
    setQuery(""); // 검색어 초기화
    setSortOption(""); // 정렬 옵션 초기화
  };

  return {
    searchInput,
    handleInputChange,
    handleResetSearch,
    handleKeywordClick,
  };
};

export default useSearch;
