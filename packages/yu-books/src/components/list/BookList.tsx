
import Link from "next/link";
import Image from "next/image";

import { FormattedBookListInfo } from "@/types/BookInfo";
import BookListItem from "@/components/item/BookListItem";
import styles from "@/app/book-list/page.module.css";

type BookListProps = {
  books: FormattedBookListInfo[];
};

export default function BookList({ books }: BookListProps) {
  if (!books || books.length === 0) {
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

  return (
    <ul className={styles.bookList} aria-label="검색 결과 리스트">
      {books.map((book) => (
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
  );
}
