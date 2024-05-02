import { useState } from "react";
import Header from "../header/Header";

interface SideBarLayoutProps {
	children: React.ReactNode;
}

export default function SideBarLayout({ children }: SideBarLayoutProps): JSX.Element {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<>
			<Header toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
			<div style={{ marginLeft: isMenuOpen ? "328px" : "0", transition: "margin-left 0.3s ease" }}>{children}</div>
		</>
	);
}
