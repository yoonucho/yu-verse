import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";

export default function useSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("query") || "";

  // The local state for the input field, synchronized with the URL query param
  const [searchInput, setSearchInput] = useState(currentQuery);

  // Update local state if the URL changes (e.g., browser back/forward)
  useEffect(() => {
    setSearchInput(currentQuery);
  }, [currentQuery]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value.length >= 2) {
          params.set("query", value);
          params.delete("page"); // Reset to first page on new search
          router.push(`${pathname}?${params.toString()}`);
        } else if (value.length === 0) {
            // If the search is cleared, remove the query param
            params.delete("query");
            params.delete("page");
            params.delete("sort");
            router.push(`${pathname}?${params.toString()}`);
        }
      }, 500), // 500ms debounce delay
    [searchParams, pathname, router]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleResetSearch = () => {
    setSearchInput("");
    router.push(pathname); // Navigate to the page without any search params
  };

  const handleKeywordClick = (keyword: string) => {
    setSearchInput(keyword);
    const params = new URLSearchParams();
    params.set("query", keyword);
    router.push(`${pathname}?${params.toString()}`);
  };

  return {
    searchInput,
    handleInputChange,
    handleResetSearch,
    handleKeywordClick,
  };
}
