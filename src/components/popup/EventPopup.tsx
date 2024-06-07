import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faClock } from "@fortawesome/free-solid-svg-icons";

import styles from "./event-popup.module.css";

type EventPopupProps = {
	event: {
		title?: string;
		startStr?: string;
		endStr?: string;
		extendedProps?: {
			dayOfWeek?: string;
		};
	};
	closePopup: () => void;
	position: { x: number; y: number };
};

const EventPopup: React.FC<EventPopupProps> = ({ event, closePopup, position }) => {
	const popupStyle = {
		top: `${position.y}px`,
		left: `${position.x}px`,
	};
	return (
		<>
			<div className={styles.popup} style={popupStyle}>
				<div className={styles.popupContent}>
					<button className={styles.close} onClick={closePopup}>
						<FontAwesomeIcon icon={faXmark} />
					</button>
					<h2 className={styles.title}>{event.title}</h2>
					<p className={styles.time}>
						{event.startStr ? (
							<>
								<span>
									<FontAwesomeIcon icon={faClock} style={{ color: "var(--primary-color)" }} />
								</span>

								<span>{event.startStr}</span>
								<span>{event.extendedProps.dayOfWeek}</span>
							</>
						) : (
							""
						)}
					</p>
					<p className={styles.time}>
						{event.endStr && (
							<>
								<span>
									<FontAwesomeIcon icon={faClock} style={{ color: "var(--primary-color)" }} />
									{event.startStr}
								</span>
								<span>{event.extendedProps.dayOfWeek}</span>
							</>
						)}
					</p>
				</div>
			</div>
		</>
	);
};

export default EventPopup;
