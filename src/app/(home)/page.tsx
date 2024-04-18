import { Suspense, lazy } from "react";
import Loading from "@/components/icons/LoadingIcon";
import HairIcon from "@/components/icons/HairIcon";

export const metadata = {
	title: "Home",
};

const Main = lazy(() => import("@/components/home/Main"));

export default async function HomePage() {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Main />
				{/* <HairIcon /> */}
			</Suspense>
		</>
	);
}

export const runtime = "edge";
