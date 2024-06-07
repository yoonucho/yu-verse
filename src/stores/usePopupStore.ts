import { create } from "zustand";

type PopupState = {
	isPopupOpen: boolean;
	openPopup: () => void;
	closePopup: () => void;
};

const usePopupStore = create<PopupState>(set => ({
	isPopupOpen: false,
	openPopup: () => set({ isPopupOpen: true }),
	closePopup: () => set({ isPopupOpen: false }),
}));

export default usePopupStore;
