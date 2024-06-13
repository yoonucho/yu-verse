import React, { useRef, useEffect, useCallback } from "react";
import EventPopup from "@/components/popup/EventPopup";
import usePopupStore from "@/stores/usePopupStore";
import useEventStore, { EventType } from "@/stores/useEventStore";
import { EventApi } from "@fullcalendar/core";
import { v4 as uuidv4 } from "uuid";

const EventPopupControl: React.FC = () => {
	const { isPopupOpen, popupPosition, closePopup } = usePopupStore();
	const { selectedEvent, addEvent, updateEvent, deleteEvent, setSelectedEvent, isEditing, setIsEditing } = useEventStore();
	const popupRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isPopupOpen) {
			setIsEditing(false);
		}
	}, [isPopupOpen, setIsEditing]);

	// 이벤트 추가 및 수정
	const handleSave = (event: EventApi) => {
		if (selectedEvent && "id" in selectedEvent) {
			const updatedEvent = { ...event, id: selectedEvent.id };
			updateEvent(updatedEvent);
		} else {
			const newEvent: EventApi = { ...event, id: uuidv4() };
			addEvent(newEvent);
		}
		handleClosePopup();
	};

	// 이벤트 삭제
	const handleDelete = (eventId: string) => {
		deleteEvent(eventId);
		// console.log("deleteEvent", eventId);
		handleClosePopup();
	};

	// 팝업 닫기 및 선택된 이벤트 초기화
	const handleClosePopup = useCallback(() => {
		closePopup();
		setSelectedEvent(null);
		setIsEditing(false);
	}, [closePopup, setSelectedEvent, setIsEditing]);

	// 팝업창의 외부를 클릭하면 팝업창 닫기
	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			// popupRef.current가 유효하고 클릭한 이벤트 타겟이 팝업 내부에 포함되지 않은 경우 팝업 닫기
			if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
				handleClosePopup();
			}
		},
		[handleClosePopup]
	);

	useEffect(() => {
		if (isPopupOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isPopupOpen, handleClickOutside]);

	return (
		<>
			{isPopupOpen && (
				<div ref={popupRef}>
					<EventPopup event={selectedEvent} onSave={handleSave} onDelete={handleDelete} closePopup={handleClosePopup} position={popupPosition} />
				</div>
			)}
		</>
	);
};

export default EventPopupControl;
