"use client"

import useFetchHolidays from "@/hooks/useFetchHolidays";
import HolidayTotalCount from "@/components/result-info/HolidayTotalCount";
import HolidayShowDetails from "@/components/result-info/HolidayShowDetails";
import EventShowDetails from './result-info/EventShowDetails';


const HolidayAndEventComponent = ({ events }) => {
	const { holidays, error } = useFetchHolidays();

	if (error) return <p>{"데이터를 가져오는 중 문제가 발생했습니다"}</p>;

	return (
		<>
			{/* <HolidayTotalCount count={holidays.length} /> */}
			{holidays && <HolidayShowDetails holidays={holidays} />}
			{events && <EventShowDetails events={events} />}
		</>
	);
};

export default HolidayAndEventComponent;