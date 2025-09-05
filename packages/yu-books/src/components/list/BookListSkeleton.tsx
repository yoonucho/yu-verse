import React from 'react';
import BookListItemSkeleton from '../item/BookListItemSkeleton';
import styles from '../../app/book-list/page.module.css';

const BookListSkeleton = () => {
  return (
    <ul className={styles.bookList} aria-label="Loading search results">
      {Array.from({ length: 10 }).map((_, index) => (
        <li key={index}>
          <BookListItemSkeleton />
        </li>
      ))}
    </ul>
  );
};

export default BookListSkeleton;
