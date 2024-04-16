import { Suspense } from "react";
import Loading from "@/app/loading";
import getFetchHolidays from "@/app/api/holidayAPI";
import MainCalendar from "@/components/home/MainCalendar";
import SearchEventsDay from "@/components/home/SearchEventsDay";

export const metadata = {
	title: "Home",
};

export default async function HomePage() {
	const holidays = await getFetchHolidays();
	return (
		<>
			<SearchEventsDay />
			<Suspense fallback={<Loading />}>
				<MainCalendar events={holidays} />
			</Suspense>
		</>
	);
}
