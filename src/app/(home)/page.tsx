import { Suspense, lazy } from "react";
import Loading from "@/components/icons/LoadingIcon";
import HairIcon from "@/components/icons/HairIcon";
// import getFetchHolidays from "@/app/api/holidayAPI";
// import MainCalendar from "@/components/home/MainCalendar";
import SearchEventsDay from "@/components/home/SearchEventsDay";

export const metadata = {
	title: "Home",
};

const MainCalendar = lazy(() => import("@/components/home/MainCalendar"));

export default async function HomePage() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<SearchEventsDay />
				<MainCalendar />
				<HairIcon />
			</Suspense>
		</>
	);
}

export const runtime = "edge";
