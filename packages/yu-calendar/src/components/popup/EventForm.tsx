/**
 * 이벤트 추가/수정 폼 컴포넌트
 * react-datepicker를 사용하여 날짜/시간 선택 UI를 프로젝트 테마에 맞게 표시한다
 */
import React, { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import { EventApi } from "@fullcalendar/core";
import { isSameDay } from "date-fns";
import { ko } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import { EventType } from "@/types.d";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import DatePickerCustomHeader from "@/components/shared/DatePickerCustomHeader";
import EventActions from "./EventActions";
import styles from "./event-form.module.css";
import "react-datepicker/dist/react-datepicker.css";

type EventFormProps = {
  event: EventType | any;
  onSave: (event: EventApi) => void;
  onDelete: (eventId: string) => void;
};

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onDelete }) => {
  const [title, setTitle] = useState(event?.title || "");
  const [start, setStart] = useState<Date | null>(
    event?.start ? new Date(event.start) : null,
  );
  const [end, setEnd] = useState<Date | null>(
    event?.end ? new Date(event.end) : null,
  );
  const [description, setDescription] = useState(
    event?.extendedProps?.description || "",
  );

  const [isStartOpen, setIsStartOpen] = useState(false);
  const [isEndOpen, setIsEndOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const startDatePickerRef = useRef<DatePicker>(null);
  const endDatePickerRef = useRef<DatePicker>(null);

  useEffect(() => {
    if (event?.start) setStart(new Date(event.start));
    if (event?.end) setEnd(new Date(event.end));
    if (event?.extendedProps?.description)
      setDescription(event.extendedProps.description);
  }, [event]);

  const handleSubmit = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!title || !start) {
      setErrorMessage("제목과 시작일은 필수 입력사항입니다.");
      return;
    }
    setErrorMessage("");

    const updatedEvent: Partial<EventApi> = {
      id: event?.id || uuidv4(),
      title,
      start,
      end: end ?? null,
      extendedProps: {
        ...(event?.extendedProps || {}),
        description: description || "",
      },
    };

    onSave(updatedEvent as EventApi);
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
      <label className={styles.titleInput}>
        <input
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errorMessage) setErrorMessage("");
          }}
          placeholder="일정 추가하기"
          required
        />
      </label>
      <div className={styles.dateInputWrapper}>
        <DatePicker
          selected={start}
          onChange={(date: Date | null) => {
            setStart(date);
            setIsStartOpen(false);
            if (errorMessage) setErrorMessage("");
          }}
          open={isStartOpen}
          preventOpenOnFocus={true}
          onClickOutside={() => setIsStartOpen(false)}
          onInputClick={() => setIsStartOpen(false)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="TIME"
          dateFormat="yyyy.MM.dd HH:mm"
          placeholderText="시작일"
          locale={ko}
          className={styles.datepickerInput}
          wrapperClassName={styles.datepickerWrapper}
          calendarClassName="event-form-calendar"
          required
          renderCustomHeader={(props) => <DatePickerCustomHeader {...props} />}
          shouldCloseOnSelect={true}
          ref={startDatePickerRef}
        >
          <div className={styles.datepickerFooter}>
            <button
              className={styles.todayBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setStart(new Date());
                setIsStartOpen(false);
              }}
            >
              오늘
            </button>
          </div>
        </DatePicker>
        <button
          type="button"
          className={styles.calendarIconBtn}
          onClick={() => setIsStartOpen(!isStartOpen)}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>
      <div className={styles.dateInputWrapper}>
        <DatePicker
          selected={end}
          onChange={(date: Date | null) => {
            setEnd(date);
            setIsEndOpen(false);
          }}
          open={isEndOpen}
          preventOpenOnFocus={true}
          onClickOutside={() => setIsEndOpen(false)}
          onInputClick={() => setIsEndOpen(false)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="TIME"
          dateFormat="yyyy.MM.dd HH:mm"
          placeholderText="종료일"
          locale={ko}
          minDate={start ?? undefined}
          className={styles.datepickerInput}
          wrapperClassName={styles.datepickerWrapper}
          calendarClassName="event-form-calendar"
          renderCustomHeader={(props) => (
            <DatePickerCustomHeader {...props} withBorder />
          )}
          shouldCloseOnSelect={true}
          ref={endDatePickerRef}
        >
          <div className={styles.datepickerFooter}>
            <button
              className={styles.todayBtn}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setEnd(new Date());
                setIsEndOpen(false);
              }}
            >
              오늘
            </button>
          </div>
        </DatePicker>
        <button
          type="button"
          className={styles.calendarIconBtn}
          onClick={() => setIsEndOpen(!isEndOpen)}
        >
          <FontAwesomeIcon icon={faCalendar} />
        </button>
      </div>
      <label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="설명 추가"
        />
      </label>
      <EventActions
        isEditing={true}
        onSave={handleSubmit}
        onDelete={() => onDelete(event?.id)}
        onEdit={() => {}}
      />
    </form>
  );
};

export default EventForm;
