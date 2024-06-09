"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ko } from "date-fns/locale";
import getFetchHolidays from "@/app/api/holidayAPI";
import useMenuStore from "@/stores/useMenuStore";
import usePopupStore from "@/stores/usePopupStore";
import useLoadingStore from "@/stores/useLoadingStore";
import Loading from "@/components/icons/LoadingIcon";
import EventPopup from "@/components/popup/EventPopup";
import styles from "./main-calendar.module.css";

const MainCalendar: React.FC = () => {
	const { openMenu } = useMenuStore();
	const { isPopupOpen, openPopup, closePopup, popupPosition, setPopupPosition } = usePopupStore();
	const { isLoading, setIsLoading } = useLoadingStore();

	const [events, setEvents] = useState([]);
	const [height, setHeight] = useState(0);
	const [selectedEvent, setSelectedEvent] = useState(null); // 이벤트 클릭시 선택된 이벤트

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
		jsEvent: MouseEvent;
		view: any;
	};

	const eventClick = (info: EventClickArg) => {
		setSelectedEvent(info.event);
		// console.log("e", info.event);

		// 클릭한 이벤트의 DOM 요소 위치 가져오기
		const rect = info.el.getBoundingClientRect();
		setPopupPosition({ x: rect.left, y: rect.top + window.scrollY });
		openPopup();
	};

	const handleClosePopup = () => {
		closePopup();
		setSelectedEvent(null);
	};

	// 팝업창의 외부를 클릭하면 팝업창 닫기
	const handleClickOutside = (event: MouseEvent) => {
		if (isPopupOpen && !(event.target as HTMLElement).closest(`.event-popup_popup`) && !(event.target as HTMLElement).closest(`.fc-event`)) {
			handleClosePopup();
		}
	};

	useEffect(() => {
		setHeight(window.innerHeight - 40);

		async function fetchEvents() {
			const data = await getFetchHolidays();
			setEvents(data);
			setIsLoading(false);
		}
		fetchEvents();
	}, [setIsLoading]);

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});

	if (isLoading) {
		return (
			<div>
				<Loading />
			</div>
		);
	}
	return (
		<>
			<div className={styles.container}>
				<div className="calendar-container">
					<FullCalendar
						plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
						headerToolbar={{
							left: "prev,next today",
							center: "title",
							right: "searchButton dayGridMonth,timeGridWeek",
						}}
						customButtons={{
							searchButton: {
								text: "",
								click: openMenu,
							},
						}}
						buttonText={{
							today: "Today", // 오늘 버튼 텍스트 영어로 설정
							resourceTimelineWeek: "Day", // 일 버튼 텍스트 영어로 설정
							dayGridMonth: "Month", // 월 버튼 텍스트 영어로 설정
							timeGridWeek: "Week", // 주 버튼 텍스트 영어로 설정
						}}
						locale={ko}
						initialView="dayGridMonth"
						nowIndicator={true}
						editable={true}
						selectable={true}
						selectMirror={true}
						events={events}
						eventClick={eventClick}
						height={height}
					/>
				</div>
				{isPopupOpen && selectedEvent && <EventPopup event={selectedEvent} closePopup={handleClosePopup} position={popupPosition} />}
			</div>
		</>
	);
};

export default MainCalendar;
