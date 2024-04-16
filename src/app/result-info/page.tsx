"use client";
import React, { useEffect, useState } from "react";
import { parseISO, isWithinInterval, getYear } from "date-fns";
import Loading from "@/app/loading";
import getFetchHolidays from "@/app/api/holidayAPI";

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
				setHolidays([]);
			}
			setIsLoading(false);
		};

		executeFetch();
	}, [from, to]);

	return (
		<div>
			<h1>Holiday List</h1>
			{isLoading ? (
				<Loading />
			) : message ? (
				<p>{message}</p>
			) : (
				<ul>
					{holidays.map(holiday => (
						<li key={holiday.id}>
							{holiday.title} on {holiday.start} {holiday.dayOfWeek}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
