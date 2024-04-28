import { useState, useEffect } from "react";
import { getYear, parseISO, isWithinInterval } from "date-fns";
import getFetchHolidays from "@/app/api/holidayAPI";

const useFetchHolidays = (from, to) => {
	const [holidays, setHolidays] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	interface Holiday {
		id?: number;
		title?: string;
		start?: string;
		dayOfWeek?: string;
	}

	const useQueryParams = () => {
		if (typeof window !== "undefined") {
			return new URLSearchParams(window.location.search);
		}
		return new URLSearchParams();
	};
	const queryParams = useQueryParams();

	useEffect(() => {
		const fetchHolidays = async () => {
			setIsLoading(true);
			const fromYear = getYear(parseISO(from));
			const toYear = getYear(parseISO(to));
			try {
				let promises = [];

				for (let year = fromYear; year <= toYear; year++) {
					promises.push(getFetchHolidays(year));
				}

				let results = await Promise.all(promises);
				let allHolidays = [].concat(...results);

				const filteredHolidays = allHolidays.filter(holiday => isWithinInterval(parseISO(holiday.start), { start: parseISO(from), end: parseISO(to) }));

				setHolidays(filteredHolidays);
			} catch (error) {
				console.error("Failed to fetch holidays:", error);
				setError(error);
				setHolidays([]);
			}

			setIsLoading(false);
		};

		fetchHolidays();
	}, [from, to]); // from, to가 변경될 때마다 useEffect 내부의 fetchHolidays 함수 실행

	return { holidays, isLoading, error };
};

export default useFetchHolidays;
