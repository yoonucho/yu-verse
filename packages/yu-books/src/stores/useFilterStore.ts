import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FilterState, FilterStore } from "@/types/BookInfo";

const useFilterStore = create(
	persist<FilterStore>(
		set => ({
			filters: {
				relatedKeywords: [],
				priceSortOrder: undefined,
				bookTypeTags: [],
				title: "",
				author: "",
				publisher: "",
				isbn: "",
			},
			appliedFilters: {
				relatedKeywords: [],
				priceSortOrder: undefined,
				bookTypeTags: [],
				title: "",
				author: "",
				publisher: "",
				isbn: "",
			},
			isFiltered: false,
			filterType: null,
			selectedOptions: [],
			// 필터 설정 함수 : 필터를 추가하거나 제거
			setFilter: (type: keyof FilterState["filters"], value: string | "asc" | "desc" | string[] | undefined) =>
				set(state => {
					const newFilters = { ...state.filters };
					if (type === "priceSortOrder") {
						newFilters[type] = value as "asc" | "desc" | undefined;
					} else {
						newFilters[type] = value;
					}
					return { filters: newFilters };
				}),

			// 필터 초기화
			clearFilters: () =>
				set({
					filters: { relatedKeywords: [], priceSortOrder: undefined, bookTypeTags: [], title: "", author: "", publisher: "", isbn: "" },
					appliedFilters: { relatedKeywords: [], priceSortOrder: undefined, bookTypeTags: [], title: "", author: "", publisher: "", isbn: "" },
					selectedOptions: [],
				}),
	
			// 필터 적용 함수 : 현재 필터를 적용하고 모달을 닫음
			applyFilters: () => set(state => ({ appliedFilters: { ...state.filters } })),
			// 옵션 토글 함수 : 선택된 옵션을 토글
			toggleOption: option =>
				set(state => {
					const selectedOptions = state.selectedOptions.includes(option) ? state.selectedOptions.filter(opt => opt !== option) : [...state.selectedOptions, option];
					return { selectedOptions };
				}),
			// 필터 적용 여부 설정 함수
			setFiltered: (isFiltered: boolean) => set({ isFiltered }),
		}),
		{
			name: "filter-storage", // 로컬 스토리지에 저장될 키 이름
			getStorage: () => localStorage, // 기본적으로 로컬 스토리지 사용
		}
	)
);

export default useFilterStore;
