import { create } from "zustand";

interface DateState {
	startDate: Date | null;
	endDate: Date | null;
	setStartDate: (date: Date) => void;
	setEndDate: (date: Date) => void;
}

const useSetDateStore = create<DateState>(set => ({
	startDate: null,
	endDate: null,
	setStartDate: (date: Date) => set({ startDate: date }),
	setEndDate: (date: Date) => set({ endDate: date }),
}));

export default useSetDateStore;
