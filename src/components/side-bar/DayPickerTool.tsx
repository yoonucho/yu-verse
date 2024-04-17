"use client";
import React, { useState, useRef } from "react";
import { formatISO } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";
import { ko } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faXmark } from "@fortawesome/free-solid-svg-icons";
import "react-day-picker/dist/style.css";
import styles from "@/styles/daypicker.module.css";

export default function DayPickerTool({ range, setRange, onSearch }) {
	const defaultSelected: DateRange = {
		from: undefined,
		to: undefined,
	};
	const selectedRange = range || defaultSelected;
	const isRangeAllSelected = selectedRange.from && selectedRange.to;
	const isRangeSelected = selectedRange.from || selectedRange.to;
	let footerText = "시작일과 종료일을 선택하세요.";

	if (selectedRange?.from) {
		if (!selectedRange.to) {
			footerText = `${formatISO(selectedRange.from, { representation: "date" })}`;
		} else if (selectedRange.to) {
			footerText = `${formatISO(selectedRange.from, { representation: "date" })}–${formatISO(selectedRange.to, { representation: "date" })}`;
		}
	}

	const handleDaySearch = () => {
		if (range.from && range.to) {
			onSearch(range);
		} else {
			alert("날짜를 선택하세요!");
		}
	};

	const handleReset = () => {
		setRange(undefined);
	};

	return (
		<>
			<div>
				<div>
					<div className={styles.inputBar}>
						<FontAwesomeIcon icon={faCalendar} />
					</div>
					<div className={styles.container}>
						<DayPicker
							captionLayout="dropdown-buttons"
							mode="range"
							fromYear={2023}
							toYear={2025}
							selected={selectedRange}
							footer={footerText}
							onSelect={newRange => {
								setRange(newRange);
							}}
							locale={ko}
						/>

						{/* <button className={styles.closeIcon} onClick={closePopper}>
								<FontAwesomeIcon icon={faXmark} />
							</button> */}
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
		</>
	);
}
