import styles from "@/styles/total-count.module.css";

export default function HolidayTotalCount({ count, onShowDetails }) {
	return (
		<div>
			<p className={styles.text}>
				공휴일 개수는 <code>총 {count}일</code> 입니다.
			</p>
			<button className={styles.showDetailBtn} onClick={onShowDetails}>
				자세히 보기
			</button>
		</div>
	);
}
