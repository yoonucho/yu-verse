"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

import Header from "@/components/header/Header";
import BookListSkeleton from "@/components/list/BookListSkeleton";
import styles from "@/app/page.module.css";
import { buildEffectiveQuery } from "@/utils/search";
import QueryDebug from "@/components/debug/QueryDebug";
import SearchResults from "@/components/list/SearchResults";

export default function BookSearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const keyword = searchParams.get("keyword") || "";
  const page = Number(searchParams.get("page") || "1");
  const sort = (searchParams.get("sort") || "") as "" | "asc" | "desc";

  const effectiveQuery = buildEffectiveQuery(query, keyword);
  const apiQuery = query || keyword; // API 호출에는 입력어 우선, 없으면 키워드 단독 사용

  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.log("[SearchDebug:params]", {
      query,
      keyword,
      effectiveQuery,
      apiQuery,
      page,
      sort,
    });
  }

  const headerText = "YU 책 찾기";

  return (
    <main className="container">
      {/* 개발 모드에서만 브라우저 콘솔 파라미터 로깅 */}
      <QueryDebug />
      <Header headerText={headerText} />
      <div className="inner">
        {query || keyword ? (
          <Suspense
            key={effectiveQuery + page + sort}
            fallback={
              <>
                <BookListSkeleton />
              </>
            }
          >
            <SearchResults
              query={apiQuery}
              page={page}
              sort={sort}
              filterKeyword={keyword}
            />
          </Suspense>
        ) : (
          <div className={styles.noData}>
            <Image
              src="/assets/images/message-icon.svg"
              alt="message"
              width={300}
              height={400}
            />
            <p>책을 검색해주세요.</p>
          </div>
        )}
      </div>
    </main>
  );
}
