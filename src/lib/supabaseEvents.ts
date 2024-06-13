import { supabase } from "./supabaseClient";
import { EventApi } from "@fullcalendar/core";

export const fetchEventsFromSupabase = async (): Promise<EventApi[]> => {
	const { data, error } = await supabase.from("yu_calendar").select("*");

	if (error) {
		console.error("error", error);
		return [];
	}
	return data || [];
};

export const addEventToSupabase = async (event: EventApi): Promise<void> => {
	const { error } = await supabase.from("yu_calendar").insert([event]);

	if (error) {
		console.error("error", error);
		return;
	}
};

export const updateEventToSupabase = async (event: EventApi): Promise<void> => {
	const { error } = await supabase.from("yu_calendar").update(event).eq("id", event.id);

	if (error) {
		console.error("error", error);
		return;
	}
};

export const deleteEventFromSupabase = async (eventId: string): Promise<void> => {
	const { error } = await supabase.from("yu_calendar").delete().eq("id", eventId);

	if (error) {
		console.error("error", error);
		return;
	}
};
