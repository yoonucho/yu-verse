"use client";
import Loading from "@/components/icons/LoadingIcon";
import useFetchHolidays from "@/hooks/useFetchHolidays";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
import styles from "@/styles/result-info.module.css";

export default function ShowDetails({}) {
	const { holidays, isLoading, error } = useFetchHolidays();

	if (isLoading) return <Loading />; // 로딩 중 처리
	if (error) return <p>{"문제가 발생하였습니다."}</p>; // 에러 처리

	return (
		<div className={styles.container}>
			<div className={styles.inner}>
				<h1>공휴일 결과 상세 페이지</h1>
				{isLoading ? <Loading /> : <HolidayShowDetails holidays={holidays} />}
			</div>
		</div>
	);
}
