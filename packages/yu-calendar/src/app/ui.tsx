"use client";

import Header from "@/components/header/Header";
import MainCalendar from "@/components/home/MainCalendar";
import Logo from "@/components/Logo";

const UI: React.FC = () => {
	return (
		<>
			<Logo />
			<Header />
			<MainCalendar />
		</>
	);
};

export default UI;
