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

	// 팝업 닫기
	const handleClosePopup = () => {
		closePopup();
		setSelectedEvent(null);
	};

	const fetchEvents = useCallback(
		async (year: number) => {
			const data = await getFetchHolidays(year);
			console.log(`Fetched events for year ${year}:`, data); // 로그 추가
			setEvents(prevEvents => [...prevEvents, ...data]);
			setIsLoading(false);
			loadedYears.current.add(year);
		},
		[setEvents, setIsLoading]
	);

	const handleYearChange = (newYear: number) => {
		// if (loadedYears.current.has(newYear)) return;
		router.push(`?year=${newYear}`, undefined);
		fetchEvents(newYear);
		console.log("newYear", newYear);
	};

	useEffect(() => {
		// setIsLoading(true);
		const yearParam = searchParams.get("year");
		const currentYear = new Date().getFullYear();
		// URL에서 연도 가져오기
		const year = yearParam ? parseInt(yearParam, 10) : currentYear;
		console.log("year", year);
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
