import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import styles from "./loading.module.css";

const Loading: React.FC = () => {
	return (
		<div className={styles.container}>
			<div className="fa-3x">
				<FontAwesomeIcon icon={faSpinner} pulse />
				&nbsp;
			</div>
		</div>
	);
};

export default Loading;
