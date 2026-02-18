import React, { useRef, useEffect, useCallback } from "react";
import { EventApi } from "@fullcalendar/core";
import { v4 as uuidv4 } from "uuid";
import EventPopup from "@/components/popup/EventPopup";
import usePopupStore from "@/stores/usePopupStore";
import useEventStore from "@/stores/useEventStore";

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
				// 편집 중에는 유효성 메시지 확인을 위해 외부 클릭 자동 닫기를 막는다.
				if (isEditing) {
					return;
				}
				const target = event.target as HTMLElement | null;
				if (target?.closest(".fc-event")) {
					return;
				}
				// popupRef.current가 유효하고 클릭한 이벤트 타겟이 팝업 내부에 포함되지 않은 경우 팝업 닫기
				if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
					handleClosePopup();
				}
			},
			[handleClosePopup, isEditing]
		);

	useEffect(() => {
			if (isPopupOpen) {
				document.addEventListener("click", handleClickOutside);
			} else {
				document.removeEventListener("click", handleClickOutside);
			}

		return () => {
				document.removeEventListener("click", handleClickOutside);
			};
		}, [isPopupOpen, handleClickOutside]);

	return (
		<>
				{isPopupOpen && (
					<div
						ref={popupRef}
						onMouseDown={(e) => e.stopPropagation()}
						onClick={(e) => e.stopPropagation()}
					>
						<EventPopup event={selectedEvent} onSave={handleSave} onDelete={handleDelete} closePopup={handleClosePopup} position={popupPosition} />
					</div>
				)}
		</>
	);
};

export default EventPopupControl;
