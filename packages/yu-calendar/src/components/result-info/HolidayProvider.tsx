'use client';

import { useEffect } from 'react';
import useFetchHolidays from '@/hooks/useFetchHolidays';
import useHolidayStore from '@/stores/useHolidayStore';

type HolidayProviderProps = {
	children: React.ReactNode;
};

const HolidayProvider = ({ children }: HolidayProviderProps) => {
	const { holidays, error } = useFetchHolidays();
	const setHolidays = useHolidayStore(state => state.setHolidays);

	useEffect(() => {
		if (holidays) setHolidays(holidays);
	}, [holidays, setHolidays]);

	if (error) return <p>{'공휴일 데이터를 가져오는 중 문제가 발생했습니다.'}</p>;

	return children;
};

export default HolidayProvider;
