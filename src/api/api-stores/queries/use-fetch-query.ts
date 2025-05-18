import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { fetchGet } from "../../../lib/custom-fetch";

// import { BASE_URL } from "@/constants/base-url.constants";
// import { fetchGet } from "@/lib/custom-fetch";
// import { BaseUrlType } from "@/types/base-url.types";

export interface TPagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface Result<T> {
  data: T;
  totalItems: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
}

interface ApiResponse<T> {
  status: boolean;
  message: string;
  result?: Result<T>;
  data?: T;
  pagination?: TPagination;
}

export interface UseFetchDataOptions<T> {
  url: string;
  params?: Record<string, any>;
  isEnabled?: boolean | (() => boolean);
  queryOptions?: Omit<
    UseQueryOptions<ApiResponse<T>, any>,
    "queryKey" | "queryFn"
  >;
  //   base?: BaseUrlType;
  retry?: number;
}

const useFetchQuery = <T>({
  url,
  params = {},
  isEnabled = true,
  queryOptions,
  //   base = BASE_URL.DEFAULT,
  retry = 3,
}: UseFetchDataOptions<T>) => {
  const queryKey = [url, { ...params }];

  const { data, isLoading, error, isFetching, refetch } = useQuery<
    ApiResponse<T>,
    any
  >({
    queryKey,
    queryFn: () => fetchGet(url, params),
    enabled: typeof isEnabled === "function" ? isEnabled() : isEnabled,
    retry,
    ...queryOptions,

    // refetchInterval
    // staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const responseData = data?.data || (data?.result?.data as T);

  const paginationData = data?.pagination
    ? data?.pagination
    : data?.result
    ? {
        totalItems: data.result.totalItems,
        totalPages: data.result.totalPages,
        currentPage: data.result.currentPage,
        pageSize: data.result.pageSize,
      }
    : undefined;

  return {
    data: responseData,
    pagination: paginationData,
    isLoading,
    error,
    isFetching,
    refetch,
  };
};

export default useFetchQuery;
