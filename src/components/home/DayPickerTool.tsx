"use client";
import React, { useState, useRef } from "react";
import { format, formatISO } from "date-fns";
import { DateRange, DayPicker, DateFormatter } from "react-day-picker";
import { ko } from "date-fns/locale";
import { usePopper } from "react-popper";
import "react-day-picker/dist/style.css";
import styles from "@/styles/daypicker.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

export default function DayPickerTool({ range, setRange, onSearch }) {
	const defaultSelected: DateRange = {
		from: undefined,
		to: undefined,
	};
	const [isPopperOpen, setIsPopperOpen] = useState(false);
	const [placeholderText, setPlaceholderText] = useState("공휴일을 검색하세요!");
	const popperRef = useRef<HTMLDivElement>(null);
	// const buttonRef = useRef<HTMLButtonElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

	const popper = usePopper(popperRef.current, popperElement, {
		placement: "bottom-start",
	});

	const handleInputClick = () => {
		setIsPopperOpen(true);
		setPlaceholderText("");
	};
	const closePopper = () => {
		setIsPopperOpen(false);
		setPlaceholderText("공휴일을 검색하세요!");
		// buttonRef?.current?.focus();
	};

	const selectedRange = range || defaultSelected;

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
			closePopper();
		} else {
			alert("날짜를 선택하세요!");
		}
	};

	const handleReset = () => {
		setRange(undefined);
	};

	return (
		<>
			<div ref={popperRef}>
				<div>
					<div className={styles.inputBar}>
						<input ref={inputRef} readOnly onClick={handleInputClick} className={styles.popupBar} placeholder={placeholderText} style={{ cursor: "pointer" }} />
						<button className={styles.searchBtn} onClick={handleDaySearch}>
							날짜 검색하기
						</button>
						<button className={styles.resetBtn} onClick={handleReset}>
							날짜 초기화하기
						</button>
					</div>
					{isPopperOpen && (
						<div ref={setPopperElement} style={popper.styles.popper} className={styles.container}>
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
					)}
				</div>
			</div>
		</>
	);
}
