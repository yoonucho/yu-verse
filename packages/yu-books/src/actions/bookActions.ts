'use server';

import fetchBooks from "@/app/api/fetchBooks";
import { BookListInfo } from "@/types/BookInfo";
import { matchesCategoryKeyword } from "@/utils/search";

const bookCache = new Map<string, { documents: BookListInfo[]; meta: any }>();

export async function fetchBooksAction(
  searchQuery: string,
  page: number = 1,
  size: number = 10,
  fetchAll: boolean = false,
  sortOption: "" | "asc" | "desc" = "",
  filterKeyword: string = ""
) {
  if (!searchQuery) {
    return { documents: [], meta: null };
  }

  const cacheKey = `${searchQuery}-${sortOption}-${filterKeyword}`;

  try {
    if (fetchAll && bookCache.has(cacheKey)) {
      const cachedData = bookCache.get(cacheKey)!;
      const start = (page - 1) * size;
      const end = start + size;
      return {
        documents: cachedData.documents.slice(start, end),
        meta: { ...cachedData.meta, is_end: end >= cachedData.meta.pageable_count },
      };
    }

    if (!fetchAll) {
      const pageCacheKey = `${searchQuery}-page${page}`;
      if (bookCache.has(pageCacheKey)) {
        return bookCache.get(pageCacheKey)!;
      }
      const data = await fetchBooks(searchQuery, page, size);
      // 단건 페이지 페칭 시에도 필터 키워드가 있으면 해당 페이지 결과를 필터링
      if (filterKeyword) {
        const filteredDocs = data.documents.filter(doc => matchesCategoryKeyword(doc as any, filterKeyword));
        return {
          documents: filteredDocs,
          meta: { ...data.meta, pageable_count: filteredDocs.length, total_count: filteredDocs.length },
        };
      } else {
        bookCache.set(pageCacheKey, data);
        return data;
      }
    }

    const firstData = await fetchBooks(searchQuery, 1, 50);
    let allBooks: BookListInfo[] = firstData.documents;
    const totalCount = firstData.meta.pageable_count;
    const totalPages = Math.ceil(totalCount / 50);

    if (totalPages > 1) {
      const CHUNK_SIZE = 5; // 한 번에 처리할 병렬 요청 수
      const pageNumbers = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);

      for (let i = 0; i < pageNumbers.length; i += CHUNK_SIZE) {
        const chunk = pageNumbers.slice(i, i + CHUNK_SIZE);
        const promises = chunk.map(p => fetchBooks(searchQuery, p, 50));
        
        try {
          const results = await Promise.all(promises);
          results.forEach(result => {
            if (result && result.documents) {
              allBooks = allBooks.concat(result.documents);
            }
          });
        } catch (error) {
          console.error(`청크 처리 중 오류 발생 (시작 페이지: ${chunk[0]}):`, error);
        }
      }
    }

    if (filterKeyword) {
      allBooks = allBooks.filter(doc => matchesCategoryKeyword(doc as any, filterKeyword));
    }

    if (sortOption) {
      allBooks.sort((a, b) =>
        sortOption === "asc"
          ? a.sale_price - b.sale_price
          : b.sale_price - a.sale_price
      );
    }

    const fullMeta = {
      total_count: allBooks.length,
      pageable_count: allBooks.length,
      is_end: true,
    };

    bookCache.set(cacheKey, { documents: allBooks, meta: fullMeta });

    const start = (page - 1) * size;
    const end = start + size;
    return {
      documents: allBooks.slice(start, end),
      meta: { ...fullMeta, is_end: end >= allBooks.length },
    };

  } catch (error) {
    console.error("❌ 도서 데이터를 불러오는데 실패했습니다.", error);
    return { error: "도서 데이터를 불러오는데 실패했습니다." };
  }
}
