import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { fetchStocks, searchStocks } from '../services/api';

const CACHE_TIME = 5 * 60 * 1000; // 5 minutes

export const useStockData = (searchQuery: string) => {
  const search = useQuery({
    queryKey: ['stockSearch', searchQuery],
    queryFn: () => searchStocks(searchQuery),
    enabled: Boolean(searchQuery),
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
  });

  const list = useInfiniteQuery({
    queryKey: ['stocks'],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) => fetchStocks(pageParam),
    getNextPageParam: (lastPage) => new URL(lastPage.next_url || '').searchParams.get('cursor'),
    initialPageParam: undefined,
    enabled: !searchQuery,
    staleTime: CACHE_TIME,
    gcTime: CACHE_TIME,
  });

  return { search, list };
};
