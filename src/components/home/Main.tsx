"use client";
import React, { useState } from "react";
import Header from "../header/Header";
import MainCalendar from "./MainCalendar";
import Logo from "../Logo";

export default function Main() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<Logo />
			<Header isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
			<MainCalendar />
		</>
	);
}
