"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { formatISO } from "date-fns";
import DatePickerBar from "@/components/header/DatePickerBar";
import useSetDateStore from "@/stores/useSetDateStore";
import styles from "@/styles/search-event-day.module.css";

export default function SearchEventDay() {
	const { startDate, endDate, setStartDate, setEndDate } = useSetDateStore();

	const router = useRouter();

	const handleDaySearch = () => {
		if (!startDate || !endDate) {
			alert("날짜를 선택하세요!");
			return;
		}
		console.log("handleDaySearch");
		const startFormatDate = formatISO(startDate, { representation: "date" });
		const endFormatDate = formatISO(endDate, { representation: "date" });
		if (startFormatDate && endFormatDate) {
			router.push(`/result-info?startDate=${startFormatDate}&endDate=${endFormatDate}`);
			console.log("startDate:", startFormatDate, "endDate:", endFormatDate, typeof startFormatDate, typeof endFormatDate);
		} else {
			alert("날짜를 선택하세요!");
		}
	};

	return (
		<div className={styles.container}>
			<DatePickerBar startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} onSearch={handleDaySearch} />
		</div>
	);
}
