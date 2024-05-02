"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/components/icons/LoadingIcon";
import useQueryParams from "@/hooks/useQueryParams";
import useFetchHolidays from "@/hooks/useFetchHolidays";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
import styles from "@/styles/result-info.module.css";

interface Holiday {
	id?: number;
	title?: string;
	start?: string;
	dayOfWeek?: string;
}

export default function ShowDetails({}) {
	const router = useRouter();
	const [year, setYear] = useState("");
	const queryParams = useQueryParams();
	const startDate = queryParams.get("startDate");
	const endDate = queryParams.get("endDate");

	const { holidays, isLoading, error } = useFetchHolidays(startDate, endDate);

	useEffect(() => {
		const yearParam = new URLSearchParams(window.location.search).get("year");
		setYear(yearParam);
	}, [queryParams]);

	if (isLoading) return <Loading />; // 로딩 중 처리
	// if (error) return <p>{"문제가 발생하였습니다."}</p>; // 에러 처리

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<h1>공휴일 결과 상세 페이지</h1>
				{isLoading ? <Loading /> : <HolidayShowDetails holidays={holidays} />}
			</div>
		</div>
	);
}
