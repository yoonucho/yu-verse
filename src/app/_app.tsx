// app/_app.tsx
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<div>
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
