"use client";

import Loading from "@/components/icons/LoadingIcon";
import useLoadingStore from "@/stores/useLoadingStore";

const ClientLoadingComponent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const { isLoading } = useLoadingStore();

	return isLoading ? <Loading /> : <>{children} </>; // 로딩 중 처리
};

export default ClientLoadingComponent;
