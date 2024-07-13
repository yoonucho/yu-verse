export type EventType = EventApi | HoliDayDates;

// 공휴일
type Holiday = {
	date?: string;
	localName?: string;
};

export type HoliDayDates = Holiday & {
	id?: string;
	title: string;
	start?: string;
	resourceId?: string;
	dayOfWeek?: string;
};

// 이외 이벤트
export type EventState = {
	events?: EventApi[];
	selectedEvent?: EventType | null;
	selectedDate?: string | null;
	isEditing?: boolean;
	addEvent: (event: EventApi) => void;
	updateEvent: (event: EventApi) => void;
	deleteEvent: (eventId: string) => void;
	setEvents: (updater: (events: EventApi[]) => EventApi[]) => void;
	setSelectedEvent: (event: EventType | null) => void;
	setSelectedDate: (date: string) => void;
	setIsEditing: (isEditing: boolean) => void;
	fetchEvents: (setIsLoading: (isLoading: boolean) => void) => void;
};
