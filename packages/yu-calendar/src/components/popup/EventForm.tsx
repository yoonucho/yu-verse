import React, { useState, useEffect } from "react";
import { EventApi } from "@fullcalendar/core";
import { v4 as uuidv4 } from "uuid";
import { EventType } from "@/types.d";
import EventActions from "./EventActions";
import styles from "./event-form.module.css";

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
		if (!title || !start) {
			alert("제목과 시작일은 필수 입력사항입니다.");
			return;
		}
		const updatedEvent: Partial<EventApi> = {
			id: event?.id || uuidv4(),
			title,
			start: new Date(start),
			end: end ? new Date(end) : null,
			extendedProps: { description: description || "" },
		};

		onSave(JSON.parse(JSON.stringify(updatedEvent))); // 순환 참조를 제거
	};

	return (
		<div className={styles.form}>
			<label>
				<input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="일정 추가하기" required />
			</label>
			<label>
				{/* <span>
					<FontAwesomeIcon icon={faClock} style={{ color: "var(--primary-color)" }} />
				</span> */}
				<input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} placeholder="시작일" required />
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
