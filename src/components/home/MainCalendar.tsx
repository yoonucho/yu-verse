"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getFetchHolidays from "@/app/api/holidayAPI";
import useLoadingStore from "@/stores/useLoadingStore";
import usePopupStore from "@/stores/usePopupStore";
import CalendarComponent from "./CalendarComponent";
import Loading from "@/components/icons/LoadingIcon";
import EventPopupControl from "@/components/popup/EventPopupControl";

const MainCalendar: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const { isLoading, setIsLoading } = useLoadingStore();
	const { openPopup, closePopup, setPopupPosition } = usePopupStore();

	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);
	const loadedYears = useRef(new Set<number>());
	const currentYearRef = useRef<number | null>(null);

	type EventClickArg = {
		event: {
			title?: string;
			startStr?: string;
			endStr?: string;
			extendedProps?: {
				dayOfWeek?: string;
			};
		};
		el: HTMLElement;
	};

	// 이벤트 클릭시 팝업 x, y 좌표 설정
	const eventClick = (info: EventClickArg) => {
		setSelectedEvent(info.event);

		const rect = info.el.getBoundingClientRect();
		setPopupPosition({ x: rect.left, y: rect.top + window.scrollY });
		openPopup();
	};

	// 팝업 닫기 및 선택된 이벤트 초기화
	const handleClosePopup = () => {
		closePopup();
		setSelectedEvent(null);
	};

	// 연도별 이벤트 데이터 가져오기
	const fetchEvents = useCallback(
		async (year: number) => {
			const data = await getFetchHolidays(year);
			// console.log(`Fetched events for year ${year}:`, data); // 로그 추가
			setEvents(prevEvents => [...prevEvents, ...data]);
			setIsLoading(false);
			loadedYears.current.add(year);
		},
		[setEvents, setIsLoading]
	);

	const handleYearChange = (newYear: number) => {
		// 현재 연도와 새로운 연도가 다를 때만 실행
		if (currentYearRef.current !== newYear) {
			// 현재 연도를 새로운 연도로 업데이트
			currentYearRef.current = newYear;
			fetchEvents(newYear);
			// URL을 새로운 연도로 업데이트
			router.replace(`?year=${newYear}`);
			// console.log("newYear", newYear);
		}
	};

	useEffect(() => {
		// URL에서 year 파라미터를 가져옴
		const yearParam = searchParams.get("year");
		// 현재 연도 가져오기
		const currentYear = new Date().getFullYear();
		//  URL에서 가져온 연도가 있으면 그 값을 사용하고, 없으면 현재 연도를 사용
		const year = yearParam ? parseInt(yearParam, 10) : currentYear;
		// console.log("year", year);
		// 해당 연도의 이벤트 데이터를 가져오는 함수 호출
		fetchEvents(year);
	}, [searchParams, fetchEvents]);

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}
	return (
		<>
			<CalendarComponent events={events} eventClick={eventClick} handleYearChange={handleYearChange} />
			<EventPopupControl selectedEvent={selectedEvent} handleClosePopup={handleClosePopup} />
		</>
	);
};

export default MainCalendar;
