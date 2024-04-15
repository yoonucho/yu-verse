"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import timeGridPlugin from "@fullcalendar/timegrid";
import koLocale from "@fullcalendar/core/locales/ko";
import moment from "moment";
import "moment/locale/ko";

moment.locale("ko");

export default function MainCalendar({ events }) {
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
