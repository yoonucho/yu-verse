import { useState, useEffect } from "react";
import { getYear, parseISO, isWithinInterval } from "date-fns";
import getFetchHolidays from "@/app/api/holidayAPI";
import useSetDateStore from "@/stores/useSetDateStore";
import useLoadingStore from "@/stores/useLoadingStore";

type Holiday = {
	id?: number;
	title?: string;
	start?: string;
	dayOfWeek?: string;
};

const useFetchHolidays = () => {
	const { startDate, endDate } = useSetDateStore();
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const { setIsLoading } = useLoadingStore();
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchHolidays = async () => {
			setIsLoading(true);

			try {
				const fromYear = startDate ? getYear(parseISO(startDate.toISOString())) : null;
				const toYear = endDate ? getYear(parseISO(endDate.toISOString())) : null;
				if (!fromYear || !toYear) {
					setError(new Error("Invalid dates"));
					setIsLoading(false);
					return;
				}
				const promises: Promise<Holiday[]>[] = [];

				for (let year = fromYear; year <= toYear; year++) {
					promises.push(getFetchHolidays(year));
				}

				const results = await Promise.all(promises);
				// console.log("API Results:", results); // API 응답 로그
				const allHolidays = [].concat(...results);

				const filteredHolidays = allHolidays.filter(holiday => isWithinInterval(parseISO(holiday.start), { start: parseISO(startDate.toISOString()), end: parseISO(endDate.toISOString()) }));

				setHolidays(filteredHolidays);
			} catch (error) {
				console.error("Failed to fetch holidays:", error);
				setError(error);
				setHolidays([]);
			}

			setIsLoading(false);
		};

		if (startDate && endDate) {
			fetchHolidays();
		}
	}, [startDate, endDate, setIsLoading]); // 변경될 때마다 useEffect 내부의 fetchHolidays 함수 실행

	return { holidays , error };
};

export default useFetchHolidays;
