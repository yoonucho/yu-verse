import { create } from "zustand";

type LoadingState = {
	isLoading: boolean;
	setIsLoading: (isLoading: boolean) => void;
};

const useLoadingStore = create<LoadingState>(set => ({
	isLoading: true,
	setIsLoading: isLoading => set({ isLoading }),
}));

export default useLoadingStore;
