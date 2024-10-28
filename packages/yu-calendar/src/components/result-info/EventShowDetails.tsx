import styles from "./show-detail.module.css";

type EventShowDetailsProps = {
	events: {
		id: string;
		title?: string;
		start?: Date;
		end?: Date;
		extendedProps?: { description: string };
	}[];
};

const EventShowDetails: React.FC<EventShowDetailsProps> = ({ events }) => {
	return (
		<div className={styles.container}>
			{events.map((event: any, index: number) => (
				<div key={`${event.title}-${event.start}`} className={styles.eventItem}>
					<div className={styles.eventNumber}>
						<span>{index + 1}</span>
					</div>
					<div className={styles.eventDate}>
						<span>{event.start}</span>
					</div>
					<div className={styles.barInner}>
						<span className={styles.bar}></span>
					</div>
					<div className={styles.title}>
						<span>{event.title}</span>
					</div>
					<div className={styles.description}>{event.extendedProps?.description && <p className={styles.description}>{event.extendedProps.description}</p>}</div>
				</div>
			))}
		</div>
	);
};

export default EventShowDetails;
