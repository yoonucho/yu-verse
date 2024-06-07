import DatePicker from "react-datepicker";
import { getMonth, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";

type DatePickerBarProps = {
	startDate: Date | null;
	endDate: Date | null;
	setStartDate: (date: Date) => void;
	setEndDate: (date: Date) => void;
	onSearch: () => void;
};

const DatePickerBar: React.FC<DatePickerBarProps> = ({ startDate, endDate, setStartDate, setEndDate, onSearch }) => {
	const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() + i);
	const isRangeSelected = startDate && endDate;
	const isRangeAllSelected = isRangeSelected && startDate !== endDate;

	const handleDaySearch = () => {
		if (startDate && endDate) {
			onSearch();
		} else {
			alert("날짜를 선택하세요!");
		}
	};

	// endDate가 startDate보다 작을 경우 셀렉트박스 비활성화되고 alert창 띄우기
	if (startDate && endDate && startDate > endDate) {
		alert("종료일은 시작일보다 클 수 없습니다.");
		setStartDate(null);
		setEndDate(null);
	}

	const handleReset = () => {
		// console.log("handleReset");
		setStartDate(null);
		setEndDate(null);
	};

	return (
		<div className={styles.container}>
			<div className={styles.inputBar}>
				<div>
					<DatePicker
						showIcon
						toggleCalendarOnIconClick
						showYearDropdown
						placeholderText="시작일"
						dateFormatCalendar="MMMM"
						scrollableYearDropdown
						yearDropdownItemNumber={15}
						dateFormat="yyyy.MM.dd"
						selected={startDate}
						onChange={date => {
							setStartDate(date);
						}}
						dropdownMode="select"
						selectsStart
						startDate={startDate}
						endDate={endDate}
						locale={ko}
						renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
							<div className={styles.customHeader}>
								<div>
									<select className={styles.selectYear} value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
										{years.map(option => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
									<span>{getMonth(date) + 1}월</span>
								</div>
								<div>
									<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
										<FontAwesomeIcon icon={faChevronLeft} />
									</button>
									<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
										<FontAwesomeIcon icon={faChevronRight} />
									</button>
								</div>
							</div>
						)}
					/>
					<span className={styles.dash}> - </span>
					<DatePicker
						showIcon
						toggleCalendarOnIconClick
						showYearDropdown
						placeholderText="종료일"
						dateFormatCalendar="MMMM"
						scrollableYearDropdown
						yearDropdownItemNumber={15}
						dateFormat="yyyy.MM.dd"
						selected={endDate}
						onChange={date => {
							setEndDate(date);
						}}
						dropdownMode="select"
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate}
						locale={ko}
						renderCustomHeader={({ date, changeYear, decreaseMonth, increaseMonth, prevMonthButtonDisabled, nextMonthButtonDisabled }) => (
							<div className={styles.customHeader}>
								<div>
									<select className={styles.selectYear} value={getYear(date)} onChange={({ target: { value } }) => changeYear(+value)}>
										{years.map(option => (
											<option key={option} value={option}>
												{option}
											</option>
										))}
									</select>
									<span>{getMonth(date) + 1}월</span>
								</div>
								<div>
									<button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
										<FontAwesomeIcon icon={faChevronLeft} />
									</button>
									<button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
										<FontAwesomeIcon icon={faChevronRight} />
									</button>
								</div>
							</div>
						)}
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
	);
};

export default DatePickerBar;
