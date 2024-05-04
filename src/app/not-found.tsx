import Image from "next/image";
import styles from "../styles/not-found.module.css";
import GoBack from "@/components/header/GoBack";

export default function NotFound({ isMenuOpen, handleClick }) {
	return (
		<main className={styles.container}>
			<GoBack isOpen={isMenuOpen} onClick={handleClick} />
			<Image src="/assets/images/message-icon.svg" alt="not found" width={500} height={500} />
			<h1>요청하신 페이지가 존재하지 않습니다.</h1>
		</main>
	);
}
