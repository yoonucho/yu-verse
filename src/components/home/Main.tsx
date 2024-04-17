"use client";
import React, { useState } from "react";
import SideBar from "../side-bar/SideBar";
import MainCalendar from "./MainCalendar";

export default function Main() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<SideBar isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
			<MainCalendar isOpen={isMenuOpen} />
		</>
	);
}
