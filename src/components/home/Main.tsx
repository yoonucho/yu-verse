"use client";
import Header from "../header/Header";
import MainCalendar from "./MainCalendar";
import Logo from "../Logo";
import useMenuStore from "@/stores/useMenuStore";

export default function Main() {
	const { isMenuOpen, toggleMenu } = useMenuStore();
	return (
		<>
			<Logo />
			<Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
			<MainCalendar />
		</>
	);
}
