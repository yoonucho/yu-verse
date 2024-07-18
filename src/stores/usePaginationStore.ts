import { create } from "zustand";
import { PaginationState } from "@/types/BookInfo";

const usePaginationStore = create<PaginationState>(set => ({
	currentPage: 1,
	totalPage: 0,
	pageBlock: 10,
	setCurrentPage: (page: number) => set({ currentPage: page }),
	setTotalPage: (total: number) => set({ totalPage: total }),
	resetPagination: () => set({ currentPage: 1 }),
}));

export default usePaginationStore;
