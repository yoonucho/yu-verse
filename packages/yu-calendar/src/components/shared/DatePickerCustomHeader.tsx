/**
 * react-datepicker 공통 커스텀 헤더 컴포넌트
 * DatePickerBar와 EventForm에서 공통으로 사용하며, 오늘 버튼을 포함한다
 */
import { getMonth, getYear } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./datepicker-custom-header.module.css";

type DatePickerCustomHeaderProps = {
  date: Date;
  changeYear: (year: number) => void;
  decreaseMonth: () => void;
  increaseMonth: () => void;
  prevMonthButtonDisabled: boolean;
  nextMonthButtonDisabled: boolean;
  withBorder?: boolean;
};

const years = Array.from(
  { length: 11 },
  (_, i) => new Date().getFullYear() + i,
);

const DatePickerCustomHeader: React.FC<DatePickerCustomHeaderProps> = ({
  date,
  changeYear,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  withBorder,
}) => {
  return (
    <div
      className={`${styles.customHeader} ${withBorder ? styles.withBorder : ""}`}
    >
      <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className={styles.dateInfo}>
        <select
          className={styles.selectYear}
          value={getYear(date)}
          onChange={({ target: { value } }) => changeYear(+value)}
        >
          {years.map((option) => (
            <option key={option} value={option}>
              {`${option}년`}
            </option>
          ))}
        </select>

        <span>{getMonth(date) + 1}월</span>
      </div>
      <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default DatePickerCustomHeader;
