import { create } from "zustand";

type PopupState = {
	isPopupOpen: boolean;
	openPopup: () => void;
	closePopup: () => void;
	popupPosition?: { x: number; y: number };
	setPopupPosition?: (position: { x: number; y: number }) => void;
};

const usePopupStore = create<PopupState>(set => ({
	isPopupOpen: false,
	openPopup: () => set({ isPopupOpen: true }),
	closePopup: () => set({ isPopupOpen: false }),
	popupPosition: { x: 0, y: 0 },
	setPopupPosition: position => set({ popupPosition: position }),
}));

export default usePopupStore;
