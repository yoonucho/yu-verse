import styles from "@/styles/loading.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function Loading() {
	return (
		<div className={styles.container}>
			<div className="fa-3x">
				<FontAwesomeIcon icon={faSpinner} pulse />
				&nbsp;
			</div>
		</div>
	);
}
