import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { EventType, HolidayDates } from '@/types.d';
import EventActions from './EventActions';
import styles from './event-viewer.module.css';

type EventViewerProps = {
	event: EventType | any;
	onEdit: () => void;
	onDelete: (eventId: string) => void;
};

const EventViewer: React.FC<EventViewerProps> = ({ event, onEdit, onDelete }) => {
	const isHoliday = (event: any): event is HolidayDates => {
		// 공휴일인지 확인 하는 함수
		return event.extendedProps?.types?.[0] === 'Public';
	};

	const formatDateForInput = (date: Date) => {
		if (isHoliday(event)) {
			return format(date, 'yyyy년 MM월 dd일', { locale: ko });
		} else {
			return format(date, 'yyyy년 MM월 dd일 a HH:mm', { locale: ko });
		}
	};

	return (
		<div className={styles.viewer}>
			<h2 className={`${styles.title} ellipsis`}>{event.title}</h2>
			<p className={styles.time}>
				{event.startStr && (
					<>
						<span>
							<FontAwesomeIcon icon={faClock} style={{ color: 'var(--primary-color)' }} />
						</span>
						<span>{formatDateForInput(new Date(event.startStr))}</span>
						<span>{event.extendedProps?.dayOfWeek}</span>
					</>
				)}
			</p>
			<p className={styles.time}>
				{event.endStr && (
					<>
						<span>
							<FontAwesomeIcon icon={faClock} style={{ color: 'var(--primary-color)' }} />
							{formatDateForInput(new Date(event.endStr))}
						</span>
						<span>{event.extendedProps?.dayOfWeek}</span>
					</>
				)}
			</p>
			{event.extendedProps?.description && <p className={styles.description}>{event.extendedProps.description}</p>}
			{!isHoliday(event) && <EventActions isEditing={false} onSave={() => {}} onDelete={() => onDelete(event.id)} onEdit={onEdit} />}
		</div>
	);
};

export default EventViewer;
