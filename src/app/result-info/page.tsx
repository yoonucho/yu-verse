"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/icons/LoadingIcon";
import useFetchHolidays from "@/hooks/useFetchHolidays";
import GoBack from "@/components/GoBack";
import HolidayTotalCount from "@/components/result-info/HolidayTotalCount";
import styles from "@/styles/result-info.module.css";

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
	const router = useRouter();
	const queryParams = useQueryParams();
	const from = queryParams.get("from");
	const to = queryParams.get("to");

	const handleShowDetails = () => {
		router.push(`/result-info/show-details/?from=${from}&to=${to}`);
	};

	const { holidays, isLoading, error } = useFetchHolidays(from, to);
	if (isLoading) return <Loading />; // 로딩 중 처리
	if (error) return <p>{"문제가 발생하였습니다."}</p>;
	return (
		<div className={styles.container}>
			<GoBack />
			<div className={styles.inner}>
				<h1>공휴일 결과 페이지</h1>
				{isLoading ? (
					<Loading />
				) : (
					<div>
						<HolidayTotalCount count={holidays.length} onShowDetails={handleShowDetails} />
					</div>
				)}
			</div>
		</div>
	);
}
