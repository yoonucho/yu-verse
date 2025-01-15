import { create } from "zustand";

type HolidayState = {
	holidays: string[];
	setHolidays: (holidays: any[]) => void;
};

const useHolidayStore = create<HolidayState>(set => ({
	holidays: [],
	setHolidays: holidays => set({ holidays }),
}));

export default useHolidayStore;
