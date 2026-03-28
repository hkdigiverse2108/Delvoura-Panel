import { useQuery, type QueryKey, type UseQueryOptions } from "@tanstack/react-query";

export type AppQueryOptions<T> = Omit<UseQueryOptions<T, Error, T, QueryKey>, "queryKey" | "queryFn">;

export function useQueries<T>( queryKey: QueryKey, callback: () => Promise<T>, options?: AppQueryOptions<T>,) {
  return useQuery<T, Error, T, QueryKey>({
    queryKey,
    queryFn: async () => await callback(),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    retry: 0,
    staleTime: 1000 * 60,
    ...options,
  });
}
