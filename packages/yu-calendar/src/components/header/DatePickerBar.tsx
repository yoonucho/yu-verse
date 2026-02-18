/**
 * 날짜 범위 검색을 위한 DatePicker 바 컴포넌트
 * 시작일과 종료일을 선택하여 이벤트를 검색
 */
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import DatePickerCustomHeader from "@/components/shared/DatePickerCustomHeader";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./datepicker.module.css";

type DatePickerBarProps = {
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  onSearch: () => void;
};

const DatePickerBar: React.FC<DatePickerBarProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onSearch,
}) => {
  const isRangeSelected = startDate && endDate;
  const isRangeAllSelected = isRangeSelected && startDate !== endDate;

  const handleDaySearch = () => {
    if (startDate && endDate) {
      onSearch();
    } else {
      alert("날짜를 선택하세요!");
    }
  };

  /** endDate가 startDate보다 작을 경우 초기화 */
  if (startDate && endDate && startDate > endDate) {
    alert("종료일은 시작일보다 클 수 없습니다.");
    setStartDate(null);
    setEndDate(null);
  }

  const handleReset = () => {
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
            onChange={(date) => {
              setStartDate(date);
            }}
            dropdownMode="select"
            selectsStart
            startDate={startDate}
            endDate={endDate}
            locale={ko}
            renderCustomHeader={(props) => (
              <DatePickerCustomHeader {...props} />
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
            onChange={(date) => {
              setEndDate(date);
            }}
            dropdownMode="select"
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            locale={ko}
            renderCustomHeader={(props) => (
              <DatePickerCustomHeader {...props} />
            )}
          />
        </div>
        <div className={styles.btnContainer}>
          <button
            className={isRangeAllSelected ? styles.btnActive : styles.searchBtn}
            onClick={handleDaySearch}
          >
            날짜 검색하기
          </button>
          <button
            className={isRangeSelected ? styles.btnActive : styles.resetBtn}
            onClick={handleReset}
          >
            날짜 초기화하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DatePickerBar;
