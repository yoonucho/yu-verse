"use client";

import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import useMenuStore from '@/stores/useMenuStore';
import SearchEventDay from "./SearchEventsDay";
import styles from "./go-back.module.css";

type GoBackProps = {
	isOpen?: boolean;
	onClick?: () => void;
	isClose?: boolean;
};

const GoBack: React.FC<GoBackProps> = ({ isOpen, onClick, isClose = false }) => {
	const router = useRouter();
	const { closeMenu } = useMenuStore();

	const handleClick = () => {
		router.back();
		closeMenu();
	};
	// console.log("isOpen:", isOpen, "isClose:", isClose);
	return (
		<div className={`${styles.container} ${isOpen ? styles.show : ""}`}>
			<div className={styles.btnContainer}>
				<div className={styles.btnInner}>
					<button type="button" className={`${styles.goBackBtn} fa-2x`} onClick={handleClick}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					&nbsp; <span>이전으로</span>
				</div>
				{!isClose && <SearchEventDay />}
			</div>
		</div>
	);
};

export default GoBack;
