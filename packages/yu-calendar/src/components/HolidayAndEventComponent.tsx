'use client';

import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { toZonedTime } from 'date-fns-tz';
import useFetchHolidays from '@/hooks/useFetchHolidays';
import HolidayAndShowDetails from '@/components/result-info/HolidayAndEventShowDetails';

const HolidayAndEventComponent = ({ events }) => {
	const { holidays, error } = useFetchHolidays();
	const timezone = 'Asia/Seoul';

	if (error) return <p>{'데이터를 가져오는 중 문제가 발생했습니다'}</p>;

	// 한국 시간대에 맞춰 날짜 형식을 "yyyy- M- d a h: mm분으로 변환합니다.
	const formatEventDateToLocal = dateString => {
		if (!dateString) return null; // dateString이 없으면 null을 반환합니다.

		try {
			const zonedDate = toZonedTime(dateString, timezone);

			// mm이 00분으로 표시되는 문제가 있어서 아래와 같이 수정합니다.
			return format(zonedDate, 'yyyy-M-d a h:mm', { locale: ko });
		} catch (error) {
			console.error('날짜 형식 변환 중 문제가 발생했습니다', error);
			return dateString; // 에러가 발생하면 dateString을 그대로 반환합니다.
		}
	};


	// events의 start와 end를 한국 시간대에 맞춰 변환합니다.
	const formatEvents = events.map(formatEvent => ({
		...formatEvent,
		start: formatEventDateToLocal(formatEvent.start),
		end: formatEvent.end ? formatEventDateToLocal(formatEvent.end) : null,
	}));

	// holiday와 event를 합쳐서 하나의 배열로 만들어줍니다.
	const holidaysAndEvents = [...(holidays || []), ...formatEvents];

	return (
		<>
			{holidays.length}
			<HolidayAndShowDetails events={holidaysAndEvents} />
		</>
	);
};

export default HolidayAndEventComponent;
