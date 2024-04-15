// app/_app.tsx
import type { AppProps } from "next/app";
import { notoSansKR } from "./layout"; // 설정한 폰트를 가져옵니다.

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className={notoSansKR.className}>
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;
