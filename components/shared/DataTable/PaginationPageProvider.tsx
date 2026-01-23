"use client";

import { IPaginationMetaData } from "@/types";
import { useForm } from "@tanstack/react-form";
import { createContext, useContext, useEffect, useState } from "react";
import z from "zod";

type PaginationPageContextType = {
  page: number;
  setPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;

  total: number;
  limit: number;
  totalPages: number;

  setMeta: (meta: { total: number; limit: number }) => void;
  form: ReturnType<typeof useForm>;
  searchedId: string | undefined;
  clearSearch: () => void;
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

  // Search form
  const form = useForm({
    defaultValues: { search: "" },
    validators: { onSubmit: searchCoinSchema },
    onSubmit: async ({ value }) => {
      setSearchedId(value.search);
    },
  });
  const [searchedId, setSearchedId] = useState<string | undefined>();
  const clearSearch = () => {
    form.reset();
    setSearchedId(undefined);
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
        form,
        searchedId,
        clearSearch,
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

export const searchCoinSchema = z.object({
  search: z.string().min(8).max(16),
});
export type SearchCoinFormValues = z.infer<typeof searchCoinSchema>;
