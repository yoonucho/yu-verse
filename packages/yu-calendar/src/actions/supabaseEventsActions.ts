"use server";

import { startOfDay, endOfDay, format } from "date-fns";
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

	// 시작일과 종료일을 date-fns 라이브러리로 처리
	const startOfDayDate = startOfDay(new Date(startDate));
	const endOfDayDate = endOfDay(new Date(endDate));

	// 날짜를 ISO 문자열로 변환
	const startISODateStr = format(startOfDayDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
	const endISODateStr = format(endOfDayDate, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

	console.log("startDate:", startISODateStr);
	console.log("endDate:", endISODateStr);

	const { data, error } = await supabase
		.from("yu_calendar")
		.select("*")
		.gte("start", startDate)
		.lte("start", endISODateStr)
		.or(`end.is.null,end.gte.${startISODateStr},end.lte.${endISODateStr}`)
		.order("start", { ascending: true });

	if (error) {
		console.error("이벤트를 가져오는 중 오류 발생:", error);
		throw new Error("이벤트를 가져오는 중 오류가 발생했습니다.");
	}

	console.log("Fetched events:", data);
	return data as YuCalendarRow[];
};
