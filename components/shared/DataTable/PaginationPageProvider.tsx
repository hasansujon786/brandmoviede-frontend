"use client";

import { IPaginationMetaData } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type PaginationPageContextType = {
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  total: number;
  limit: number;
  totalPages: number;

  setMeta: (meta: { total: number; limit: number }) => void;
};

const PaginationPageContext = createContext<PaginationPageContextType | null>(
  null,
);

export function PaginationPageProvider({
  initialPage = 1,
  children,
}: {
  initialPage?: number;
  children: React.ReactNode;
}) {
  const [page, setPage] = useState(initialPage);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const nextPage = () => setPage((p) => Math.min(p + 1, totalPages));

  const prevPage = () => setPage((p) => Math.max(1, p - 1));

  const setMeta = ({ total, limit }: { total: number; limit: number }) => {
    setTotal(total);
    setLimit(limit);
  };

  return (
    <PaginationPageContext.Provider
      value={{
        page,
        setPage,
        nextPage,
        prevPage,
        total,
        limit,
        totalPages,
        setMeta,
      }}
    >
      {children}
    </PaginationPageContext.Provider>
  );
}

export function usePaginationPage() {
  const ctx = useContext(PaginationPageContext);

  if (!ctx) {
    throw new Error(
      "usePaginationPage must be used within PaginationPageProvider",
    );
  }

  return ctx;
}

export function usePaginatedQuery<
  T extends { meta_data?: IPaginationMetaData },
>(queryResult: T | undefined) {
  const { setMeta } = usePaginationPage();

  useEffect(() => {
    if (queryResult?.meta_data) {
      setMeta(queryResult.meta_data);
    }
  }, [queryResult?.meta_data, setMeta]);
}
