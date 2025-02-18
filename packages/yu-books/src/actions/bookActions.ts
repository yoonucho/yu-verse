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
      const cachedData = bookCache.get(cacheKey);

      // **정렬을 위한 전체 데이터를 캐싱했을 경우 페이지 슬라이싱 적용**
      if (fetchAll) {
        const start = (page - 1) * size;
        const end = start + size;
        return {
          documents: cachedData!.documents.slice(start, end),
          meta: cachedData!.meta,
        };
      }

      return cachedData;
    }

    // **정렬이 필요한 경우 전체 데이터 가져오기**
    if (fetchAll) {
      // 첫 페이지를 먼저 호출하여 전체 데이터 수를 확인
      const firstData = await fetchBooks(searchQuery, 1, 50);
      // console.log("firstData", firstData);
      let allBooks: BookListInfo[] = firstData.documents;
      const totalCount = firstData.meta.pageable_count;
      const totalPages = Math.ceil(totalCount / 50);

      // 전체 페이지가 1페이지보다 많다면, 2페이지부터 마지막 페이지까지 병렬로 API 호출을 진행합니다
      if (totalPages > 1) {
        // 2페이지부터 전체 페이지까지 병렬로 호출
        const promises = [];
        // for 루프를 통해 각 페이지의 fetchBooks 호출을 배열(promises)에 저장합니다.
        for (let page = 2; page <= totalPages; page++) {
          promises.push(fetchBooks(searchQuery, page, 50));
        }
        // Promise.all을 사용하여 모든 호출이 완료될 때까지 기다립니다.
        const results = await Promise.all(promises);
        results.forEach((result) => {
          allBooks = allBooks.concat(result.documents);
        });
      }

      // **정렬되지 않은 전체 데이터 캐싱**
      if (sortOption) {
        allBooks.sort((a, b) =>
          sortOption === "asc"
            ? a.sale_price - b.sale_price
            : b.sale_price - a.sale_price
        );
      }

      // 전체 데이터를 캐시에 저장
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
      // console.log(`✅ [API 요청 완료] 검색어: ${searchQuery}, 페이지: ${page}`);
      return {
        documents: allBooks.slice(start, end),
        meta: {
          total_count: totalCount,
          pageable_count: totalCount,
          is_end: end >= totalCount,
        },
      };
    } else {
      // **한 페이지만 가져오는 경우**
      const data = await fetchBooks(searchQuery, page, size);
      bookCache.set(cacheKey, data);
      // console.log(`✅ [API 요청 완료] 검색어: ${searchQuery}, 페이지: ${page}`);
      return data;
    }
  } catch (error) {
    console.error("❌ 도서 데이터를 불러오는데 실패했습니다.", error);
    return { error: "도서 데이터를 불러오는데 실패했습니다." };
  }
}
