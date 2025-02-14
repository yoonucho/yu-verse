"use server";

import fetchBooks from "@/app/api/fetchBooks";
import { BookListInfo } from "@/types/BookInfo";

const bookCache = new Map<string, { documents: BookListInfo[]; meta: any }>();

export async function fetchBooksAction(
  searchQuery: string,
  page: number = 1,
  size: number = 10,
  fetchAll: boolean = false,
  sortOption: "" | "asc" | "desc" = ""
) {
  if (!searchQuery) {
    throw new Error("검색어가 필요합니다.");
  }

  // 캐시 키 생성 (검색어 기준, 전체 데이터 요청 여부 추가)
  const cacheKey = `${searchQuery}-${
    fetchAll ? "all" : "page" + page
  }-${sortOption}`;

  try {
    // 캐시 데이터 확인
    if (bookCache.has(cacheKey)) {
      console.log("📢 [CACHE] 사용:", cacheKey);
      const cachedData = bookCache.get(cacheKey);

      // **정렬을 위한 전체 데이터를 캐싱했을 경우 페이지 슬라이싱 적용**
      if (fetchAll) {
        const start = (page - 1) * size;
        const end = start + size;
        console.log("📢 [CACHE] 전체 데이터 슬라이싱:", start, end);
        return {
          documents: cachedData!.documents.slice(start, end),
          meta: cachedData!.meta,
        };
      }

      return cachedData;
    }

    let allBooks: BookListInfo[] = [];
    let totalCount = 0;

    // **정렬이 필요한 경우 전체 데이터 가져오기**
    if (fetchAll) {
      let pageCount = 1;
      while (true) {
        const data = await fetchBooks(searchQuery, pageCount, 50);
        allBooks = allBooks.concat(data.documents);
        totalCount = data.meta.pageable_count;
        console.log(
          `📢 [FETCH] 페이지 ${pageCount} 데이터 가져옴:`,
          data.documents.length
        );
        if (allBooks.length >= totalCount || data.meta.is_end) {
          break;
        }
        pageCount++;
      }

      // **정렬되지 않은 전체 데이터 캐싱**
      if (sortOption) {
        allBooks.sort((a, b) =>
          sortOption === "asc"
            ? a.sale_price - b.sale_price
            : b.sale_price - a.sale_price
        );
      }

      bookCache.set(cacheKey, {
        documents: allBooks,
        meta: {
          total_count: totalCount,
          pageable_count: totalCount,
          is_end: false,
        },
      });

      // **페이지 데이터 슬라이싱 후 반환**
      const start = (page - 1) * size;
      const end = start + size;
      console.log("📢 [FETCH] 전체 데이터 슬라이싱:", start, end);
      return {
        documents: allBooks.slice(start, end),
        meta: {
          total_count: totalCount,
          pageable_count: totalCount,
          is_end: end >= totalCount,
        },
      };
    }

    // **한 페이지만 가져오는 경우**
    const data = await fetchBooks(searchQuery, page, size);
    bookCache.set(cacheKey, data);

    return data;
  } catch (error) {
    console.error("❌ 도서 데이터를 불러오는데 실패했습니다.", error);
    return { error: "도서 데이터를 불러오는데 실패했습니다." };
  }
}
