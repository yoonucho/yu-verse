import SearchEventsDay from "./SearchEventsDay";
import ToggleMenu from "./ToggleMenu";

export default function SideBar({ isMenuOpen, toggleMenu }) {
	return (
		<div>
			<ToggleMenu onClick={toggleMenu} isOpen={isMenuOpen} />
			<SearchEventsDay isOpen={isMenuOpen} />
		</div>
	);
}
