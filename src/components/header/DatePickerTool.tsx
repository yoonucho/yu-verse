"use client";
import { useState } from "react";
import { formatISO } from "date-fns";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import styles from "@/styles/datepicker.module.css";

export default function DatePickerTool({ range, setRange, onSearch }) {
	const defaultSelected = { from: undefined, to: undefined };
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
						<DatePicker
							mode="range"
							fromYear={2023}
							toYear={2025}
							selected={selectedRange}
							footer={footerText}
							onChange={newRange => {
								setRange(newRange);
							}}
							locale={ko}
						/>
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
