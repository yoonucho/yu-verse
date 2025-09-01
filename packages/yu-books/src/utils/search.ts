export function buildEffectiveQuery(query: string, keyword: string): string {
  return [query, keyword].filter(Boolean).join(" ");
}

export function shouldAllowSort(query: string | null | undefined, keyword: string | null | undefined): boolean {
  return Boolean((query && query.trim().length > 0) || (keyword && keyword.trim().length > 0));
}

export function toggleKeywordParam(originalParams: URLSearchParams, keyword: string): URLSearchParams {
  const params = new URLSearchParams(originalParams.toString());
  const current = params.get("keyword");
  const next = current === keyword ? null : keyword;

  if (next) params.set("keyword", next);
  else params.delete("keyword");

  params.delete("page");
  return params;
}

export function matchesCategoryKeyword(book: { title?: string; contents?: string; publisher?: string; category?: string }, keyword: string): boolean {
  if (!keyword) return false;
  const hay = [book.category, book.title, book.contents, book.publisher]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes(keyword.toLowerCase());
}
