"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { BookListInfo, FormattedBookListInfo } from "@/types/BookInfo";
import { formatDate, formatPriceWithComma, calculateDiscountRate } from "@/utils";

import useBookStore from "@/stores/useBookStore";
import usePaginationStore from "@/stores/usePaginationStore";

import BookListItem from "@/components/item/BookListItem";
import Header from "@/components/header/Header";
import Loading from "@/components/icons/LoadingIcon";
import Pagination from "@/components/pagination/Pagination";

import styles from "./bookList.module.css";

const BookList: React.FC = () => {
	const { query, fetchBooks, documents, meta, selectedKeyword } = useBookStore();
	const { currentPage, setTotalPage } = usePaginationStore();
	const [isSearchTriggered, setIsSearchTriggered] = useState(false);

	const headerText = "YU 책 찾기";

	/* 페이지 로드 시 및 선택한 키워드가 변경될 때마다 fetchBooks 호출 */
	useEffect(() => {
		if (query || selectedKeyword) {
			// console.log("fetchBooks 호출", "query :", query, "selectedKeyword :", selectedKeyword);
			fetchBooks();
			setIsSearchTriggered(true);
		}
	}, [query, selectedKeyword, fetchBooks]);

	/* 페이지 변경 시 fetchBooks 호출 */
	useEffect(() => {
		fetchBooks();
	}, [currentPage, fetchBooks]);

	/* 메타 정보 변경 시 전체 페이지 수 업데이트 */
	useEffect(() => {
		if (meta) {
			const totalPage = Math.ceil(meta.pageable_count / 10); // 한 페이지당 10개 항목 기준
			setTotalPage(totalPage);
		}
	}, [meta, setTotalPage, fetchBooks, documents]);

	const formatBooks = (books: BookListInfo[]): FormattedBookListInfo[] => {
		return books.map(book => {
			const discountPercent = ((book.price - book.sale_price) / book.price) * 100;
			const { discountPrice, disCountText } = calculateDiscountRate(book.price, discountPercent);

			return {
				...book,
				formattedPrice: formatPriceWithComma(book.price),
				disCountText,
				discountPrice: formatPriceWithComma(discountPrice),
				formattedDate: formatDate(book.datetime),
			};
		});
	};

	const formattedBooks = formatBooks(documents);

	const handlePageChange = (page: number) => {
		usePaginationStore.getState().setCurrentPage(page);
	};

	return (
		<main className="container">
			{/* 도서 전체 리스트 */}
			<Header headerText={headerText} />
			<div className="inner">
				<Suspense fallback={<Loading />}>
					{!isSearchTriggered || (query.length === 0 && !selectedKeyword) ? (
						<div className={styles.noData}>
							<Image src="/assets/images/message-icon.svg" alt="message" width={300} height={400} />
							<p>도서를 검색해주세요.</p>
						</div>
					) : (
						<>
							{formattedBooks.length == 0 && query.length < 2 ? (
								<div className={styles.noData}>
									<Image src="/assets/images/message-icon.svg" alt="message" width={400} height={400} />
									<p>
										선택하신 조건에 맞는 도서가 없습니다. <br />
										준비된 다른 도서를 확인해 보세요!
									</p>
								</div>
							) : (
								<ul className={styles.bookList}>
									{formattedBooks.map(book => (
										<li key={book.isbn}>
											<Link href={book.url} title={`${book.title} 상세페이지 이동`} target="_blank">
												<BookListItem book={book} />
											</Link>
										</li>
									))}
								</ul>
							)}
							<Pagination onPageChange={handlePageChange} />
						</>
					)}
				</Suspense>
			</div>
		</main>
	);
};

export default BookList;
