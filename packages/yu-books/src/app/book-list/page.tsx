"use client";

import React, { useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { BookListInfo, FormattedBookListInfo } from "@/types/BookInfo";
import { formatDate, formatPriceWithComma } from "@/utils";
import useBookStore from "@/stores/useBookStore";

import BookListItem from "@/components/item/BookListItem";
import Header from "@/components/header/Header";
import Loading from "@/components/icons/LoadingIcon";
import Pagination from "@/components/pagination/Pagination";

import styles from "./page.module.css";

const BookList: React.FC = () => {
  const { query, isSorting, isLoading, documents, fetchBooks, setCurrentPage } =
    useBookStore();

  const headerText = "YU 책 찾기";

  /* 페이지 로드 시 및 선택한 키워드가 변경될 때마다 fetchBooks 호출 */
  useEffect(() => {
    // console.log(`[📢 useEffect 실행됨] query: ${query}`);
    if (query.length >= 2) {
      fetchBooks();
    }
  }, [query, fetchBooks]);

  /* 페이지 변경 핸들러 */
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const formatBooks = (books: BookListInfo[]): FormattedBookListInfo[] => {
    return books.map((book) => {
      return {
        ...book,
        formattedPrice: formatPriceWithComma(book.price), // 가격 포맷 적용
        // disCountText,
        discountPrice: formatPriceWithComma(book.sale_price), // 할인 가격 포맷 적용
        formattedDate: formatDate(book.datetime), // 날짜 포맷 적용
      };
    });
  };

  const formattedBooks = formatBooks(documents);

  return (
    <main className="container">
      {/* 헤더 (검색 입력 & 필터 버튼 포함) */}
      <Header headerText={headerText} />
      <div className="inner">
        <Suspense fallback={<Loading />}>
          {/* 가격 정렬시 || 로딩 중 로딩 아이콘 표시 */}
          {isSorting || isLoading ? (
            <div className={styles.loadingContainer}>
              <Loading />
              <p className={styles.loadingText}>잠시만 기다리세요! ...</p>
            </div>
          ) : (
            <>
              {/* 검색어 입력후 데이터가 없을 때 메시지 표시 */}
              {query && documents.length === 0 && !isLoading ? (
                <div className={styles.noData}>
                  <Image
                    src="/assets/images/message-icon.svg"
                    alt="no data"
                    width={300}
                    height={400}
                  />
                  <p>검색 결과가 없습니다. 다시 검색해주세요.</p>
                </div>
              ) : (
                <>
                  {documents.length > 0 ? (
                    <>
                      {/* 검색 결과 리스트 */}
                      <ul
                        className={styles.bookList}
                        aria-label="검색 결과 리스트"
                      >
                        {formattedBooks.map((book) => (
                          <li key={book.isbn}>
                            <Link
                              href={book.url}
                              title={`${book.title} 상세페이지 이동`}
                              target="_blank"
                            >
                              <BookListItem book={book} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                      {/* 페이지네이션 */}
                      <Pagination onPageChange={handlePageChange} />
                    </>
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
                </>
              )}
            </>
          )}
        </Suspense>
      </div>
    </main>
  );
};

export default BookList;
