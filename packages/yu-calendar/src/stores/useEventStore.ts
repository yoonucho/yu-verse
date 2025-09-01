import { create } from "zustand";
import { EventApi } from "@fullcalendar/core";
import { v4 as uuidv4 } from "uuid";
import { EventState, ExtendedEventApi } from "@/types.d";
import {
  fetchEventsFromSupabase,
  addEventToSupabase,
  updateEventToSupabase,
  deleteEventFromSupabase,
} from "@/actions/supabaseEventsActions";
import { toInsertPayload, toUpdatePayload, fromRowToEvent } from "@/utils/eventMapping";

const useEventStore = create<EventState>((set) => ({
  events: [],
  selectedEvent: null,
  selectedDate: null,
  isEditing: false,
  addEvent: async (event) => {
    try {
      const newEvent: ExtendedEventApi = {
        ...event,
        id: uuidv4(),
        extendedProps: {
          ...event.extendedProps,
          description: event.extendedProps?.description || "",
        },
      };
      // Map to DB insert shape to satisfy typing
      const insertPayload = toInsertPayload(newEvent);
      await addEventToSupabase(insertPayload);
      set((state) => ({ events: [...state.events, newEvent] }));
    } catch (error) {
      console.error("Error adding event:", error);
    }
  },
  updateEvent: async (event) => {
    try {
      // Map to DB update shape to satisfy typing
      const updatePayload = toUpdatePayload(event);
      await updateEventToSupabase(updatePayload);
      set((state) => ({
        events: state.events.map((e) => (e.id === event.id ? event : e)),
      }));
    } catch (error) {
      console.error("Error updating event:", error);
    }
  },
  deleteEvent: async (eventId) => {
    try {
      await deleteEventFromSupabase(eventId);
      set((state) => ({
        events: state.events.filter((e) => e.id !== eventId),
      }));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  },
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  setEvents: (updater) =>
    set((state) => {
      const updatedEvents = updater(state.events || []);
      return { events: updatedEvents } as Partial<EventState>;
    }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setIsEditing: (isEditing) => set({ isEditing }),
  fetchEvents: async (setIsLoading) => {
    setIsLoading(true);
    const data = await fetchEventsFromSupabase();
    set((state) => {
      const newEvents = data.map((event) => fromRowToEvent(event));
      const existingEventIds = new Set(state.events.map((event) => event.id));
      const uniqueEvents = [
        ...state.events,
        ...newEvents.filter((event) => !existingEventIds.has(event.id)),
      ];
      return { events: uniqueEvents };
    });
    setIsLoading(false);
  },
  // fetchEvents: setIsLoading => {
  // 	setIsLoading(true);
  // 	fetchEventsFromSupabase().then(events => {
  // 		set(state => ({ events: [...state.events, ...events] }));
  // 		setIsLoading(false);
  // 	});
  // },
}));

export default useEventStore;
