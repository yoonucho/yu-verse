// services/bookService.ts
import { fetchBooksAction } from "@/actions/bookActions";
import { BookListInfo } from "@/types/BookInfo";

export type BookFetchResult = {
  documents: BookListInfo[];
  meta: any;
}

export async function getBooks(
  query: string,
  page: number,
  size: number,
  fetchAll: boolean,
  sortOption: "" | "asc" | "desc"
): Promise<BookFetchResult | null> {
  if (!query) return null;

  try {
    const data = await fetchBooksAction(
      query,
      page,
      size,
      fetchAll,
      sortOption
    );
    if (!data || typeof data !== "object" || !("documents" in data)) {
      console.error("❌ 데이터가 존재하지 않음:", data);
      return null;
    }
    return {
      documents: data.documents,
      meta: data.meta,
    };
  } catch (error) {
    console.error("❌ API 호출 에러:", error);
    return null;
  }
}
