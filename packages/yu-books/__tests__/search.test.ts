import {
  buildEffectiveQuery,
  shouldAllowSort,
  toggleKeywordParam,
  matchesCategoryKeyword,
} from "@/utils/search";
import { BookListInfo } from "@/types/BookInfo";

describe("buildEffectiveQuery", () => {
  it("returns empty string for no inputs", () => {
    expect(buildEffectiveQuery("", "")).toBe("");
  });
  it("returns query when only query provided", () => {
    expect(buildEffectiveQuery("해리포터", "")).toBe("해리포터");
  });
  it("returns keyword when only keyword provided", () => {
    expect(buildEffectiveQuery("", "소설")).toBe("소설");
  });
  it("joins with space when both provided", () => {
    expect(buildEffectiveQuery("해리포터", "소설")).toBe("해리포터 소설");
  });
});

describe("shouldAllowSort", () => {
  it("disallows when both empty", () => {
    expect(shouldAllowSort("", "")).toBe(false);
  });
  it("allows when query exists", () => {
    expect(shouldAllowSort("입력", "")).toBe(true);
  });
  it("allows when keyword exists", () => {
    expect(shouldAllowSort("", "소설")).toBe(true);
  });
});

describe("toggleKeywordParam", () => {
  it("adds keyword when different from current and removes page", () => {
    const params = new URLSearchParams("query=입력&page=2");
    const next = toggleKeywordParam(params, "소설");
    expect(next.get("keyword")).toBe("소설");
    expect(next.get("page")).toBeNull();
  });

  it("removes keyword when same clicked again and removes page", () => {
    const params = new URLSearchParams("query=입력&keyword=소설&page=3");
    const next = toggleKeywordParam(params, "소설");
    expect(next.get("keyword")).toBeNull();
    expect(next.get("page")).toBeNull();
  });

  it("should preserve other params like 'sort' when toggling", () => {
    const params = new URLSearchParams("query=입력&sort=asc&page=4");
    const next = toggleKeywordParam(params, "소설");
    expect(next.get("sort")).toBe("asc");
    expect(next.get("keyword")).toBe("소설");
    expect(next.get("page")).toBeNull();
  });
});

describe("matchesCategoryKeyword", () => {
  const sampleBook: Partial<BookListInfo> = {
    title: "대단한 소설",
    contents: "흥미로운 이야기",
    publisher: "좋은 출판사",
    category: "현대 문학",
  };

  it("should find keyword in title", () => {
    expect(matchesCategoryKeyword(sampleBook, "소설")).toBe(true);
  });

  it("should find keyword in contents", () => {
    expect(matchesCategoryKeyword(sampleBook, "이야기")).toBe(true);
  });

  it("should find keyword in publisher", () => {
    expect(matchesCategoryKeyword(sampleBook, "출판사")).toBe(true);
  });

  it("should find keyword in category", () => {
    expect(matchesCategoryKeyword(sampleBook, "문학")).toBe(true);
  });

  it("should be case-insensitive", () => {
    expect(matchesCategoryKeyword(sampleBook, "대단한 소설")).toBe(true);
  });

  it("should return false if keyword not found", () => {
    expect(matchesCategoryKeyword(sampleBook, "없는키워드")).toBe(false);
  });

  it("should handle missing fields gracefully", () => {
    const bookWithMissingFields: Partial<BookListInfo> = {
      title: "제목만 있는 책",
    };
    expect(matchesCategoryKeyword(bookWithMissingFields, "제목")).toBe(true);
    expect(matchesCategoryKeyword(bookWithMissingFields, "없는내용")).toBe(
      false
    );
  });
});

// buildEffectiveQuery 추가 테스트
describe("buildEffectiveQuery - 에지 케이스", () => {
  it("handles special characters", () => {
    expect(buildEffectiveQuery("해리포터 & 친구들", "판타지")).toBe(
      "해리포터 & 친구들 판타지"
    );
  });
  it("handles empty inputs", () => {
    expect(buildEffectiveQuery("", "")).toBe("");
    expect(buildEffectiveQuery("query", "")).toBe("query");
    expect(buildEffectiveQuery("", "keyword")).toBe("keyword");
  });
  it("handles long strings", () => {
    const longQuery = "a".repeat(100);
    expect(buildEffectiveQuery(longQuery, "키워드")).toBe(
      longQuery + " 키워드"
    );
  });
});

// shouldAllowSort 추가 테스트
describe("shouldAllowSort - 에지 케이스", () => {
  it("handles null inputs", () => {
    expect(shouldAllowSort(null, "")).toBe(false);
    expect(shouldAllowSort("", null)).toBe(false);
  });
  it("handles whitespace", () => {
    expect(shouldAllowSort("   ", "")).toBe(false);
    expect(shouldAllowSort("", "   ")).toBe(false);
  });
});

// toggleKeywordParam 추가 테스트
describe("toggleKeywordParam - 에지 케이스", () => {
  it("handles special characters in keyword", () => {
    const params = new URLSearchParams("query=입력");
    const next = toggleKeywordParam(params, "소설 & 판타지");
    expect(next.get("keyword")).toBe("소설 & 판타지");
  });
  it("handles multiple keywords (if supported)", () => {
    // 만약 여러 키워드를 지원한다면
    const params = new URLSearchParams("query=입력&keyword=소설");
    const next = toggleKeywordParam(params, "판타지");
    expect(next.get("keyword")).toBe("판타지");
  });
  it("handles empty params", () => {
    const params = new URLSearchParams();
    const next = toggleKeywordParam(params, "소설");
    expect(next.get("keyword")).toBe("소설");
  });
});

// matchesCategoryKeyword 추가 테스트
describe("matchesCategoryKeyword - 에지 케이스", () => {
  it("handles empty book object", () => {
    expect(matchesCategoryKeyword({}, "키워드")).toBe(false);
  });
  it("handles empty keyword", () => {
    const sampleBook: Partial<BookListInfo> = { title: "제목" };
    expect(matchesCategoryKeyword(sampleBook, "")).toBe(false);
  });
  it("handles special characters in keyword", () => {
    const sampleBook: Partial<BookListInfo> = { title: "해리포터 & 친구들" };
    expect(matchesCategoryKeyword(sampleBook, "해리포터 & 친구들")).toBe(true);
  });
  it("handles partial matches with special chars", () => {
    const sampleBook: Partial<BookListInfo> = { contents: "이야기 & 모험" };
    expect(matchesCategoryKeyword(sampleBook, "모험")).toBe(true);
  });
});
