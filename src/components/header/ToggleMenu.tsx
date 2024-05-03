import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/toggle-menu.module.css";

export default function ToggleMenu({ onClick, isOpen }) {
	return (
		<button className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnClose : ""}`} onClick={onClick}>
			{isOpen ? "" : <FontAwesomeIcon icon={faMagnifyingGlass} />}
		</button>
	);
}
