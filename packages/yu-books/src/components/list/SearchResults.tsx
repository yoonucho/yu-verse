import Image from "next/image";

import { fetchBooksAction } from "@/actions/bookActions";
import { BookListInfo, FormattedBookListInfo } from "@/types/BookInfo";
import { formatDate, formatPriceWithComma } from "@/utils";

import BookList from "@/components/list/BookList";
import Pagination from "@/components/pagination/Pagination";
import styles from "@/app/page.module.css";

const formatBooks = (books: BookListInfo[]): FormattedBookListInfo[] => {
  return books.map((book) => ({
    ...book,
    formattedPrice: formatPriceWithComma(book.price),
    discountPrice: formatPriceWithComma(book.sale_price),
    formattedDate: formatDate(book.datetime),
  }));
};

// 데이터를 가져와서 BookList와 Pagination을 렌더링하는 별도의 컴포넌트
export default async function SearchResults({
  query,
  page,
  sort,
  filterKeyword,
}: {
  query: string;
  page: number;
  sort: "" | "asc" | "desc";
  filterKeyword: string;
}) {
  const fetchAll = !!sort || !!filterKeyword; // 필터 또는 정렬이 있으면 전체 수집 후 필터/정렬
  const data = await fetchBooksAction(
    query,
    page,
    10,
    fetchAll,
    sort,
    filterKeyword
  );

  // 에러 또는 데이터 없음 처리
  if (
    !data ||
    typeof data !== "object" ||
    "error" in data ||
    !("meta" in data) ||
    !data.meta ||
    data.meta.pageable_count === 0
  ) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.log("[SearchDebug:result]", {
        query,
        page,
        sort,
        hasErrorOrEmpty: true,
      });
    }
    return (
      <div className={styles.noData}>
        <Image
          src="/assets/images/message-icon.svg"
          alt="no data"
          width={300}
          height={400}
        />
        <p>검색 결과가 없습니다. 다시 검색해주세요.</p>
      </div>
    );
  }

  const formattedBooks = formatBooks(data.documents);

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[SearchDebug:result]", {
      query,
      page,
      sort,
      total: data.meta?.pageable_count ?? 0,
      isEnd: data.meta?.is_end,
    });
  }

  return (
    <>
      <BookList books={formattedBooks} />
      <Pagination totalItems={data.meta.pageable_count} />
    </>
  );
}