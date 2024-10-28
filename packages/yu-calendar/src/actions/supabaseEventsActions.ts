"use server";

import createServerSupabaseClient from "@/lib/supabaseServer";
import { Database } from "../../types_db";

export type YuCalendarRow = Database["public"]["Tables"]["yu_calendar"]["Row"];
export type YuCalendarRowInsert = Database["public"]["Tables"]["yu_calendar"]["Insert"];
export type YuCalendarRowUpdate = Database["public"]["Tables"]["yu_calendar"]["Update"];

export const fetchEventsFromSupabase = async (): Promise<YuCalendarRow[]> => {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase.from("yu_calendar").select("*");
	console.log("fetch", data);
	if (error) {
		console.error("error", error);
		return [];
	}

	return data;
};

export const addEventToSupabase = async (event: YuCalendarRowInsert): Promise<void> => {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase.from("yu_calendar").insert([event]);
	console.log("add", event);
	if (error) {
		console.error("error", error);
		return;
	}
	return data;
};

export const updateEventToSupabase = async (event: YuCalendarRowUpdate): Promise<void> => {
	const supabase = await createServerSupabaseClient();

	const { data, error } = await supabase
		.from("yu_calendar")
		.update({
			...event,
			start: event.start,
			end: event.end,
		})
		.eq("id", event.id);
	console.log("update", event);

	if (error) {
		console.error("error", error);
		return;
	}
	return data;
};

export const deleteEventFromSupabase = async (eventId: string): Promise<void> => {
	const supabase = await createServerSupabaseClient();
	const { data, error } = await supabase.from("yu_calendar").delete().eq("id", eventId);

	if (error) {
		console.error("error", error);
		return;
	}

	return data;
};
