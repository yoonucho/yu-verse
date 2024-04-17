import { formatISO, format, getYear, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { API_URL } from "../constants";

export const formatDate = (date: string) => {
	return formatISO(new Date(date), { representation: "date" });
};

// const currentYear = getYear(new Date());

export default async function getFetchHolidays(year = getYear(new Date())) {
	// await new Promise(resolve => setTimeout(resolve, 100000));
	const response = await fetch(`${API_URL}/${year}/KR`);
	const data = await response.json();
	return data.map((holiday: any, index: number) => ({
		id: index,
		title: holiday.localName,
		start: formatDate(holiday.date),
		resourceId: index + 1,
		dayOfWeek: format(parseISO(holiday.date), "EEEE", { locale: ko }),
		// localName: holiday.localName,
		// date: formatDate(holiday.date),
		// dayOfWeek: string,
	}));
}
