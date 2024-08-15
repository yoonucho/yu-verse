import { NextResponse } from "next/server";

import { BookListInfo } from "@/types/BookInfo";

import fetchBooks from "@/app/api/fetchBooks";

// 도서 검색 리스트;
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const keyword = searchParams.get("keyword");
	const page = searchParams.get("page") || "1";
	const size = searchParams.get("size") || "10";
	const sortOption = searchParams.get("sortOption") || "";

	if (!keyword) {
		return NextResponse.json({ message: "검색어가 필요합니다." }, { status: 400 });
	}

	try {
		if (sortOption === "asc" || sortOption === "desc") {
			let allBooks: BookListInfo[] = [];
			let pageCount = 1;
			let totalCount = 0;

			// 전체 데이터를 가져오기 위해 페이지를 반복해서 호출
			while (true) {
				const data = await fetchBooks(keyword as string, pageCount, 50);
				allBooks = allBooks.concat(data.documents);
				totalCount = data.meta.pageable_count;
				if (allBooks.length >= totalCount || data.meta.is_end) {
					break;
				}
				pageCount++;
			}

			allBooks.sort((a, b) => (sortOption === "asc" ? a.sale_price - b.sale_price : b.sale_price - a.sale_price));

			// 필요한 페이지 데이터 추출
			const start = (Number(page) - 1) * Number(size);
			const end = start + Number(size);
			const paginatedBooks = allBooks.slice(start, end);

			return NextResponse.json({
				documents: paginatedBooks,
				meta: {
					is_end: end >= totalCount,
					pageable_count: totalCount,
					total_count: totalCount,
				},
			});
		} else {
			// 정렬이 필요없는 경우 한 페이지 데이터만 가져오기
			const data = await fetchBooks(keyword as string, Number(page), Number(size));
			return NextResponse.json({
				documents: data.documents,
				meta: data.meta,
			});
		}
	} catch (error) {
		console.error(error);
		return NextResponse.json({ error: "도서 정보를 불러오는데 실패했습니다." }, { status: 500 });
	}
}
