import { useState } from 'react';
import type { StockTicker } from '../types/stock';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import { useStockData } from '../hooks/useStockData';
import { SearchBar } from './SearchBar';
import { LoadingState } from './LoadingState';
import { EmptyState } from './EmptyState';
import { StockSidebar } from './StockSidebar';
import { StockCard } from './StockCard';

export const StockList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTicker, setSelectedTicker] = useState<string | null>(null);
  const { search, list } = useStockData(searchQuery);

  useInfiniteScroll({
    fetchNextPage: list.fetchNextPage,
    hasNextPage: list.hasNextPage,
    isFetchingNextPage: list.isFetchingNextPage,
  });

  const renderStockGrid = (stocks: StockTicker[]) => (
    <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3">
      {stocks.map((stock) => (
        <StockCard
          key={stock.ticker}
          ticker={stock.ticker}
          name={stock.name}
          currency={stock.currency_name}
          onClick={handleStockClick}
        />
      ))}
    </div>
  );

  const renderContent = () => {
    if (search.isLoading || list.isLoading) {
      return <LoadingState />;
    }

    if (search.error || list.error) {
      return <div className="p-4 text-center text-red-500">Error: {(search.error || list.error)?.message}</div>;
    }

    if (searchQuery) {
      return search.data?.results?.length ? (
        renderStockGrid(search.data.results)
      ) : (
        <EmptyState searchQuery={searchQuery} />
      );
    }

    return list.data?.pages?.[0].results.length ? (
      <>
        {list.data.pages.map((page, i) => (
          <div key={i}>{renderStockGrid(page.results)}</div>
        ))}
        {list.isFetchingNextPage && <LoadingState message="Loading more..." />}
      </>
    ) : (
      <EmptyState />
    );
  };

  const handleStockClick = (ticker: string) => {
    setSelectedTicker(ticker);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="sticky top-0 z-10 bg-white px-4 py-3 shadow-sm">
        <SearchBar onSearch={setSearchQuery} placeholder="Search by ticker or company name..." debounceTime={500} />
      </div>
      {renderContent()}
      {selectedTicker && <StockSidebar ticker={selectedTicker} onClose={() => setSelectedTicker(null)} />}
    </div>
  );
};
