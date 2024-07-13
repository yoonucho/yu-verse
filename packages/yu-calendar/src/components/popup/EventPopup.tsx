import { EventApi } from "@fullcalendar/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { EventType } from "@/types.d";
import useEventStore from "@/stores/useEventStore";
import EventForm from "./EventForm";
import EventViewer from "./EventViewer";
import styles from "./event-popup.module.css";

type EventPopupProps = {
	event: EventType | null;
	onSave: (event: EventApi) => void;
	onDelete: (eventId: string) => void;
	closePopup: () => void;
	position: { x: number; y: number };
};

const EventPopup: React.FC<EventPopupProps> = ({ event, onSave, onDelete, closePopup, position }) => {
	const popupStyle = {
		top: `${position.y}px`,
		left: `${position.x}px`,
	};

	const { isEditing, setIsEditing } = useEventStore();
	return (
		<>
			<div className={styles.popup} style={popupStyle}>
				<div className={styles.popupContent}>
					<button className={styles.close} onClick={closePopup}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					{isEditing ? (
						<EventForm event={event} onSave={onSave} onDelete={id => onDelete(id)} />
					) : (
						event && <EventViewer event={event} onEdit={() => setIsEditing(true)} onDelete={() => onDelete(event.id)} />
					)}
				</div>
			</div>
		</>
	);
};

export default EventPopup;
