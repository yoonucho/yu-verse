"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import getFetchHolidays, { HoliDayDates } from "@/app/api/holidayAPI";
import useLoadingStore from "@/stores/useLoadingStore";
import usePopupStore from "@/stores/usePopupStore";
import useEventStore, { EventType } from "@/stores/useEventStore";
import CalendarComponent from "./CalendarComponent";
import Loading from "@/components/icons/LoadingIcon";
import EventPopupControl from "@/components/popup/EventPopupControl";
import { calculatePosition } from "@/utils/caluatePosition";

const MainCalendar: React.FC = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [holidayEvents, setHolidayEvents] = useState<HoliDayDates[]>([]);
	const { isLoading, setIsLoading } = useLoadingStore();
	const { openPopup, setPopupPosition } = usePopupStore();
	const { events, fetchEvents, setSelectedEvent, setSelectedDate, setIsEditing } = useEventStore();

	const loadedYears = useRef(new Set<number>());
	const currentYearRef = useRef<number | null>(null);

	type EventClickArg = {
		event: EventType;
		el: HTMLElement;
		view: any;
	};

	// 날짜 더블 클릭시 팝업 x, y 좌표 설정
	const handleDateDoubleClick = (dateInfo: any) => {
		// alert("clicked on " + info.el);
		setSelectedDate(dateInfo.dateStr);
		setSelectedEvent(null);
		setIsEditing(true);
		const position = calculatePosition(dateInfo.dayEl, dateInfo.view.calendar.el);
		setPopupPosition(position);
		openPopup();
	};

	// 이벤트 클릭시 팝업 x, y 좌표 설정
	const eventClick = (info: EventClickArg) => {
		setSelectedEvent(info.event);
		console.log("info", info.event);
		const position = calculatePosition(info.el, info.view.calendar.el);
		setPopupPosition(position);
		openPopup();
	};

	// 연도별 이벤트 데이터 가져오기
	const fetchHolidayEvents = useCallback(
		async (year: number) => {
			if (loadedYears.current.has(year)) {
				return;
			}
			const data: HoliDayDates[] = await getFetchHolidays(year);
			// console.log(`Fetched events for year ${year}:`, data); // 로그 추가
			// setHolidayEvents(prevEvents => [...prevEvents, ...data]); // 새로운 배열을 직접 설정
			setHolidayEvents(prevEvents => {
				const existingEventIds = new Set(prevEvents.map(event => event.id));
				const newEvents = data.filter(event => !existingEventIds.has(event.id));
				return [...prevEvents, ...newEvents];
			});

			loadedYears.current.add(year);
		},
		[setHolidayEvents]
	);

	const handleYearChange = (newYear: number) => {
		// 현재 연도와 새로운 연도가 다를 때만 실행
		if (currentYearRef.current !== newYear) {
			// 현재 연도를 새로운 연도로 업데이트
			currentYearRef.current = newYear;
			fetchHolidayEvents(newYear);
			// URL을 새로운 연도로 업데이트
			router.replace(`?year=${newYear}`);
			// console.log("newYear", newYear);
		}
	};

	useEffect(() => {
		// setIsLoading(true);
		// URL에서 year 파라미터를 가져옴
		const yearParam = searchParams.get("year");
		// 현재 연도 가져오기
		const currentYear = new Date().getFullYear();
		//  URL에서 가져온 연도가 있으면 그 값을 사용하고, 없으면 현재 연도를 사용
		const year = yearParam ? parseInt(yearParam, 10) : currentYear;
		console.log("year", year);
		// 해당 연도의 이벤트 데이터를 가져오는 함수 호출
		fetchHolidayEvents(year);
		// 처음 로드될 때만 사용자 이벤트 페치
		if (!events.length) {
			fetchEvents(setIsLoading);
		}
	}, [searchParams, fetchHolidayEvents, fetchEvents, events.length, setIsLoading]);

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	const combinedEvents = [...events, ...holidayEvents];
	// console.log("combinedEvents", combinedEvents, events);
	return (
		<>
			<CalendarComponent events={combinedEvents} eventClick={eventClick} handleYearChange={handleYearChange} handleDateDoubleClick={handleDateDoubleClick} />
			<EventPopupControl />
		</>
	);
};

export default MainCalendar;
