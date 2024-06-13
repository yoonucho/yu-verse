import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import {v4 as uuidv4} from 'uuid';
import { EventType } from "@/stores/useEventStore";
import { EventApi } from '@fullcalendar/core';
import { HoliDayDates } from '@/app/api/holidayAPI';
import styles from "./event-form.module.css";
import EventActions from "./EventActions";

type EventFormProps = {
	event: EventType | any;
	onSave: (event: EventApi) => void;
	onDelete: (eventId: string) => void;
};

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onDelete }) => {
	const formatDateForInput = (date: Date) => {
		const pad = (num: number) => (num < 10 ? `0${num}` : num);
		return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
	};
	const [title, setTitle] = useState(event?.title || "");
	const [start, setStart] = useState(event?.start ? formatDateForInput(new Date(event.start)) : "");
	const [end, setEnd] = useState(event?.end ? formatDateForInput(new Date(event.end)) : "");
	const [description, setDescription] = useState(event?.extendedProps?.description || "");

	useEffect(() => {
		if (event?.start) {
			setStart(formatDateForInput(new Date(event.start)));
		}
		if (event?.end) {
			setEnd(formatDateForInput(new Date(event.end)));
		}
		if (event?.extendedProps?.description) {
			setDescription(event.extendedProps.description);
		}
	}, [event]);

	const handleSubmit = () => {
		const updatedEvent = {
			...event,
			title,
			id: uuidv4(),
			start,
			end,
			extendedProps: { ...event?.extendedProps, description },
		};
		onSave(updatedEvent);
	};

	return (
		<div className={styles.form}>
			{/* <h2>{event ? "수정하기" : "추가하기"}</h2> */}
			<label>
				<input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="일정 추가하기" />
			</label>
			<label>
				{/* <span>
					<FontAwesomeIcon icon={faClock} style={{ color: "var(--primary-color)" }} />
				</span> */}
				<input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} placeholder="시작일" />
			</label>
			<label>
				{/* <span>
					<FontAwesomeIcon icon={faClock} style={{ color: "var(--primary-color)" }} />
				</span> */}
				<input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} placeholder="종료일" />
			</label>
			<label>
				<textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="설명 추가" />
			</label>
			<EventActions isEditing={true} onSave={handleSubmit} onDelete={() => onDelete(event?.id)} onEdit={() => {}} />
		</div>
	);
};

export default EventForm;
