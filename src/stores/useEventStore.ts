import { create } from "zustand";
import { EventApi } from "@fullcalendar/core";
import { v4 as uuidv4 } from "uuid";
import { HoliDayDates } from "@/app/api/holidayAPI";

export type EventType = EventApi | HoliDayDates;

type EventState = {
	events?: EventType[];
	selectedEvent?: EventType | null;
	selectedDate?: string | null;
	isEditing?: boolean;
	addEvent: (event: EventApi) => void;
	updateEvent: (event: EventApi) => void;
	deleteEvent: (eventId: string) => void;
	setEvents: (updater: (events: EventType[]) => EventType[]) => void;
	setSelectedEvent: (event: EventType | null) => void;
	setSelectedDate: (date: string) => void;
	setIsEditing: (isEditing: boolean) => void;
};

const useEventStore = create<EventState>(set => ({
	events: [],
	selectedEvent: null,
	selectedDate: null,
	isEditing: false,
	addEvent: event =>
		set(state => {
			const newEvent: EventApi = { ...event, id: uuidv4() };
			// console.log("Adding new event", newEvent); // 디버깅용 콘솔 로그
			return { events: [...state.events, newEvent] } as Partial<EventState>;
		}),
	updateEvent: event =>
		set(state => {
			const updatedEvents = state.events.map(e => (e.id === event.id ? event : e));
			// console.log("Updating event", event); // 디버깅용 콘솔 로그
			// console.log("Updated events", updatedEvents); // 디버깅용 콘솔 로그
			return { events: updatedEvents } as Partial<EventState>;
		}),
	deleteEvent: eventId =>
		set(state => {
			const filteredEvents = state.events.filter(e => e.id !== eventId);
			// console.log("Deleting event", eventId, typeof eventId); // 디버깅용 콘솔 로그
			// console.log("Remaining events", filteredEvents); // 디버깅용 콘솔 로그
			return { events: filteredEvents } as Partial<EventState>;
		}),
	setSelectedEvent: event => set({ selectedEvent: event }),
	setEvents: updater =>
		set(state => {
			const updatedEvents = updater(state.events || []);
			return { events: updatedEvents } as Partial<EventState>;
		}),
	setSelectedDate: date => set({ selectedDate: date }),
	setIsEditing: isEditing => set({ isEditing }),
}));

export default useEventStore;
