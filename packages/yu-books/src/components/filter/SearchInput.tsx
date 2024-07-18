import { SearchInputProps } from "@/types/BookInfo";

import styles from "./searchInput.module.css";

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => {
	return (
		<div className={styles.searchBoxBar}>
			<div className={styles.searchBox}>
				<div className={styles.container}>
					<input type="text" placeholder="검색어를 입력하세요" value={value} onChange={onChange} className={styles.searchInput} />
				</div>
			</div>
		</div>
	);
};

export default SearchInput;
