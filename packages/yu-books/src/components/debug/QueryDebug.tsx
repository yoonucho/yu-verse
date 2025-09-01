"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { buildEffectiveQuery } from "@/utils/search";

export default function QueryDebug() {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (process.env.NODE_ENV === "production") return;
    const query = searchParams.get("query") || "";
    const keyword = searchParams.get("keyword") || "";
    const sort = searchParams.get("sort") || "";
    const page = Number(searchParams.get("page") || "1");
    const effectiveQuery = buildEffectiveQuery(query, keyword);
    const apiQuery = query || keyword;
    // eslint-disable-next-line no-console
    console.log("[BrowserDebug]", { query, keyword, sort, page, effectiveQuery, apiQuery });
  }, [searchParams]);

  return null;
}
