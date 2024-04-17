"use client";
import React, { useState, useRef } from "react";
import { format, formatISO } from "date-fns";
import { DateRange, DayPicker, DateFormatter } from "react-day-picker";
import { ko } from "date-fns/locale";
import { usePopper } from "react-popper";
import "react-day-picker/dist/style.css";
import styles from "@/styles/daypicker.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faXmark } from "@fortawesome/free-solid-svg-icons";

const seasonEmoji: Record<string, string> = {
	winter: "⛄️",
	spring: "🌸",
	summer: "🌻",
	autumn: "🍂",
};

const getSeason = (month: Date): string => {
	const monthNumber = month.getMonth();
	if (monthNumber >= 0 && monthNumber < 3) return "winter";
	if (monthNumber >= 3 && monthNumber < 6) return "spring";
	if (monthNumber >= 6 && monthNumber < 9) return "summer";
	else return "autumn";
};

const formatCaption: DateFormatter = (month, options) => {
	const season = getSeason(month);
	return (
		<>
			<span role="img" aria-label={season} className={styles.icon}>
				{seasonEmoji[season]}
			</span>{" "}
			{format(month, "LLLL", { locale: options?.locale })}
		</>
	);
};

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

	return (
		<>
			<div ref={popperRef}>
				<div>
					<div className={styles.inputBar}>
						<input ref={inputRef} readOnly onClick={handleInputClick} className={styles.popupBar} placeholder={placeholderText} style={{ cursor: "pointer" }} />
						<button className={styles.searchBtn} onClick={handleDaySearch}>
							날짜검색하기
						</button>
					</div>
					{isPopperOpen && (
						<div ref={setPopperElement} style={popper.styles.popper} className={styles.container}>
							<DayPicker
								captionLayout="dropdown-buttons"
								mode="range"
								fromYear={2023}
								toYear={2025}
								formatters={{ formatCaption }}
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
			{/* <div className="fa-3x">
				<FontAwesomeIcon icon={faCalendar} />
			</div> */}
		</>
	);
}
