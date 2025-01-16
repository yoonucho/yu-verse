export type EventType = EventApi | HolidayDates;

// 공휴일
export type Holiday = {
	date?: string;
	localName?: string;
};

export type HolidayDates = Holiday & {
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

// 직접 생성한 이벤트 
export type PersonalEvent = {
	id: string;
	title: string;
	start: string;
	end: string;
	description?: Dictionary<string>;
};

// FullCalendar의 이벤트 타입 확장
export type ExtendedEventApi = EventApi & {
	extendedProps: Dictionary<string>;
};
