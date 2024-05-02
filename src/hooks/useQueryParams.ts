import { useEffect, useState } from "react";

export default function useQueryParams() {
	const [queryParams, setQueryParams] = useState(new URLSearchParams());

	useEffect(() => {
		if (typeof window !== "undefined") {
			setQueryParams(new URLSearchParams(window.location.search));
		}
	}, []);

	return queryParams;
}
