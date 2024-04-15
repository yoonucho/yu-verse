import { format, getYear } from "date-fns";
import { ko } from "date-fns/locale";
import { API_URL } from "../constants";

export const formatDate = (date: string) => {
	return format(new Date(date), "yyyy-MM-dd", { locale: ko });
};

const currentYear = getYear(new Date());

export default async function getFetchHolidays() {
	// await new Promise(resolve => setTimeout(resolve, 10000));
	const response = await fetch(`${API_URL}/${currentYear}/KR`);
	const data = await response.json();
	return data.map((holiday: any, index: number) => ({
		id: index,
		title: holiday.localName,
		start: formatDate(holiday.date),
		resourceId: index + 1,
	}));
}
