import { create } from "zustand";
import { HoliDayDates } from "@/app/api/holidayAPI";
import { EventApi } from "@fullcalendar/core";

export type EventType = EventApi | HoliDayDates;

type EventState = {
	events?: EventType[];
	selectedEvent?: EventType | null;
	selectedDate?: string | null;
	isEditing?: boolean;
	addEvent: (newEvent: EventType) => void;
	updateEvent: (updatedEvent: EventType) => void;
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
	addEvent: (newEvent: EventType) => set(state => ({ events: [...state.events, newEvent] })),
	updateEvent: (updatedEvent: EventType) => set(state => ({ events: state.events.map(event => (event.id === updatedEvent.id ? updatedEvent : event)) })),
	deleteEvent: (eventId: string) => set(state => ({ events: state.events.filter(event => event.id !== eventId) })),
	setEvents: updater => set(state => ({ events: updater(state.events) })),
	setSelectedEvent: event => set({ selectedEvent: event }),
	setSelectedDate: date => set({ selectedDate: date }),
	setIsEditing: isEditing => set({ isEditing }),
}));

export default useEventStore;
