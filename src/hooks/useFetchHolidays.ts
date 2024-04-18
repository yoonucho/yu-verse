import { useState, useEffect } from "react";
import { parseISO, isWithinInterval, getYear } from "date-fns";
import getFetchHolidays from "@/app/api/holidayAPI";

const useFetchHolidays = (from: string | null, to: string | null) => {
	const [holidays, setHolidays] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchHolidays = async () => {
			if (!from || !to) {
				setError("from과 to 날짜가 모두 제공되어야 합니다.");
				return;
			}

			setIsLoading(true);
			setError(null);

			try {
				const year = getYear(parseISO(from));
				const fetchedData = await getFetchHolidays(year);
				const filteredData = fetchedData.filter(holiday => isWithinInterval(parseISO(holiday.start), { start: parseISO(from), end: parseISO(to) }));
				setHolidays(filteredData);
			} catch (e) {
				setError("데이터를 불러오는 중 에러가 발생했습니다.");
				console.error(e);
			}

			setIsLoading(false);
		};

		fetchHolidays();
	}, [from, to]); // from, to가 변경될 때마다 useEffect 내부의 fetchHolidays 함수 실행

	return { holidays, isLoading, error };
};

export default useFetchHolidays;
