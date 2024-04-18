import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "../styles/globals.css";
import "../styles/custom.css";

interface FontDetails {
	style: {
		fontFamily: string;
		fontStyle: string;
	};
	className: string;
	variable: string;
}

const notoSansKR: FontDetails = Noto_Sans_KR({
	subsets: ["latin"], // 사용하고 싶은 폰트 서브셋을 배열 형태로 지정
	weight: ["400", "500", "700"], // 사용하고 싶은 폰트 두께를 배열 형태로 지정
	display: "swap", // 폰트 표시 옵션
	variable: "--primary-font", // CSS 변수 이름
}) as FontDetails;

export const metadata: Metadata = {
	title: {
		template: "미용실 고객 관리 시스템 | %s",
		default: "미용실 고객 관리 시스템 상세 페이지",
	},
	description: "미용실 고객 관리 시스템입니다.",
	icons: {
		icon: "/favicon.ico",
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko">
			<body className={notoSansKR.className}>{children}</body>
		</html>
	);
}
