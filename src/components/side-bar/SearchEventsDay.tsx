"use client";
import React, { useState } from "react";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import { formatISO } from "date-fns";
import DayPickerTool from "./DayPickerTool";
import styles from "@/styles/search-event-day.module.css";

export default function SearchEventDay({ isOpen }) {
	const [range, setRange] = useState<DateRange | undefined>();
	const router = useRouter();

	const handleDaySearch = (newRange: DateRange | undefined) => {
		if (newRange && newRange.from && newRange.to) {
			const from = formatISO(newRange.from, { representation: "date" });
			const to = formatISO(newRange.to, { representation: "date" });
			router.push(`/result-info?from=${from}&to=${to}`);
		}
	};

	return (
		<div className={`${styles.container} ${isOpen ? styles.show : ""}`}>
			<DayPickerTool range={range} setRange={setRange} onSearch={handleDaySearch} />
		</div>
	);
}
