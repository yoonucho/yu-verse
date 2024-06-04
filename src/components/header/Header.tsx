import useMenuStore from "@/stores/useMenuStore";
import GoBack from "./GoBack";

const Header: React.FC = () => {
	const { isMenuOpen, closeMenu } = useMenuStore();
	return (
		<div>
			<GoBack isOpen={isMenuOpen} onClick={closeMenu} />
		</div>
	);
};

export default Header;
