import Image from "next/image";
import styles from "../styles/not-found.module.css";
import GoBack from "@/components/GoBack";

export default function NotFound() {
	return (
		<main className={styles.container}>
			<GoBack />
			<Image src="/assets/images/message-icon.svg" alt="not found" width={500} height={500} />
			<h1>요청하신 페이지가 존재하지 않습니다.</h1>
		</main>
	);
}
