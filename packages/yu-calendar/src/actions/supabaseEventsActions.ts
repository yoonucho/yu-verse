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

// 이벤트 시작일 종료일로 필터링 후 가져오는 함수
export const fetchEventsByDateRange = async (startDate: string, endDate: string): Promise<YuCalendarRow[]> => {
	const supabase = createServerSupabaseClient();
	const { data, error } = await supabase.from("yu_calendar").select("*").gte("start", startDate).lte("end", endDate).order("start", { ascending: true });
	console.log("fetch", data);
	if (error) {
		console.error("이벤트를 가져오는 중 오류 발생:", error);
		throw new Error("이벤트를 가져오는 중 오류가 발생했습니다.");
	}

	return data as YuCalendarRow[];
};
