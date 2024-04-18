import { formatISO, format, getYear, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { API_URL } from "../constants";

export const formatDate = (date: string) => {
	return formatISO(new Date(date), { representation: "date" });
};

// const currentYear = getYear(new Date());

// export default async function getFetchHolidays(year = getYear(new Date())) {
// 	// await new Promise(resolve => setTimeout(resolve, 100000));
// 	const response = await fetch(`${API_URL}/${year}/KR`);
// 	const data = await response.json();
// 	return data.map((holiday: any, index: number) => ({
// 		id: index,
// 		title: holiday.localName,
// 		start: formatDate(holiday.date),
// 		resourceId: index + 1,
// 		dayOfWeek: format(parseISO(holiday.date), "EEEE", { locale: ko }),
// 	}));
// }

export default async function getFetchHolidays(from?: string, to?: string) {
	const startYear = from ? new Date(from).getFullYear() : new Date().getFullYear();
	const endYear = to ? new Date(to).getFullYear() : new Date().getFullYear();
	let allHolidays = [];

	for (let year = startYear; year <= endYear; year++) {
		const response = await fetch(`${API_URL}/${year}/KR`);
		const data = await response.json();
		const holidaysForYear = data.map((holiday: any, index: number) => ({
			id: index,
			title: holiday.localName,
			start: formatDate(holiday.date),
			resourceId: index + 1,
			dayOfWeek: format(parseISO(holiday.date), "EEEE", { locale: ko }),
		}));
		allHolidays = allHolidays.concat(holidaysForYear);
	}

	return allHolidays;
}
