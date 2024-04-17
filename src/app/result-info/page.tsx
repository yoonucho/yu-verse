"use client";
import React, { useEffect, useState } from "react";
import { parseISO, isWithinInterval, getYear } from "date-fns";
import Loading from "@/components/icons/LoadingIcon";
import getFetchHolidays from "@/app/api/holidayAPI";
import HolidayTotalCount from "@/components/result-info/HolidayTotalCount";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
// import styles from "@/styles/result-info.module.css";

interface Holiday {
	id?: number;
	title?: string;
	start?: string;
	dayOfWeek?: string;
}
const useQueryParams = () => {
	if (typeof window !== "undefined") {
		console.log("window.location.search", window.location.search);
		return new URLSearchParams(window.location.search);
	}
	return new URLSearchParams();
};

export default function ResultInfo() {
	const [holidays, setHolidays] = useState<Holiday[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [showDetails, setShowDetails] = useState(false);
	const [message, setMessage] = useState("");
	const queryParams = useQueryParams();
	const from = queryParams.get("from");
	const to = queryParams.get("to");

	useEffect(() => {
		const executeFetch = async () => {
			setIsLoading(true);
			try {
				const year = from ? getYear(parseISO(from)) : getYear(new Date());
				const fetchedHolidays: Holiday[] = await getFetchHolidays(year);
				const filtered = fetchedHolidays.filter(holiday => {
					return from && to && isWithinInterval(parseISO(holiday.start), { start: parseISO(from as string), end: parseISO(to as string) });
				});
				if (filtered.length > 0) {
					console.log("filtered", filtered);
					setHolidays(filtered);
					setMessage("");
				} else {
					setMessage("공휴일이 없어요!");
				}
			} catch (error) {
				console.error("Failed to fetch holidays:", error);
				setMessage("데이터를 가져오는 데 실패했습니다.");
				setHolidays([]);
			}
			setIsLoading(false);
		};

		executeFetch();
	}, [from, to]);

	return (
		<div>
			<h1>공휴일 결과 페이지</h1>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{!showDetails ? (
						<HolidayTotalCount count={holidays.length} onShowDetails={() => setShowDetails(true)} />
					) : message ? (
						<p>{message}</p>
					) : (
						<HolidayShowDetails holidays={holidays} message={message} />
					)}
				</>
			)}
		</div>
	);
}
