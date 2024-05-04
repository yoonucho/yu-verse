"use client";
import { useRouter } from "next/navigation";
import Loading from "@/components/icons/LoadingIcon";
import GoBack from "@/components/header/GoBack";
import useFetchHolidays from "@/hooks/useFetchHolidays";
import HolidayTotalCount from "@/components/result-info/HolidayTotalCount";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
import useSetDateStore from "@/stores/useSetDateStore";
import { formatISO } from "date-fns";
import styles from "@/styles/result-info.module.css";

export default function ResultInfo(isMenuOpen) {
	const router = useRouter();
	const { startDate, endDate } = useSetDateStore();
	const { holidays, isLoading, error } = useFetchHolidays();

	const handleShowDetails = () => {
		// 날짜를 ISO 문자열로 변환
		const startFormatDate = startDate ? formatISO(startDate, { representation: "date" }) : "";
		const endFormatDate = endDate ? formatISO(endDate, { representation: "date" }) : "";
		router.push(`/result-info/show-details?startDate=${startFormatDate}&endDate=${endFormatDate}`);
	};

	const handleClick = () => {
		router.back();
	};

	if (isLoading) return <Loading />; // 로딩 중 처리
	if (error) return <p>{"문제가 발생하였습니다."}</p>;
	return (
		<>
			<GoBack isOpen={isMenuOpen} onClick={handleClick} />
			<div className={styles.container}>
				<div className={styles.inner}>
					<h1>공휴일 결과 페이지</h1>
					<div>
						<HolidayTotalCount count={holidays.length} />
						<HolidayShowDetails holidays={holidays} />
					</div>
				</div>
			</div>
		</>
	);
}
