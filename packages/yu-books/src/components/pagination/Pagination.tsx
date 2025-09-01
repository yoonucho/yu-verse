'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { PaginationProps } from '@/types/BookInfo';
import styles from './pagination.module.css';

export default function Pagination({ totalItems, itemsPerPage = 10 }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // Render pagination even for a single page; hide only when no items
  if (!totalItems) return null;

  const totalPage = Math.ceil(totalItems / itemsPerPage);
  const pageBlock = 10;

  // 기존 페이지 계산 로직 유지
  const startPage = Math.ceil(currentPage / pageBlock) * pageBlock - pageBlock + 1;
  const endPage = Math.min(Math.ceil(currentPage / pageBlock) * pageBlock, totalPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPage || page === currentPage) {
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <nav aria-label="Page navigation" className={styles.pageWrap}>
      <div className={`${styles.inner} scrollbar`}>
        <div className={`${styles.pageArrow} ${styles.pageItem}`}>
          <button
            type="button"
            className={`${styles.pageLink} ${currentPage <= pageBlock ? styles.disabled : ''}`}
            aria-label="First"
            onClick={() => handlePageChange(1)}
            disabled={currentPage <= pageBlock}
          >
            <Image src="/assets/images/arrow-start.svg" width={12} height={12} alt="First" />
          </button>
        </div>
        <div className={`${styles.pageArrow} ${styles.pageItem}`}>
          <button
            type="button"
            className={`${styles.pageLink} ${currentPage <= pageBlock ? styles.disabled : ''}`}
            aria-label="Previous Block"
            onClick={() => handlePageChange(startPage - 1)}
            disabled={currentPage <= pageBlock}
          >
            <Image src="/assets/images/arrow-left.svg" width={12} height={12} alt="prev" />
          </button>
        </div>

        <ul className={styles.pagination}>
          {pageNumbers.map((pageNumber) => (
            <li key={pageNumber} className={styles.pageItem}>
              <button
                type="button"
                className={`${styles.pageLink} ${pageNumber === currentPage ? styles.active : ''}`}
                onClick={() => handlePageChange(pageNumber)}
              >
                <span>{pageNumber}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className={`${styles.pageArrow} ${styles.pageItem}`}>
          <button
            type="button"
            className={`${styles.pageLink} ${endPage >= totalPage ? styles.disabled : ''}`}
            aria-label="Next Block"
            onClick={() => handlePageChange(endPage + 1)}
            disabled={endPage >= totalPage}
          >
            <span className={styles.reverse}>
              <Image src="/assets/images/arrow-left.svg" width={12} height={12} alt="next" />
            </span>
          </button>
        </div>
        <div className={`${styles.pageArrow} ${styles.pageItem}`}>
          <button
            type="button"
            className={`${styles.pageLink} ${endPage >= totalPage ? styles.disabled : ''}`}
            aria-label="Last"
            onClick={() => handlePageChange(totalPage)}
            disabled={endPage >= totalPage}
          >
            <span className={styles.reverse}>
              <Image src="/assets/images/arrow-start.svg" width={12} height={12} alt="end" />
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}
