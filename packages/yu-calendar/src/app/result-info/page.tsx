"use client";

import { useRouter } from "next/navigation";
import Loading from "@/components/icons/LoadingIcon";
import GoBack from "@/components/header/GoBack";
import useFetchHolidays from "@/hooks/useFetchHolidays";
import HolidayTotalCount from "@/components/result-info/HolidayTotalCount";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
import useMenuStore from "@/stores/useMenuStore";
import useLoadingStore from '@/stores/useLoadingStore';
import styles from "./page.module.css";

const ResultInfo: React.FC = () => {
	const router = useRouter();
	const { closeMenu, isMenuOpen } = useMenuStore();
	const { isLoading } = useLoadingStore();
	const { holidays, error } = useFetchHolidays();

	const handleClick = () => {
		router.back();
		closeMenu();
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
};

export default ResultInfo;
