import { Suspense, lazy } from "react";
import Loading from "@/components/icons/LoadingIcon";

export const metadata = {
	title: "Home",
};

const Main = lazy(() => import("@/components/home/Main"));

const HomePage: React.FC = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<Main />
			</Suspense>
		</>
	);
};

export default HomePage;
export const runtime = "edge";
