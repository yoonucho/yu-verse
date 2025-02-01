// 공통 데이터
export type CommonBookInfo = {
	isbn: number;
	bookClassName: string;
	relatedKeywords: string;
};

// 도서 리스트 데이터
export type BookListInfo = {
	authors: string[];
	contents: string;
	datetime: string;
	isbn: number;
	price: number;
	publisher: string;
	sale_price: number;
	status: string;
	thumbnail: string;
	title: string;
	translators: string[];
	url: string;
};

export type MetaInfo = {
	is_end: boolean;
	pageable_count: number;
	total_count: number;
};

export type BookResponse = {
	documents: BookListInfo[]; // 도서 리스트
	meta: MetaInfo; // 메타 정보
};

export type BookStore = {
	query: string; // 검색어
	searchInput: string; //실시간 입력값
	selectedKeyword: string; // 선택된 카테고리 키워드
	documents: BookListInfo[]; // 도서 리스트
	meta: MetaInfo | null; // 메타 정보
	isLoading: boolean; // 로딩 상태
	error: string | null; // 에러 메시지
	currentPage: number; // 현재 페이지 상태
	sortOption: 'asc' | 'desc' | ''; // 가격 정렬 옵션 (초기값은 "")

	setQuery: (query: string) => void; // 검색어 설정 함수
	setSearchInput: (input: string) => void,
	setSelectedKeyword: (keyword: string) => void; // 선택된 카테고리 설정 함수
	setCurrentPage: (page: number) => void; // 페이지 변경 핸들러
	setSortOption: (option: 'asc' | 'desc' | '') => void; // 정렬 옵션 설정
	fetchBooks: () => Promise<void>; // 도서 검색 함수
	resetSearch: () => void; // 검색어 초기화 함수
};

export type KeywordBookResponse = BookResponse & {
	meta: MetaInfo;
};

// 포맷팅된 도서 정보 타입 정의
export type FormattedBookInfo = {
	formattedPrice: string;
	// disCountText: string;
	discountPrice: string;
	formattedDate: string;
};

export type FormattedBookListInfo = BookListInfo & FormattedBookInfo;

export type BookListItemProps = {
	book: FormattedBookListInfo;
};

export type SearchInputProps = {
	value: string;
	onReset: () => void; 
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// 필터 옵션 데이터
export type FilterState = {
	filters: {
		relatedKeywords: string[];
		priceSortOrder?: 'asc' | 'desc' | undefined;
		bookTypeTags: string[];
		title: string;
		author: string;
		publisher: string;
		isbn: string;
		// [key: string]: string | string[] | undefined;
	};
	appliedFilters: {
		relatedKeywords: string[];
		priceSortOrder?: 'asc' | 'desc';
		bookTypeTags: string[];
		title: string;
		author: string;
		publisher: string;
		isbn: string;
		// [key: string]: string | string[] | undefined;
	};
	isFiltered: boolean;
	filterType: string | null;
	selectedOptions: string[];
};

export type FilterStore = {
	filters: FilterState['filters']; // 현재 설정된 필터
	appliedFilters: FilterState['appliedFilters']; // 적용된 필터
	filterType: 'relatedKeywords' | 'priceSortOrder' | null; // 필터 타입
	isFiltered?: boolean; // 필터 적용 여부
	selectedOptions: string[]; // 선택된 옵션
	setFilter: (type: keyof FilterState['filters'], value: string | 'asc' | 'desc' | string[] | undefined) => void; // 필터 설정 함수
	clearFilters: () => void; // 필터 초기화 함수
	applyFilters: () => void; // 필터 적용 함수
	toggleOption: (option: string) => void; // 옵션 토글 함수
	setFiltered: (isFiltered: boolean) => void; // 필터 적용 여부 설정 함수
};

export type FilterButtonProps = {
	onReset: () => void;
}

// 페이지 네이션 데이터
export type PaginationProps = {
	onPageChange: (page: number) => void;
};

// 페이지네이션 상태 타입 정의
export type PaginationState = {
	currentPage: number;
	totalPage: number;
	pageBlock: number;
	setCurrentPage: (page: number) => void;
	setTotalPage: (total: number) => void;
	resetPagination: () => void; // 페이지네이션 초기화 함수
};
