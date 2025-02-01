import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FilterStore, FilterState } from '@/types/BookInfo';

const useFilterStore = create(
	persist<FilterStore>(
		set => ({
			filters: {
				relatedKeywords: [],
				priceSortOrder: undefined,
				bookTypeTags: [],
				title: '',
				author: '',
				publisher: '',
				isbn: '',
			},
			appliedFilters: {
				relatedKeywords: [],
				priceSortOrder: undefined,
				bookTypeTags: [],
				title: '',
				author: '',
				publisher: '',
				isbn: '',
			},
			filterType: null,
			isFiltered: false, // ✅ 초기값 명확히 설정
			selectedOptions: [],

			// 필터 설정 함수
			setFilter: (type: keyof FilterState['filters'], value: string | 'asc' | 'desc' | string[] | undefined) =>
				set(state => ({
					filters: { ...state.filters, [type]: value },
				})),

			// 필터 초기화 함수 (sessionStorage에서도 삭제)
			clearFilters: () => {
				set({
					filters: {
						relatedKeywords: [],
						priceSortOrder: undefined,
						bookTypeTags: [],
						title: '',
						author: '',
						publisher: '',
						isbn: '',
					},
					appliedFilters: {
						relatedKeywords: [],
						priceSortOrder: undefined,
						bookTypeTags: [],
						title: '',
						author: '',
						publisher: '',
						isbn: '',
					},
					selectedOptions: [],
					isFiltered: false, // ✅ 필터 해제
				});

				// sessionStorage에서 데이터 삭제 (완전 초기화)
				if (typeof window !== 'undefined') {
					sessionStorage.removeItem('filter-store');
				}
			},

			// 필터 적용 함수 (현재 설정된 필터를 적용)
			applyFilters: () =>
				set(state => ({
					appliedFilters: { ...state.filters },
					isFiltered: true,
				})),

			// 옵션 선택/해제 함수
			toggleOption: option =>
				set(state => {
					const selectedOptions = state.selectedOptions.includes(option) ? state.selectedOptions.filter(opt => opt !== option) : [...state.selectedOptions, option];

					return { selectedOptions };
				}),

			// 필터 활성화 여부 설정 함수
			setFiltered: (isFiltered: boolean) => set({ isFiltered }),
		}),
		{
			name: 'filter-store', // sessionStorage에 저장될 키 이름
			storage: {
				getItem: name => {
					if (typeof window === 'undefined') return null;
					const item = sessionStorage.getItem(name);
					return item ? JSON.parse(item) : null; // JSON.parse로 변환
				},
				setItem: (name, value) => {
					if (typeof window !== 'undefined') {
						sessionStorage.setItem(name, JSON.stringify(value)); // ✅ JSON.stringify로 변환
					}
				},
				removeItem: name => {
					if (typeof window !== 'undefined') {
						sessionStorage.removeItem(name);
					}
				},
			}, // sessionStorage 사용 → 새로고침 시 초기화, 페이지 이동 시 유지
		}
	)
);

export default useFilterStore;
