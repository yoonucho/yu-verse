import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/toggle-menu.module.css";

export default function ToggleMenu({ onClick, isOpen }) {
	return (
		<button className={`${styles.toggleBtn} ${isOpen ? styles.toggleBtnClose : ""}`} onClick={onClick}>
			{isOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />}
		</button>
	);
}
