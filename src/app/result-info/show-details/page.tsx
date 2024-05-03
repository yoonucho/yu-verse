"use client";
import { useRouter } from "next/navigation";
import Loading from "@/components/icons/LoadingIcon";
import GoBack from "@/components/header/GoBack";
import useFetchHolidays from "@/hooks/useFetchHolidays";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
import styles from "@/styles/result-info.module.css";

export default function ShowDetails({ isMenuOpen }) {
	const router = useRouter();
	const { holidays, isLoading, error } = useFetchHolidays();

	const handleClick = () => {
		router.back();
	};

	if (isLoading) return <Loading />; // 로딩 중 처리
	if (error) return <p>{"문제가 발생하였습니다."}</p>; // 에러 처리

	return (
		<>
			<GoBack isOpen={isMenuOpen} onClick={handleClick} />
			<div className={styles.container}>
				<div className={styles.inner}>
					<h1>공휴일 결과 상세 페이지</h1>
					<HolidayShowDetails holidays={holidays} />
				</div>
			</div>
		</>
	);
}
