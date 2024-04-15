"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import koLocale from "@fullcalendar/core/locales/ko";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

const formatDate = (date: string) => {
	return moment(date).format("YYYY-MM-DD");
};

const fetchHolidays = async () => {
	const response = await fetch("https://date.nager.at/api/v3/PublicHolidays/2024/KR");
	const data = await response.json();

	return data.map((holiday: any, index: number) => ({
		id: index,
		title: holiday.localName,
		start: formatDate(holiday.date),
		resourceId: index + 1,
	}));
};

export default function MainCalendar() {
	const [events, setEvents] = useState([]);
	useEffect(() => {
		fetchHolidays().then(holidays => {
			setEvents(holidays);
			console.log(holidays);
		});
	}, []);
	return (
		<>
			<div className="calendar-container">
				<FullCalendar
					plugins={[resourceTimelinePlugin, dayGridPlugin, interactionPlugin, timeGridPlugin]}
					headerToolbar={{
						left: "prev,next today",
						center: "title",
						right: "resourceTimelineWeek,dayGridMonth,timeGridWeek",
					}}
					buttonText={{
						today: "Today", // 오늘 버튼 텍스트 영어로 설정
						resourceTimelineWeek: "Day", // 일 버튼 텍스트 영어로 설정
						dayGridMonth: "Month", // 월 버튼 텍스트 영어로 설정
						timeGridWeek: "Week", // 주 버튼 텍스트 영어로 설정
					}}
					locale={koLocale}
					initialView="dayGridMonth"
					nowIndicator={true}
					editable={true}
					selectable={true}
					selectMirror={true}
					resources={[
						{ id: "a", title: "Auditorium A" },
						{ id: "b", title: "Auditorium B", eventColor: "green" },
						{ id: "c", title: "Auditorium C", eventColor: "orange" },
					]}
					events={events}
				/>
			</div>
		</>
	);
}
