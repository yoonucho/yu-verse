import { useEffect, useMemo, useRef } from "react";
import debounce from "lodash/debounce";

const useDebounce = (callback: () => void, delay: number) => {
	const ref = useRef<any>();

	useEffect(() => {
		ref.current = callback;
	}, [callback]);

	const debouncedCallback = useMemo(() => {
		const func = () => {
			ref.current?.();
		};

		return debounce(func, delay);
	}, [delay]);

	return debouncedCallback;
};

export default useDebounce;
