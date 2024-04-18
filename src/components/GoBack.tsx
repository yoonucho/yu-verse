"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "@/styles/go-back.module.css";

export default function GoBack() {
	return (
		<div className={styles.container}>
			<div className={styles.btnContainer}>
				<Link className={`${styles.goBackBtn} fa-2x`} href="/">
					<FontAwesomeIcon icon={faArrowLeft} />
				</Link>
				&nbsp; <span>이전으로</span>
			</div>
		</div>
	);
}
