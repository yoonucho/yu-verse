import moment from "moment";
import "moment/locale/ko";
import { API_URL } from "../constants";

moment.locale("ko");

export const formatDate = (date: string) => {
	return moment(date).format("YYYY-MM-DD");
};

const getYear = moment().format("YYYY");

export default async function getFetchHolidays() {
	// await new Promise(resolve => setTimeout(resolve, 10000));
	const response = await fetch(`${API_URL}/${getYear}/KR`);
	const data = await response.json();
	return data.map((holiday: any, index: number) => ({
		id: index,
		title: holiday.localName,
		start: formatDate(holiday.date),
		resourceId: index + 1,
	}));
}
