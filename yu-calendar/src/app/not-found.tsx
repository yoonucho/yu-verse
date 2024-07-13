"use client";
import Image from "next/image";
import GoBack from "@/components/header/GoBack";
import { useRouter } from "next/navigation";
import styles from "./not-found.module.css";

const NotFound: React.FC = () => {
	const router = useRouter();
	const handleClick = (): void => {
		router.back();
	};
	return (
		<main className={styles.container}>
			<GoBack isOpen={true} onClick={handleClick} isClose={true} />
			<Image src="/assets/images/message-icon.svg" alt="not found" width={500} height={500} />
			<h1 className={styles.errorText}>요청하신 페이지가 존재하지 않습니다.</h1>
		</main>
	);
};

export default NotFound;
