import React, { useState, useEffect } from "react";
import { EventType } from "@/stores/useEventStore";
import styles from "./event-form.module.css";
import EventActions from './EventActions';

type EventFormProps = {
	event: any | null;
	onSave: (event: EventType) => void;
	onDelete: (eventId: string) => void;
	
};

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onDelete }) => {
	const [title, setTitle] = useState(event?.title || "");
	const [start, setStart] = useState(event?.start || "");
	const [end, setEnd] = useState(event?.end || "");
	const [dayOfWeek, setDayOfWeek] = useState(event?.extendedProps?.dayOfWeek || "");

	useEffect(() => {
		if (event) {
			setTitle(event.title || "");
			setStart(event.start || "");
			setEnd(event.end || "");
			setDayOfWeek(event.extendedProps?.dayOfWeek || "");
		}
	}, [event]);

	const handleSubmit = () => {
		const updatedEvent = {
			...event,
			title,
			start,
			end,
			extendedProps: { dayOfWeek },
		};
		onSave(updatedEvent);
	};

	return (
		<div className={styles.form}>
			<h2>{event ? "Edit Event" : "Add Event"}</h2>
			<label>
				Title:
				<input type="text" value={title} onChange={e => setTitle(e.target.value)} />
			</label>
			<label>
				Start:
				<input type="datetime-local" value={start} onChange={e => setStart(e.target.value)} />
			</label>
			<label>
				End:
				<input type="datetime-local" value={end} onChange={e => setEnd(e.target.value)} />
			</label>
			<label>
				Day of Week:
				<input type="text" value={dayOfWeek} onChange={e => setDayOfWeek(e.target.value)} />
			</label>
			<EventActions isEditing={true} onSave={handleSubmit} onDelete={() => onDelete(event?.id || "")} onEdit={() => {}} />
		</div>
	);
};

export default EventForm;
