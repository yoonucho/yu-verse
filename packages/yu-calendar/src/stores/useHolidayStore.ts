import { create } from 'zustand';
import { HolidayDates } from '@/types.d';

type HolidayState = {
	holidays: HolidayDates[];
	setHolidays: (holidays: HolidayDates[]) => void;
};

const useHolidayStore = create<HolidayState>(set => ({
	holidays: [],
	setHolidays: holidays => set({ holidays }),
}));

export default useHolidayStore;
