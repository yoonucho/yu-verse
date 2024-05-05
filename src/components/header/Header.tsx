import GoBack from "./GoBack";

export default function Header({ isMenuOpen, toggleMenu }) {
	return (
		<div>
			<GoBack onClick={toggleMenu} isOpen={isMenuOpen} />
		</div>
	);
}
