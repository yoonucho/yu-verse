"use client";
import Header from "../header/Header";
import MainCalendar from "./MainCalendar";
import Logo from "../Logo";

const Main: React.FC= () => {
	return (
		<>
			<Logo />
			<Header />
			<MainCalendar />
		</>
	);
}

export default Main;
