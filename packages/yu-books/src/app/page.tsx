import { Suspense } from "react";
import Image from "next/image";

import Header from "@/components/header/Header";
import BookListSkeleton from "@/components/list/BookListSkeleton";
import SearchResults from "@/components/list/SearchResults";
import styles from "@/app/page.module.css";
import { buildEffectiveQuery } from "@/utils/search";

// This is now a Server Component
export default function BookListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const query = (searchParams?.query as string) || "";
  const keyword = (searchParams?.keyword as string) || "";
  const page = Number((searchParams?.page as string) || "1");
  const sort = ((searchParams?.sort as string) || "") as "" | "asc" | "desc";

  const effectiveQuery = buildEffectiveQuery(query, keyword);
  const apiQuery = query || keyword;

  const headerText = "YU 책 찾기";

  return (
    <main className="container">
      {/* Header is now directly part of the page */}
      <Header headerText={headerText} />
      <div className="inner">
        {query || keyword ? (
          <Suspense
            key={effectiveQuery + page + sort}
            fallback={<BookListSkeleton />}
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
