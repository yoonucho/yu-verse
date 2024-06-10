"use client";

import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import { DatesSetArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { ko } from "date-fns/locale";
import useMenuStore from "@/stores/useMenuStore";
import styles from "./main-calendar.module.css";

type CalendarComponentProps = {
	events: any[];
	eventClick: (info: any) => void;
	handleYearChange: (year: number) => void;
	loadedYears: Set<number>;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ events, eventClick, handleYearChange, loadedYears }) => {
	const { openMenu } = useMenuStore();
	const [height, setHeight] = useState(0);

	useEffect(() => {
		setHeight(window.innerHeight - 40);
	}, []);

	const handleDatesSet = (dateInfo: DatesSetArg) => {
		// console.log("dateInfo", dateInfo.view.title);
		// 시작, 끝 연도 가져오기
		const startYear = dateInfo.start.getFullYear();
		const endYear = dateInfo.end.getFullYear();
		// 보이는 연도 가져오기
		const visibleYear = new Set<number>();
		// console.log("visibleYear", typeof visibleYear);
		// 12월이면 연도 - 1
		if (dateInfo.view.title.includes("12월")) {
			// console.log("12월");
			visibleYear.add(endYear - 1);
		} else {
			//12월이 아닌 월은 연도 + 1
			for (let year = startYear; year <= endYear; year++) {
				// console.log("start", startYear, "end", endYear, year);
				visibleYear.add(year);
				console.log("visibleYear", visibleYear);
			}
		}

		visibleYear.forEach(year => handleYearChange(year));
	};

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
					datesSet={handleDatesSet}
					height={height}
				/>
			</div>
		</div>
	);
};

export default CalendarComponent;
