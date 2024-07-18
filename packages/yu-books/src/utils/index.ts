/* 상품의 할인율을 계산하는 함수 & 할인율이 0%면 % 대신 빈 문자열을 반환*/
export const calculateDiscountRate = (price: number, discountPercent: number) => {
	let discountedPrice = price;
	let discountPrice = 0;
	let disCountText = "";

	if (discountPercent > 0) {
		discountedPrice = price * (1 - discountPercent / 100);
		discountPrice = discountedPrice;
		disCountText = `${discountPercent}%`;
	} else {
		discountPrice = price;
	}

	return { discountPrice, disCountText };
};

/* 가격을 콤마 단위로 변환 */
export const formatPriceWithComma = (price: number): string => {
	return price.toLocaleString();
};

/* 날짜를 년.월.일 형식으로 변환 */
export const formatDate = (datetime: string): string => {
	const data = new Date(datetime);
	const formattedDate = data.toLocaleDateString("ko-KR", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	// 마지막 마침표 제거
	return formattedDate.endsWith(".") ? formattedDate.slice(0, -1) : formattedDate;
};


