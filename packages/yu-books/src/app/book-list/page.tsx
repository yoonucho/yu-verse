import { Suspense } from "react";
import Image from "next/image";

import { fetchBooksAction } from "@/actions/bookActions";
import { BookListInfo, FormattedBookListInfo } from "@/types/BookInfo";
import { formatDate, formatPriceWithComma } from "@/utils";

import Header from "@/components/header/Header";
import BookList from "@/components/list/BookList";
import Pagination from "@/components/pagination/Pagination";
import Loading from "@/components/icons/LoadingIcon";
import styles from "./page.module.css";

type BookListPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
    sort?: string;
  };
};

const formatBooks = (books: BookListInfo[]): FormattedBookListInfo[] => {
  return books.map((book) => ({
    ...book,
    formattedPrice: formatPriceWithComma(book.price),
    discountPrice: formatPriceWithComma(book.sale_price),
    formattedDate: formatDate(book.datetime),
  }));
};

// 데이터를 가져와서 BookList와 Pagination을 렌더링하는 별도의 컴포넌트
async function BookData({
  query,
  page,
  sort,
}: {
  query: string;
  page: number;
  sort: "" | "asc" | "desc";
}) {
  const result = await fetchBooksAction(query, page, 10, !!sort, sort);

  if ("error" in result) {
    return <div>Error: {result.error}</div>;
  }

  const { documents, meta } = result;

  // meta가 null이거나 pageable_count가 0인 경우 결과 없음 표시
  if (!meta || meta.pageable_count === 0) {
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

  const formattedBooks = formatBooks(documents);

  return (
    <>
      <BookList books={formattedBooks} />
      <Pagination totalItems={meta.pageable_count} />
    </>
  );
}

export default async function BookListPage({
  searchParams,
}: BookListPageProps) {
  const query = searchParams?.query || "";
  const page = Number(searchParams?.page || "1");
  const sort = (searchParams?.sort || "") as "" | "asc" | "desc";

  const headerText = "YU 책 찾기";

  return (
    <main className="container">
      <Header headerText={headerText} />
      <div className="inner">
        {query ? (
          <Suspense
            key={query + page + sort}
            fallback={
              <div className={styles.loadingContainer}>
                <Loading />
                <p className={styles.loadingText}>잠시만 기다리세요! ...</p>
              </div>
            }
          >
            <BookData query={query} page={page} sort={sort} />
          </Suspense>
        ) : (
          <div className={styles.noData}>
            <Image
              src="/assets/images/message-icon.svg"
              alt="message"
              width={300}
              height={400}
            />
            <p>책을 검색해주세요.</p>
          </div>
        )}
      </div>
    </main>
  );
}
