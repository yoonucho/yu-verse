// app/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>YU캘린더</title>
				<meta property="og:title" content="YU캘린더" />
				<meta property="og:description" content="현재는 공휴일 검색만 가능합니다!" />
				<meta property="og:image" content="/assets/images/yoonu-opengraph.png" />
				<meta property="og:url" content="https://events-scheduler.vercel.app" />
				<meta property="og:type" content="website" />
			</Head>
			<div>
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;
