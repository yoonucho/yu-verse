// app/_app.tsx
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
			</Head>
			<div>
				<Component {...pageProps} />
			</div>
		</>
	);
}

export default MyApp;
