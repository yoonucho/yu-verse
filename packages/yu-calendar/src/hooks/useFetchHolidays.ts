import { useState, useEffect } from 'react';
import { getYear, parseISO, isWithinInterval } from 'date-fns';
import getFetchHolidays from '@/app/api/holidayAPI';
import { HolidayDates } from '@/types.d';
import useSetDateStore from '@/stores/useSetDateStore';

const useFetchHolidays = () => {
	const { startDate, endDate } = useSetDateStore();
	const [holidays, setHolidays] = useState<HolidayDates[]>([]);
	const [localLoading, setLocalLoading] = useState(true); // 로컬 로딩 상태
	const [error, setError] = useState(null);

	useEffect(() => {
		// startDate와 endDate가 모두 유효한 경우에만 데이터 요청을 시작
		if (!startDate || !endDate) {
			setLocalLoading(false); // 날짜가 없으면 로딩 종료
			return;
		}

		const fetchHolidays = async () => {
			setLocalLoading(true); // 로딩 상태 변경

			try {
				const fromYear = startDate ? getYear(parseISO(startDate.toISOString())) : null;
				const toYear = endDate ? getYear(parseISO(endDate.toISOString())) : null;
				if (!fromYear || !toYear) {
					setError(new Error('Invalid dates'));
					setLocalLoading(false);
					return;
				}
				const promises: Promise<HolidayDates[]>[] = [];

				for (let year = fromYear; year <= toYear; year++) {
					promises.push(getFetchHolidays(year));
				}

				const results = await Promise.all(promises);
				// console.log("API Results:", results); // API 응답 로그
				const allHolidays = [].concat(...results);

				const filteredHolidays = allHolidays.filter(holiday => isWithinInterval(parseISO(holiday.start), { start: parseISO(startDate.toISOString()), end: parseISO(endDate.toISOString()) }));

				setHolidays(filteredHolidays);
			} catch (error) {
				console.error('Failed to fetch holidays:', error);
				setError(error);
				setHolidays([]);
			} finally {
				setLocalLoading(false); // 로딩 완료 시 false로 변경
			}
		};

		fetchHolidays();
	}, [startDate, endDate, localLoading]); // 변경될 때마다 useEffect 내부의 fetchHolidays 함수 실행

	return { holidays, error };
};

export default useFetchHolidays;
