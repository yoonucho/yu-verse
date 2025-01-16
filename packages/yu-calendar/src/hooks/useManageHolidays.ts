"use client";

import { useEffect } from 'react';
import useHolidayStore  from '@/stores/useHolidayStore';
import { HolidayDates } from '@/types.d';

const useManageHolidays = (holidays: HolidayDates[] | undefined) => {
	const setHolidays = useHolidayStore(state => state.setHolidays);

	useEffect(() => {
		if (holidays) {
			setHolidays(holidays); // Zustand 스토어에 holidays 상태 저장
		}
	}, [holidays, setHolidays]);
};

export default useManageHolidays;
