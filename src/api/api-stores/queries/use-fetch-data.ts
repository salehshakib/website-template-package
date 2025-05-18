import { useEffect, useState } from "react";
import { fetchGet } from "../../../lib/custom-fetch";

interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface UseFetchDataProps {
  url: string;
  params?: Record<string, any>;
}

export function useFetchData<T = any>({ url, params }: UseFetchDataProps) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [pagination, setPagination] = useState<Pagination | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    if (!url) return;

    setIsLoading(true);
    setError(null);

    fetchGet(url, params)
      .then((res) => {
        // Extract response data
        const responseData: T | undefined = res?.data ?? res?.result?.data;

        // Extract pagination
        let paginationData: Pagination | undefined;
        if (res?.pagination) {
          paginationData = res.pagination;
        } else if (res?.result) {
          const r = res.result;
          paginationData = {
            totalItems: r.totalItems ?? 0,
            totalPages: r.totalPages ?? 0,
            currentPage: r.currentPage ?? 0,
            pageSize: r.pageSize ?? 0,
          };
        } else {
          paginationData = undefined;
        }

        setData(responseData);
        setPagination(paginationData);
      })
      .catch((err) => {
        setError(err);
        setData(undefined);
        setPagination(undefined);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url, JSON.stringify(params)]);

  return { data, pagination, isLoading, error };
}
