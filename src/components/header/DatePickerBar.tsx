import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { formatISO } from "date-fns";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/styles/datepicker.module.css";

export default function DatePickerBar({ startDate, setStartDate, endDate, setEndDate, onSearch }) {
	const isRangeSelected = startDate && endDate;
	const isRangeAllSelected = isRangeSelected && startDate !== endDate;

	const handleDaySearch = () => {
		if (startDate && endDate) {
			onSearch({ startDate, endDate });
		} else {
			alert("날짜를 선택하세요!");
		}
	};

	const handleReset = () => {
		console.log("handleReset");
		setStartDate(null);
		setEndDate(null);
	};

	return (
		<div className="date-picker-bar">
			<div className={styles.container}>
				<div className={styles.inputBar}>
					<FontAwesomeIcon icon={faCalendar} />
				</div>
				<div>
					<DatePicker
						dateFormat="yyyy/MM/dd"
						selected={startDate}
						onChange={date => {
							console.log("New startDate:", date);
							setStartDate(date);
						}}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						locale={ko}
					/>
					<DatePicker
						dateFormat="yyyy/MM/dd"
						selected={endDate}
						onChange={date => {
							console.log("New endate:", date);
							setEndDate(date);
						}}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						locale={ko}
					/>
					<FontAwesomeIcon icon={faCalendar} />
				</div>
				<div className={styles.btnContainer}>
					<button className={isRangeAllSelected ? styles.btnActive : styles.searchBtn} onClick={handleDaySearch}>
						날짜 검색하기
					</button>
					<button className={isRangeSelected ? styles.btnActive : styles.resetBtn} onClick={handleReset}>
						날짜 초기화하기
					</button>
				</div>
			</div>
		</div>
	);
}
