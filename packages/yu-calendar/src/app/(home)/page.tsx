import { Suspense, lazy } from "react";
import Loading from "@/components/icons/LoadingIcon";

export const metadata = {
	title: "Home",
};

const UI = lazy(() => import("@/app/ui"));

const HomePage: React.FC = () => {
	return (
		<>
			<Suspense fallback={<Loading />}>
				<UI />
			</Suspense>
		</>
	);
};

export default HomePage;
export const runtime = process.env.NODE_ENV === "development" ? "nodejs" : "experimental-edge";
