import styles from "./total-count.module.css";

type HolidayTotalCountProps = {
	count: number;
};

const HolidayTotalCount: React.FC<HolidayTotalCountProps> = ({ count }) => {
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				공휴일은 &nbsp;
				<code className={styles.code}>총 {count}일</code>
				&nbsp; 입니다.
			</p>
		</div>
	);
};

export default HolidayTotalCount;
