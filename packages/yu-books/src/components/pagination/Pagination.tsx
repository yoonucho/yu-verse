import React from "react";
import Image from "next/image";
import { PaginationProps } from "@/types/BookInfo";

import usePaginationStore from "@/stores/usePaginationStore";
import useBookStore from "@/stores/useBookStore";

import styles from "./pagination.module.css";

const Pagination: React.FC<PaginationProps> = ({ onPageChange }) => {
	const { currentPage, totalPage, pageBlock, setCurrentPage } = usePaginationStore();
	const { fetchBooks } = useBookStore();

	const startPage = Math.ceil(currentPage / pageBlock) * pageBlock - pageBlock + 1;
	const endPage = Math.min(Math.ceil(currentPage / pageBlock) * pageBlock, totalPage);

	const handlePageChange = (page: number) => {
		if (page < 1 || page > totalPage || page === currentPage) {
			return;
		}
		setCurrentPage(page);
		fetchBooks();
		onPageChange(page);
	};

	const calcList = [];
	for (let index = startPage; index <= endPage; index += 1) {
		calcList.push(index);
	}

	return (
		<nav aria-label="Page navigation" className={styles.pageWrap}>
			<div className={`${styles.inner} scrollbar`}>
				<div className={`${styles.pageArrow} ${styles.pageItem}`}>
					<button
						type="button"
						className={`${styles.pageLink} ${currentPage <= pageBlock ? styles.disabled : ""}`}
						aria-label="First"
						onClick={() => handlePageChange(1)}
						disabled={currentPage <= pageBlock}
					>
						<span aria-hidden="true">
							<Image src="/assets/images/arrow-start.svg" width={0} height={0} sizes="100vw" alt="First" />
						</span>
					</button>
				</div>
				<div className={`${styles.pageArrow} ${styles.pageItem}`}>
					<button
						type="button"
						className={`${styles.pageLink} ${currentPage <= pageBlock ? styles.disabled : ""}`}
						aria-label="Previous"
						onClick={() => handlePageChange(Math.max(currentPage - pageBlock, 1))}
						disabled={currentPage <= pageBlock}
					>
						<span aria-hidden="true">
							<Image src="/assets/images/arrow-left.svg" width={0} height={0} sizes="100vw" alt="prev" />
						</span>
					</button>
				</div>
				<ul className={styles.pagination}>
					{calcList.map(paging => (
						<li key={paging} className={styles.pageItem}>
							<button type="button" className={`${styles.pageLink} ${paging === currentPage ? styles.active : ""}`} onClick={() => handlePageChange(paging)}>
								<span>{paging}</span>
							</button>
						</li>
					))}
				</ul>
				<div className={`${styles.pageArrow} ${styles.pageItem}`}>
					<button
						type="button"
						className={`${styles.pageLink} ${startPage + pageBlock > totalPage ? styles.disabled : ""}`}
						aria-label="Next"
						onClick={() => handlePageChange(Math.min(Math.ceil(currentPage / pageBlock) * pageBlock + 1, totalPage))}
						disabled={startPage + pageBlock > totalPage}
					>
						<span className={styles.reverse} aria-hidden="true">
							<Image src="/assets/images/arrow-left.svg" width={0} height={0} sizes="100vw" alt="next" />
						</span>
					</button>
				</div>
				<div className={`${styles.pageArrow} ${styles.pageItem}`}>
					<button
						type="button"
						className={`${styles.pageLink} ${startPage + pageBlock > totalPage ? styles.disabled : ""}`}
						aria-label="Last"
						onClick={() => handlePageChange(totalPage)}
						disabled={startPage + pageBlock > totalPage}
					>
						<span className={styles.reverse} aria-hidden="true">
							<Image src="/assets/images/arrow-start.svg" width={0} height={0} sizes="100vw" alt="end" />
						</span>
					</button>
				</div>
			</div>
		</nav>
	);
};

export default Pagination;
