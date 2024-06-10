
import React, { useEffect } from "react";
import EventPopup from "@/components/popup/EventPopup";
import usePopupStore from "@/stores/usePopupStore";

const EventPopupControl = ({ selectedEvent, handleClosePopup }) => {
	const { isPopupOpen, openPopup, closePopup, popupPosition, setPopupPosition } = usePopupStore();

	// 팝업창의 외부를 클릭하면 팝업창 닫기
	const handleClickOutside = (event: MouseEvent) => {
		if (isPopupOpen && !(event.target as HTMLElement).closest(`.event-popup_popup`) && !(event.target as HTMLElement).closest(`.fc-event`)) {
			handleClosePopup();
		}
	};

	useEffect(() => {
		document.addEventListener("click", handleClickOutside);
		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	});

	return <>{isPopupOpen && selectedEvent && <EventPopup event={selectedEvent} closePopup={handleClosePopup} position={popupPosition} />}</>;
};

export default EventPopupControl;
