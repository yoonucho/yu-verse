import styles from "@/styles/total-count.module.css";

export default function HolidayTotalCount({ count, onShowDetails }) {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				공휴일 개수는 &nbsp;
				{count > 0 ? (
					<button className={styles.countBtn} onClick={onShowDetails}>
						총 {count}일
					</button>
				) : (
					<code className={styles.code}>총 {count}일</code>
				)}
				&nbsp; 입니다.
			</p>
		</div>
	);
}
