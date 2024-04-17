import Image from "next/image";
import styles from "@/styles/hair.module.css";

export default function HairIcon() {
	return (
		<div className={styles.container}>
			<Image className={styles.img} src="/assets/images/hair-icon.svg" alt="헤어 아이콘" width={60} height={60} />
			{/* <Image className={styles.img} src="/assets/images/hair-icon.svg" alt="헤어 아이콘" width={60} height={60} />
			<Image className={styles.img} src="/assets/images/hair-icon.svg" alt="헤어 아이콘" width={60} height={60} /> */}
		</div>
	);
}
