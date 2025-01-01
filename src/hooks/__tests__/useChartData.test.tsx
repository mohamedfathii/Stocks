import * as React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useChartData } from '../useChartData';
import { fetchStockChart, fetchIndicator } from '../../services/api';

jest.mock('../../services/api');

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useChartData', () => {
  beforeEach(() => {
    queryClient.clear();
    jest.clearAllMocks();
  });

  it('should fetch all data successfully', async () => {
    const mockChartData = { results: [{ t: 1, c: 100 }] };
    const mockIndicatorData = { values: [{ timestamp: 1, value: 100 }] };

    (fetchStockChart as jest.Mock).mockResolvedValueOnce(mockChartData);
    (fetchIndicator as jest.Mock).mockResolvedValueOnce(mockIndicatorData);

    const { result } = renderHook(() => useChartData('AAPL', '1Y'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.chartData).toEqual(mockChartData);
    expect(result.current.smaData).toEqual(mockIndicatorData);
  });

  it('should handle errors', async () => {
    (fetchStockChart as jest.Mock).mockRejectedValueOnce(new Error('API Error'));
    (fetchIndicator as jest.Mock).mockResolvedValue({ values: [] }); // Explicitly mock to avoid ambiguity

    const { result } = renderHook(() => useChartData('AAPL', '1Y'), { wrapper });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.chartData).toBeUndefined();
    expect(result.current.error).toBeDefined(); // If error is part of the hook's state
    expect(result.current.error?.message).toBe('API Error'); // Optional, if `message` exists
  });
});
