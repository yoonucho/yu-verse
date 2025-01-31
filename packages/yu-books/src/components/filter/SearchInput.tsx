import React from 'react';
import { SearchInputProps } from "@/types/BookInfo";

import styles from "./searchInput.module.css";

const SearchInput: React.FC<SearchInputProps> = React.memo(function SearchInput ({ value, onChange }) { // React.memo 사용
	return (
		<div className={styles.searchBoxBar}>
			<div className={styles.searchBox}>
				<div className={styles.container}>
					<input type="text" placeholder="검색어를 입력하세요" value={value} onChange={onChange} className={styles.searchInput} />
				</div>
			</div>
		</div>
	);
});

// displayName을 명시적으로 설정하여 ESLint 경고 해결
SearchInput.displayName = 'SearchInput';

export default SearchInput;
