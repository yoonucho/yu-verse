'use server'; // 서버에서 실행됨

import fetchBooks from '@/app/api/fetchBooks'; // Kakao API 호출 함수
import { BookListInfo } from '@/types/BookInfo';

export async function fetchBooksAction(searchQuery: string, page: number = 1, size: number = 10, sortOption?: 'asc' | 'desc') {
	if (!searchQuery) {
		throw new Error('검색어가 필요합니다.');
	}

	try {
		if (sortOption === 'asc' || sortOption === 'desc') {
			let allBooks: BookListInfo[] = [];
			let pageCount = 1;
			let totalCount = 0;

			// 전체 데이터를 가져오기 위해 페이지를 반복해서 호출
			while (true) {
				const data = await fetchBooks(searchQuery, pageCount, 50, sortOption); // Kakao API 호출
				allBooks = allBooks.concat(data.documents);
				totalCount = data.meta.pageable_count;
				if (allBooks.length >= totalCount || data.meta.is_end) {
					break;
				}
				pageCount++;
			}

			// 가격 정렬 (오름차순 or 내림차순)
			allBooks.sort((a, b) => (sortOption === 'asc' ? a.sale_price - b.sale_price : b.sale_price - a.sale_price));

			// 필요한 페이지 데이터 추출
			const start = (page - 1) * size;
			const end = start + size;
			const paginatedBooks = allBooks.slice(start, end);

			return {
				documents: paginatedBooks,
				meta: {
					is_end: end >= totalCount,
					pageable_count: totalCount,
					total_count: totalCount,
				},
			};
		} else {
			// 정렬이 필요없는 경우 한 페이지 데이터만 가져오기
			const data = await fetchBooks(searchQuery, page, size);
			return {
				documents: data.documents,
				meta: data.meta,
			};
		}
	} catch (error) {
		console.error('도서 정보를 불러오는데 실패했습니다.', error);
		return { documents: [], meta: null };
	}
}
