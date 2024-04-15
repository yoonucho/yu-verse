import MainCalendar from "@/components/MainCalendar";

export const metadata = {
	title: "Home",
};

export default async function HomePage() {
	return (
		<>
			<MainCalendar />
		</>
	);
}
