"use client";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { formatISO } from "date-fns";
import DayPickerTool from "./DayPickerTool";

export default function SearchEventDay() {
	const [range, setRange] = useState<DateRange | undefined>();
	const router = useRouter();

	const handleDaySearch = (newRange: DateRange | undefined) => {
		if (newRange && newRange.from && newRange.to) {
			const from = formatISO(newRange.from, { representation: "date" });
			const to = formatISO(newRange.to, { representation: "date" });
			router.push(`/result-info?from=${from}&to=${to}`);
			console.log(from, to);
		}
	};

	return (
		<div>
			<DayPickerTool range={range} setRange={setRange} onSearch={handleDaySearch} />
		</div>
	);
}
