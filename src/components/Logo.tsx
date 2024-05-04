import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import styles from "@/styles/logo.module.css";

export default function Logo() {
	return (
		<div className={styles.iconContainer}>
			<Image className={styles.icon} src="/assets/images/logo-icon.png" alt="logo icon" width={0} height={0} sizes="100vw" />
			<div className={`fa-2x ${styles.calendarIcon}`}>
				<FontAwesomeIcon icon={faCalendar} />
			</div>
		</div>
	);
}
