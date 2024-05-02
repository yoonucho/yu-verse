import ToggleMenu from "./ToggleMenu";
import GoBack from "../GoBack";

export default function Header({ toggleMenu, isMenuOpen }) {
	return (
		<div>
			<ToggleMenu onClick={toggleMenu} isOpen={isMenuOpen} />
			<GoBack isOpen={isMenuOpen} />
		</div>
	);
}
