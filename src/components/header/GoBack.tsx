"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SearchEventDay from "./SearchEventsDay";
import styles from "@/styles/go-back.module.css";

function handleClick() {
	alert("뒤로가기 버튼 클릭");
}

export default function GoBack({ isOpen, onClick }) {
	return (
		<div className={`${styles.container} ${isOpen ? styles.show : ""}`}>
			<div className={styles.btnContainer}>
				<div>
					<button type="button" className={`${styles.goBackBtn} fa-2x`} onClick={onClick}>
						<FontAwesomeIcon icon={faArrowLeft} />
					</button>
					&nbsp; <span>이전으로</span>
				</div>
				<SearchEventDay />
			</div>
		</div>
	);
}
