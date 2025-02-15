import { create } from "zustand";
import { persist } from "zustand/middleware";

import { BookStore } from "@/types/BookInfo";
import { fetchBooksAction } from "@/actions/bookActions";

const useBookStore = create(
  persist<BookStore>(
    (set, get) => ({
      query: "", // 검색어,
      searchInput: "", // 실시간 입력값
      selectedKeyword: "", // 선택된 카테고리 키워드
      documents: [],
      meta: null,
      isLoading: false,
      isSorting: false,
      error: null,
      currentPage: 1, // 현재 페이지 상태
      sortOption: "", // 기본값은 빈 문자열 (정렬 옵션 없음)

      // 검색어 설정 ( Header에서 직접 사용)
      setQuery: (query: string) => set({ query }),
      // 검색어 입력값 설정
      setSearchInput: (input: string) => set({ searchInput: input }),
      setSelectedKeyword: (keyword: string) =>
        set({ selectedKeyword: keyword }),
      // 페이지 변경 핸들러
      setCurrentPage: (page: number) => set({ currentPage: page }),
      // 클라이언트 정렬을 위한 데이터 업데이트 함수 추가
      setDocuments: (documents) => set({ documents }),
      // 정렬 옵션 설정 (클라이언트에서 정렬 수행)
      // 서버 액션을 사용하여 책 검색 실행
      fetchBooks: async () => {
        const { query, selectedKeyword, currentPage, sortOption } = get();
        const searchQuery = query || selectedKeyword; // 검색어가 없으면 선택된 카테고리를 검색어로 사용

        if (!searchQuery) return;

        try {
          set({ isLoading: true, error: null });
          // 정렬이 필요한 경우 전체 데이터 요청, 아닌 경우 한 페이지 데이터만 요청
          const fetchAll = !!sortOption;
          const data = await fetchBooksAction(
            searchQuery,
            currentPage,
            10,
            fetchAll,
            sortOption
          );

          if (!data || typeof data !== "object" || !("documents" in data)) {
            console.error("❌ 데이터가 존재하지 않음:", data);
            return;
          }

          // **상태 업데이트**
          set({ documents: data.documents, meta: data.meta });
        } catch (error) {
          if (error instanceof Error) {
            set({ error: error.message });
          } else {
            set({ error: String(error) });
          }
          console.error(error);
        } finally {
          set({ isLoading: false });
        }
      },

      setSortOption: (option: "" | "asc" | "desc") => {
        set({ sortOption: option });
        // **fetchBooks 호출하여 전체 데이터 가져오기 및 정렬 수행**
        get().fetchBooks();
      },

      // 초기화 버튼을 눌렀을 때 `sessionStorage`에서도 삭제되도록 설정
      resetSearch: () => {
        set({
          query: "",
          searchInput: "",
          selectedKeyword: "",
          documents: [],
          meta: null,
          currentPage: 1,
          sortOption: "", // 정렬 옵션 초기화
        });

        // sessionStorage에서 데이터 삭제 (완전 초기화)
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("book-store");
        }
      },
    }),
    {
      name: "book-store", // 저장될 키 이름
      storage: {
        getItem: (name: string) => {
          if (typeof window === "undefined") return null;
          const item = sessionStorage.getItem(name);
          return item ? JSON.parse(item) : null; // JSON 파싱
        },
        setItem: (name: string, value) => {
          if (typeof window !== "undefined") {
            // sortOption을 초기화하여 저장하지 않음
            value.state.sortOption = "";
            sessionStorage.setItem(name, JSON.stringify(value));
          }
        },
        // JSON 문자열로 변환
        removeItem: (name: string) => {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem(name);
          }
        },
      }, // sessionStorage  사용 -> 페이지 새로고침 시 초기화 , 페이지 이동 시 데이터 유지
    }
  )
);

export default useBookStore;
