"use client";

import React, { useCallback, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import CalendarComponent from "./CalendarComponent";
import Loading from "@/components/icons/LoadingIcon";
import EventPopupControl from "@/components/popup/EventPopupControl";
import getFetchHolidays from "@/app/api/holidayAPI";
import useLoadingStore from "@/stores/useLoadingStore";
import usePopupStore from "@/stores/usePopupStore";

const MainCalendar: React.FC = () => {
	const searchParams = useSearchParams();

	const { isLoading, setIsLoading } = useLoadingStore();
	const { openPopup, closePopup, setPopupPosition } = usePopupStore();

	const [events, setEvents] = useState([]);
	const [selectedEvent, setSelectedEvent] = useState(null);

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

	const eventClick = (info: EventClickArg) => {
		setSelectedEvent(info.event);

		const rect = info.el.getBoundingClientRect();
		setPopupPosition({ x: rect.left, y: rect.top + window.scrollY });
		openPopup();
	};

	const handleClosePopup = () => {
		closePopup();
		setSelectedEvent(null);
	};

	// URL에서 연도 가져오기
	const year = parseInt(searchParams.get("year")) || new Date().getFullYear();
	console.log("year", year);

	const fetchEvents = useCallback(
		async (year: number) => {
			const data = await getFetchHolidays(year);
			setEvents(data);
			setIsLoading(false);
		},
		[setEvents, setIsLoading]
	);

	useEffect(() => {
		// setIsLoading(true);
		fetchEvents(year);
	}, [year, fetchEvents]);

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}
	return (
		<>
			<CalendarComponent events={events} eventClick={eventClick} />
			<EventPopupControl selectedEvent={selectedEvent} handleClosePopup={handleClosePopup} />
		</>
	);
};

export default MainCalendar;
