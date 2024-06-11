import { EventType } from "@/stores/useEventStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import EventActions from "./EventActions";
import styles from "./event-viewer.module.css";

type EventViewerProps = {
	event: any | null;
	onEdit: (event: EventType) => void;
	onDelete: (eventId: string) => void;
};

const EventViewer: React.FC<EventViewerProps> = ({ event, onEdit, onDelete }) => {
	return (
		<div className={styles.viewer}>
			<h2 className={styles.title}>{event.title}</h2>
			<p className={styles.time}>
				{event.startStr && (
					<>
						<span>
							<FontAwesomeIcon icon={faClock} style={{ color: "var(--primary-color)" }} />
						</span>
						<span>{event.startStr}</span>
						<span>{event.extendedProps?.dayOfWeek}</span>
					</>
				)}
			</p>
			<p className={styles.time}>
				{event.endStr && (
					<>
						<span>
							<FontAwesomeIcon icon={faClock} style={{ color: "var(--primary-color)" }} />
							{event.endStr}
						</span>
						<span>{event.extendedProps?.dayOfWeek}</span>
					</>
				)}
			</p>
			<EventActions isEditing={false} onSave={() => {}} onDelete={() => onDelete(event.id || "")} onEdit={onEdit} />
		</div>
	);
};

export default EventViewer;
