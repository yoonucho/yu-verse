"use client";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useRouter } from "next/navigation";
import { getFetchHolidays } from "@/app/api/holidayAPI";
import Loading from "@/components/icons/LoadingIcon";
import SideBarLayout from "@/components/layouts/SideBarLayout";
import GoBack from "@/components/GoBack";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
import styles from "@/styles/result-info.module.css";

interface Holiday {
	id?: number;
	title?: string;
	start?: string;
	dayOfWeek?: string;
}

export default function ShowDetails() {
	const router = useRouter();
	const { from, to } = router.query;
	const [isMenuOpen, setIsMenuOpen] = useState(true);

	const { data: holidays, isLoading, isError } = useQuery(["holidays", from, to], () => getFetchHolidays(from as string, to as string));

	if (isLoading) return <Loading />; // 로딩 중 처리
	if (isError) return <p>{"문제가 발생하였습니다."}</p>; // 에러 처리

	return (
		<SideBarLayout isMenuOpen={isMenuOpen}>
			<div className={styles.container}>
				<GoBack />
				<div className={styles.inner}>
					<h1>공휴일 결과 상세 페이지</h1>
					{isLoading ? <Loading /> : <HolidayShowDetails holidays={holidays} />}
				</div>
			</div>
		</SideBarLayout>
	);
}
