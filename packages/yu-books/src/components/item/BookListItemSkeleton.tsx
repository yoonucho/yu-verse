import React from 'react';
import styles from './BookListItemSkeleton.module.css';

const BookListItemSkeleton = () => {
  return (
    <div className={styles.skeletonItem}>
      <div className={styles.skeletonContent}>
        <div>
          <div className={`${styles.skeletonText} ${styles.skeletonTitle} ${styles.shimmer}`} />
          <div className={`${styles.skeletonText} ${styles.skeletonLine} ${styles.shimmer}`} />
          <div className={`${styles.skeletonText} ${styles.skeletonLine} ${styles.shimmer}`} />
        </div>
        <div className={`${styles.skeletonText} ${styles.skeletonPrice} ${styles.shimmer}`} />
      </div>
      <div className={`${styles.skeletonImage} ${styles.shimmer}`} />
    </div>
  );
};

export default BookListItemSkeleton;