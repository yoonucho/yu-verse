"use client";
import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ko } from "date-fns/locale";
import styles from "@/styles/main-calendar.module.css";
import getFetchHolidays from "@/app/api/holidayAPI";
import Loading from "@/components/icons/LoadingIcon";

export default function MainCalendar({}) {
	const [events, setEvents] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		async function fetchEvents() {
			const data = await getFetchHolidays();
			setEvents(data);
			setLoading(false);
		}
		fetchEvents();
	}, []);

	if (loading) {
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
							right: "dayGridMonth,timeGridWeek",
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
					/>
				</div>
			</div>
		</>
	);
}
