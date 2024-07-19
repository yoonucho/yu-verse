import React from "react";
import Image from "next/image";

import { BookListItemProps } from "@/types/BookInfo";

import styles from "./bookItem.module.css";

const BookListItem: React.FC<BookListItemProps> = ({ book }) => {
	return (
		<figure className={styles.bookItem}>
			<Image src={book.thumbnail} width={100} height={130} alt={`${book.isbn} ${book.title}`} />
			<figcaption>
				<div className={styles.bookTitle}>
					<h3 className={`ellipsis ${book.title.length > 18 ? "lineclamp" : ""}`}>{book.title}</h3>
					<p>
						<span className={styles.author}>
							<span className={`${book.translators.length ? "separator" : ""}`}>저자: {book.authors.join(", ")}</span> {book.translators.length > 0 && <span>번역: {book.translators}</span>}
						</span>
					</p>
					<p>
						<span className={styles.publisher}>
							<span className="separator">출판: {book.publisher}</span>
							<span className={styles.datetime}>{book.formattedDate}</span>
						</span>
					</p>
				</div>
				<div className={styles.bookInfo}>
					<p>
						판매가 <span className={`separator ${styles.text}`}>{book.discountPrice}원</span>
						<span className={styles.strikethrough}>{book.formattedPrice}원</span>
						{/* {book.disCountText && <strong className={styles.percentage}>{`${book.disCountText}`}</strong>} */}
					</p>
				</div>
			</figcaption>
		</figure>
	);
};

export default BookListItem;
