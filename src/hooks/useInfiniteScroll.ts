import { useEffect } from 'react';

interface UseInfiniteScrollProps {
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  threshold?: number;
}

export const useInfiniteScroll = ({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  threshold = 100,
}: UseInfiniteScrollProps) => {
  useEffect(() => {
    const handleScroll = () => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - threshold;

      if (scrolledToBottom && !isFetchingNextPage && hasNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, threshold]);
};
