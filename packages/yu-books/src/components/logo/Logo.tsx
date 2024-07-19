import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import styles from "./logo.module.css";

const Logo: React.FC = () => {
	return (
		<div className={styles.iconContainer}>
			<Image className={styles.icon} src="/assets/images/bh_logo-w.png" width={0} height={0} sizes="100vw" alt="logo icon" />
			<div className={`fa-2x ${styles.bookIcon}`}>
				<FontAwesomeIcon icon={faBookOpen} />
			</div>
		</div>
	);
};

export default Logo;
