import { BookResponse } from "@/types/BookInfo";

import { BaseURL, KAKAOAPIKEY } from "@/app/constants";

// 도서 검색 리스트;
const fetchBooks = async (keyword: string, page: number, size: number): Promise<BookResponse> => {
	try {
		const response = await fetch(`${BaseURL}?query=${keyword}&page=${page}&size=${size}`, {
			headers: {
				Authorization: `KakaoAK ${KAKAOAPIKEY}`,
			},
		});

		if (!response.ok) {
			throw new Error("도서 정보를 불러오는데 실패했습니다.");
		}

		const data: BookResponse = await response.json();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error("도서 정보를 불러오는데 실패했습니다.");
	}
};

export default fetchBooks;
