import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BookStore } from '@/types/BookInfo';
import { fetchBooksAction } from '@/actions/bookActions';

const useBookStore = create(
	persist<BookStore>(
		(set, get) => ({
			query: '', // 검색어,
			searchInput: '', // 실시간 입력값
			selectedKeyword: '', // 선택된 카테고리 키워드
			documents: [],
			meta: null,
			isLoading: false,
			isSorting: false,
			error: null,
			currentPage: 1, // 현재 페이지 상태
			sortOption: '', // 기본값은 빈 문자열 (정렬 옵션 없음)

			// 검색어 설정 ( Header에서 직접 사용)
			setQuery: (query: string) => set({ query }),
			// 검색어 입력값 설정
			setSearchInput: (input: string) => set({ searchInput: input }),
			setSelectedKeyword: (keyword: string) => set({ selectedKeyword: keyword }),
			// 페이지 변경 핸들러
			setCurrentPage: (page: number) => set({ currentPage: page }),
			// 정렬 옵션 설정
			setSortOption: (option: 'asc' | 'desc' | '') => {
				set({ sortOption: option });
				get().fetchBooks(); // 정렬 변경 시 데이터를 다시 불러옴
			},

			// 서버 액션을 사용하여 책 검색 실행
			fetchBooks: async () => {
				const { query, selectedKeyword, currentPage, sortOption } = get();
				const searchQuery = query || selectedKeyword; // 검색어가 없으면 선택된 카테고리를 검색어로 사용

				if (!searchQuery) return;

				// 정렬 버튼을 눌렀을 때만 isSorting
				const isSortingRequest = Boolean(sortOption);

				try {
					set({ isLoading: !isSortingRequest, isSorting: isSortingRequest, error: null });
					const validSortOption = sortOption === '' ? undefined : (sortOption as 'asc' | 'desc' | undefined);
					const data = await fetchBooksAction(searchQuery, currentPage, 10, validSortOption);

					if (!data || 'documents' in data === false) {
						console.error('❌ 데이터가 존재하지 않음:', data);
						return;
					}
					set({ documents: data.documents, meta: data.meta, isLoading: false });
				} catch (error) {
					if (error instanceof Error) {
						set({ error: error.message });
					} else {
						set({ error: String(error) });
					}
					console.error(error);
				} finally {
					set({ isLoading: false, isSorting: false });
				}
			},

			// 초기화 버튼을 눌렀을 때 `sessionStorage`에서도 삭제되도록 설정
			resetSearch: () => {
				set({ query: '', searchInput: '', selectedKeyword: '', documents: [], meta: null, currentPage: 1, sortOption: '' });

				// sessionStorage에서 데이터 삭제 (완전 초기화)
				if (typeof window !== 'undefined') {
					sessionStorage.removeItem('book-store');
				}
			},
		}),
		{
			name: 'book-store', // 저장될 키 이름
			storage: {
				getItem: (name: string) => {
					if (typeof window === 'undefined') return null;
					const item = sessionStorage.getItem(name);
					return item ? JSON.parse(item) : null; // JSON 파싱
				},
				setItem: (name: string, value) => {
					if (typeof window !== 'undefined') {
						sessionStorage.setItem(name, JSON.stringify(value));
					}
				},
				// JSON 문자열로 변환
				removeItem: (name: string) => {
					if (typeof window !== 'undefined') {
						sessionStorage.removeItem(name);
					}
				},
			}, // sessionStorage  사용 -> 페이지 새로고침 시 초기화 , 페이지 이동 시 데이터 유지
		}
	)
);

// 새로고침 시 sessionStorage에서 데이터가 남아 있으면 자동으로 resetSearch() 실행
if (typeof window !== 'undefined' && sessionStorage.getItem('book-store')) {
	useBookStore.getState().resetSearch();
}

export default useBookStore;
