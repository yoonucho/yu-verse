import { create } from "zustand";

import { BookStore, KeywordBookResponse } from "@/types/BookInfo";

import usePaginationStore from "./usePaginationStore";

const useBookStore = create<BookStore>((set, get) => ({
	query: "", // 검색어
	inputValue: "", // 입력값
	debouncedQuery: "",
	selectedKeyword: "", // 선택된 키워드
	documents: [],
	meta: null,
	sortOption: "" || null,
	filterType: null,
	setQuery: (query: string) => {
		const { selectedKeyword } = get();
		set({ query });
		if (selectedKeyword) {
			set({ selectedKeyword: selectedKeyword });
		}
		if (query) {
			set({ selectedKeyword: "" });
			get().fetchBooks();
		}
	},
	setInputValue: (value: string) => {
		set({ inputValue: value });
	},
	setSelectedKeyword: (keyword: string) => {
		set({ selectedKeyword: keyword, inputValue: "" });
		const { setCurrentPage } = usePaginationStore.getState();
		setCurrentPage(1); // 페이지를 1로 리셋
		if (!get().query) {
			get().fetchBooks();
		}
	},
	setDocuments: documents => set({ documents }),
	setMeta: meta => set({ meta }),
	setSortOption: option => {
		set({ sortOption: option });
		get().fetchBooks(); // 정렬 옵션 변경 시 데이터 요청
	},
	fetchBooks: async () => {
		const { selectedKeyword, query, sortOption } = get();
		const searchQuery = query || selectedKeyword; // 쿼리가 없으면 선택된 키워드로 검색
		const { currentPage, setTotalPage } = usePaginationStore.getState();

		if (!searchQuery) {
			set({ documents: [], meta: null });
			return;
		}

		if (searchQuery.length < 2) {
			set({ documents: [], meta: null });
			alert("검색어가 너무 짧습니다."); // 검색어 길이 알림
			return;
		}

		try {
			const response = await fetch(`/api/books?keyword=${searchQuery}&sortOption=${sortOption || ""}&page=${currentPage}&size=10`);
			const data: KeywordBookResponse = await response.json();
			const { documents, meta } = data;
			set({ documents, meta });
			setTotalPage(Math.ceil(meta.pageable_count / 10));
		} catch (error) {
			console.error(error);
		}
	},
	resetSearch: () => {
		set({ query: "", inputValue: "", documents: [], meta: null, selectedKeyword: "" });
	},
}));

export default useBookStore;
