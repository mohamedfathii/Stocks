import { useQuery } from '@tanstack/react-query';
import type { TimeFrame } from '../types/chart';
import { fetchStockChart, fetchIndicator } from '../services/api';

export const useChartData = (ticker: string, timeframe: TimeFrame) => {
  const {
    data: chartData,
    error: chartError,
    isLoading: isChartLoading,
  } = useQuery({
    queryKey: ['stockChart', ticker, timeframe],
    queryFn: () => fetchStockChart(ticker, timeframe),
    staleTime: 1000 * 60 * 5,
  });

  const { data: smaData, isLoading: isSMALoading } = useQuery({
    queryKey: ['indicator', ticker, 'sma', timeframe],
    queryFn: () => fetchIndicator(ticker, 'sma', timeframe),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

  const { data: emaData, isLoading: isEMALoading } = useQuery({
    queryKey: ['indicator', ticker, 'ema', timeframe],
    queryFn: () => fetchIndicator(ticker, 'ema', timeframe),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

  const { data: macdData, isLoading: isMACDLoading } = useQuery({
    queryKey: ['indicator', ticker, 'macd', timeframe],
    queryFn: () => fetchIndicator(ticker, 'macd', timeframe),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

  const { data: rsiData, isLoading: isRSILoading } = useQuery({
    queryKey: ['indicator', ticker, 'rsi', timeframe],
    queryFn: () => fetchIndicator(ticker, 'rsi', timeframe),
    staleTime: 1000 * 60 * 5,
    enabled: true,
  });

  return {
    chartData,
    smaData,
    emaData,
    macdData,
    rsiData,
    error: chartError,
    isLoading: isChartLoading || isSMALoading || isEMALoading || isMACDLoading || isRSILoading,
  };
};
