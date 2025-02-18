'use client';

import useFetchHolidays from '@/hooks/useFetchHolidays';
import useManageHolidays from '@/hooks/useManageHolidays';

type HolidayProviderProps = {
	children: React.ReactNode;
};

const HolidayProvider = ({ children }: HolidayProviderProps) => {
	const { holidays, error } = useFetchHolidays();
	useManageHolidays(holidays); // 상태 관리 훅

	if (error) return <p>{'공휴일 데이터를 가져오는 중 문제가 발생했습니다.'}</p>;

	return children;
};

export default HolidayProvider;
