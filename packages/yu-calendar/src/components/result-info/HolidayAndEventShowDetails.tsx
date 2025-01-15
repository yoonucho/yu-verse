import styles from "./show-detail.module.css";

type HolidayAndEventShowDetailsProps = {
	events: {
		id: string;
		title: string;
		start: string;
		end: string;
		dayOfWeek?: string;
		extendedProps?: { description: string };
	}[];
};

const HolidayAndEventShowDetails: React.FC<HolidayAndEventShowDetailsProps> = ({ events }) => {
	return (
		<div className={styles.container}>
			{events.map((event: any, index: number) => (
				<div key={`${event.title}-${event.start}`} className={styles.eventItem}>
					<div className={styles.eventNumber}>
						<span>{index + 1}</span>
					</div>
					<div className={styles.eventDate}>
						<span>{event.start}</span>
						{event.dayOfWeek && <span className={styles.week}>{event.dayOfWeek}</span>}
					</div>
					<div className={styles.barInner}>
						<span className={styles.bar}></span>
					</div>
					<div className={styles.title}>
						<span>{event.title}</span>
					</div>
					{event.extendedProps?.description && (
						<div className={styles.description}>
							<span>{event.extendedProps.description}</span>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default HolidayAndEventShowDetails;
