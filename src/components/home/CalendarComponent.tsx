"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ko } from "date-fns/locale";
import useMenuStore from "@/stores/useMenuStore";
import styles from "./main-calendar.module.css";

const CalendarComponent = ({ events, eventClick}) => {
	const { openMenu } = useMenuStore();
	const [height, setHeight] = useState(0);


	useEffect(() => {
		setHeight(window.innerHeight - 40);
	}, []);

	
	return (
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
			</div>
	);
};

export default CalendarComponent;
