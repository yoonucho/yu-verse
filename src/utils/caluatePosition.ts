type Position = {
	x: number;
	y: number;
};

export const calculatePosition = (el: HTMLElement, calendarEl: HTMLElement): Position => {
	const rect = el.getBoundingClientRect();
	const calendarElRect = calendarEl.getBoundingClientRect();
	const calendarWidth = calendarElRect.width;

	let popupX = rect.left;
	let popupY = rect.top + window.scrollY;

	// 팝업이 화면 밖으로 나가지 않도록 조정
	if (calendarWidth - rect.left < 300) {
		// console.log("넘어간드앙!");
		popupX = rect.left - 300;
	}

	return { x: popupX, y: popupY };
};
