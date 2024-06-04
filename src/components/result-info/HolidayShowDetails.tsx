import styles from "@/styles/show-detail.module.css";

type HolidayShowDetailsProps = {
	holidays: { title?: string; start?: string; dayOfWeek?: string }[];
};

const HolidayShowDetails: React.FC<HolidayShowDetailsProps> = ({ holidays }) => {
	return (
		<div className={styles.container}>
			{holidays.map((holiday: any, index: number) => (
				<div key={`${holiday.title}-${holiday.start}`} className={styles.eventItem}>
					<div className={styles.holidayNumber}>
						<span>{index + 1}</span>
					</div>
					<div className={styles.holidayDate}>
						<span>{holiday.start}</span>
						<span className={styles.week}>{holiday.dayOfWeek}</span>
					</div>
					<div className={styles.barInner}>
						<span className={styles.bar}></span>
					</div>
					<div className={styles.title}>
						<span>{holiday.title}</span>
					</div>
				</div>
			))}
		</div>
	);
};

export default HolidayShowDetails;
