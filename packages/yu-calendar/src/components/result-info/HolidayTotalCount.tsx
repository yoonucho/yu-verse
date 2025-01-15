'use client';

import useHolidayStore from '@/stores/useHolidayStore';
import styles from './total-count.module.css';

const HolidayTotalCount = () => {
	const holidays = useHolidayStore(state => state.holidays);
	return (
		<div className={styles.container}>
			<p className={styles.text}>
				공휴일은 &nbsp;
				<code className={styles.code}>총 {holidays.length}일</code>
				&nbsp; 입니다.
			</p>
		</div>
	);
};

export default HolidayTotalCount;
