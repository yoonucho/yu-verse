import supabase from "@/lib/supabaseClient";
import { PersonalEvent } from "@/types.d";

export const supabaseFetchEvents = async (
	year: number, 
	month: number
): Promise<PersonalEvent[]> => {
	const startDate = new Date(year, month - 1, 1).toISOString();
	const endDate = new Date(year, month, 0, 23, 59, 59).toISOString();

	const { data, error } = await supabase
	.from("yu_calendar")
	.select("*")
	.gte("start", startDate)
	.lte("end", endDate)
	.order("start", { ascending: true });
	
	if (error) {
		console.error("Error fetching events:", error);
		return [];
	}

	return data as PersonalEvent[];
};