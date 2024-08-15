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
	documents: BookListInfo[];
	meta: MetaInfo;
};

export type BookStore = {
	query: string; // 검색어
	inputValue: string;
	debouncedQuery: string;
	selectedKeyword: string; // 선택된 키워드
	documents: BookListInfo[]; // 도서 리스트
	meta: MetaInfo | null; // 메타 정보
	sortOption: string | null;
	filterType: string | null;
	setQuery: (query: string) => void; // 검색어 설정 함수
	setInputValue: (value: string) => void;
	setSelectedKeyword: (keyword: string) => void; // 선택된 키워드 설정 함수
	setDocuments: (documents: BookListInfo[]) => void; // 도서 리스트 설정 함수
	setMeta: (meta: MetaInfo) => void; // 메타 정보 설정 함수
	setSortOption: (sortOption: string) => void;
	fetchBooks: () => void; // 도서 리스트 불러오는 함수
	resetSearch: () => void; // 검색어 초기화 함수
};

export type KeywordBookResponse = BookResponse & {
	keyword?: string;
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
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

// 필터 옵션 데이터
export type FilterState = {
	filters: {
		relatedKeywords: string[];
		priceSortOrder?: "asc" | "desc";
		bookTypeTags: string[];
		title: string;
		author: string;
		publisher: string;
		isbn: string;
		[key: string]: string | string[] | undefined;
	};
	appliedFilters: {
		relatedKeywords: string[];
		priceSortOrder?: "asc" | "desc";
		bookTypeTags: string[];
		title: string;
		author: string;
		publisher: string;
		isbn: string;
		[key: string]: string | string[] | undefined;
	};
	isFiltered: boolean;
	filterType: string | null;
	selectedOptions: string[];
};

export type FilterStore = {
	filters: FilterState["filters"]; // 현재 설정된 필터
	appliedFilters: FilterState["appliedFilters"]; // 적용된 필터
	filterType: "relatedKeywords" | "priceSortOrder" | null; // 필터 타입
	isFiltered?: boolean; // 필터 적용 여부
	selectedOptions: string[]; // 선택된 옵션
	setFilter: (type: keyof FilterState["filters"], value: string | "asc" | "desc" | string[] | undefined) => void; // 필터 설정 함수
	clearFilters: () => void; // 필터 초기화 함수
	applyFilters: () => void; // 필터 적용 함수
	toggleOption: (option: string) => void; // 옵션 토글 함수
	setFiltered: (isFiltered: boolean) => void; // 필터 적용 여부 설정 함수
};

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
