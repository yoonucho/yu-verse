"use client";
import React, { useState } from "react";
import Header from "../header/Header";
import MainCalendar from "./MainCalendar";

export default function Main() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	return (
		<>
			<Header isMenuOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(!isMenuOpen)} />
			<MainCalendar />
		</>
	);
}
