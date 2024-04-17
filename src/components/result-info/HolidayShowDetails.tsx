import styles from "@/styles/show-detail.module.css";

export default function HolidayShowDetails({ holidays, message }) {
	if (message) {
		return <p>{message}</p>;
	}
	return (
		<ul>
			{holidays.map(holiday => (
				<li key={holiday.id}>
					{holiday.title} on {holiday.start} {holiday.dayOfWeek}
				</li>
			))}
		</ul>
	);
}
