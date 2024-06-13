import { formatISO, format, getYear, parseISO } from "date-fns";
import { ko } from "date-fns/locale";
import { API_URL } from "../constants";

export const formatDate = (date: string) => {
	return formatISO(new Date(date), { representation: "date" });
};

type Holiday = {
	date?: string;
	localName?: string;
};

export type HoliDayDates = Holiday & {
	id?: string;
	title: string;
	start?: string;
	resourceId?: string;
	dayOfWeek?: string;
};

const getFetchHolidays = async (year: number = getYear(new Date())): Promise<HoliDayDates[]> => {
	const response = await fetch(`${API_URL}/${year}/KR`);
	if (!response.ok) {
		throw new Error("응답 실패");
	}
	// await new Promise(resolve => setTimeout(resolve, 100000));
	const data: Holiday[] = await response.json();
	return data.map((holiday, index) => ({
		...holiday,
		id: index.toString(),
		title: holiday.localName,
		start: formatDate(holiday.date),
		resourceId: index.toString(),
		dayOfWeek: format(parseISO(holiday.date), "EEEE", { locale: ko }),
	}));
};

export default getFetchHolidays;
