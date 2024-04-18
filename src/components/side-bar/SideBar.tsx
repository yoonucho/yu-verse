import SearchEventsDay from "./SearchEventsDay";
import ToggleMenu from "./ToggleMenu";
// import styles from "./side-bar.module.css";

export default function SideBar({ isMenuOpen, toggleMenu }) {
	return (
		<div>
			<ToggleMenu onClick={toggleMenu} isOpen={isMenuOpen} />
			<SearchEventsDay isOpen={isMenuOpen} />
		</div>
	);
}
