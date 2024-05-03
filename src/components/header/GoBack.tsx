"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import SearchEventDay from "./SearchEventsDay";
import styles from "@/styles/go-back.module.css";

export default function GoBack({ isOpen }) {
	return (
		<div className={`${styles.container} ${isOpen ? styles.show : ""}`}>
			<div className={styles.btnContainer}>
				<div>
					<Link className={`${styles.goBackBtn} fa-2x`} href="/">
						<FontAwesomeIcon icon={faArrowLeft} />
					</Link>
					&nbsp; <span>이전으로</span>
				</div>
				<SearchEventDay />
			</div>
		</div>
	);
}
