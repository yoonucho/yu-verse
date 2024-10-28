"use client"

import useFetchHolidays from "@/hooks/useFetchHolidays";
import HolidayTotalCount from "@/components/result-info/HolidayTotalCount";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";


const HolidayClientComponent = () => {
	const { holidays, error } = useFetchHolidays();

	if (error) return <p>{"공휴일 데이터를 가져오는 중 문제가 발생했습니다"}</p>;

	return (
		<>
			<HolidayTotalCount count={holidays.length} />
			<HolidayShowDetails holidays={holidays} />
		</>
	);
}

export default HolidayClientComponent;