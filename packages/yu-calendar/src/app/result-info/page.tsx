import GoBack from '@/components/header/GoBack';
import { fetchEventsByDateRange } from '@/actions/supabaseEventsActions';
import ClientLoadingComponent from '@/components/ClientLoadingComponent';
import HolidayProvider from '@/components/result-info/HolidayProvider';
import HolidayTotalCount from '@/components/result-info/HolidayTotalCount';
import HolidayAndEventComponent from '@/components/HolidayAndEventComponent';
import styles from './page.module.css';

export type ResultInfoProps = {
	searchParams: {
		startDate: string;
		endDate: string;
	};
};

const ResultInfo = async ({ searchParams }: ResultInfoProps) => {
	const startDateParam = searchParams.startDate;
	const endDateParam = searchParams.endDate;

	if (!startDateParam || !endDateParam) {
		return <p>날짜를 선택해주세요.</p>;
	}

	// 서버 액션을 통해 이벤트 데이터를 가져옵니다.
	const personalEvent = await fetchEventsByDateRange(startDateParam, endDateParam);

	console.log('personalEvent:', personalEvent);
	return (
		<HolidayProvider>
			<GoBack isOpen={true} />
			<div className={styles.container}>
				<ClientLoadingComponent>
					<div className={styles.inner}>
						<h1> 결과 페이지</h1>
						<HolidayTotalCount />
						<div>
							<HolidayAndEventComponent events={personalEvent} />
						</div>
					</div>
				</ClientLoadingComponent>
			</div>
		</HolidayProvider>
	);
};

export default ResultInfo;
