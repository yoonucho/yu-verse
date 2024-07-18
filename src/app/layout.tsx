import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";
import "@/styles/styles.css";
import "@/styles/globals.css";

// Spoqa 폰트 설정
const spoqa = localFont({
	src: [
		{
			path: "../../public/assets/fonts/SpoqaHanSansNeo.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/assets/fonts/SpoqaHanSansNeo.woff",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--primary-font", // CSS 변수로 폰트 설정
});

export const metadata: Metadata = {
	title: "YU 도서 검색",
	description: "YU 도서 검색",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={spoqa.variable}>{children}</body>
		</html>
	);
}
