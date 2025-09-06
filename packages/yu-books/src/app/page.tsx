import { Suspense } from "react";

import BookListSkeleton from "@/components/list/BookListSkeleton";
import BookSearchClient from "@/components/search/BookSearchClient";

export default function BookListPage() {
  return (
    <Suspense fallback={<BookListSkeleton />}>
      <BookSearchClient />
    </Suspense>
  );
}