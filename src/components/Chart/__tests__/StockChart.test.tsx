import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StockChart } from '../StockChart';
import { useChartData } from '../../../hooks/useChartData';

jest.mock('../../../hooks/useChartData');

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

describe('StockChart', () => {
  const mockChartData = {
    results: [
      { t: 1234567890, c: 150 },
      { t: 1234567891, c: 160 },
    ],
  };

  beforeEach(() => {
    (useChartData as jest.Mock).mockReturnValue({
      chartData: mockChartData,
      smaData: { values: [] },
      emaData: { values: [] },
      macdData: { values: [] },
      rsiData: { values: [] },
      isLoading: false,
    });
  });

  it('renders loading state initially', () => {
    (useChartData as jest.Mock).mockReturnValue({ isLoading: true });
    render(<StockChart ticker="AAPL" />, { wrapper });
    expect(screen.getByTestId('loading-state')).toBeInTheDocument();
  });

  it('displays price and price change', () => {
    render(<StockChart ticker="AAPL" />, { wrapper });
    expect(screen.getByText('$160.00')).toBeInTheDocument();
    expect(screen.getByText('+6.67%')).toBeInTheDocument();
  });

  it('changes timeframe when selector is clicked', () => {
    render(<StockChart ticker="AAPL" />, { wrapper });
    fireEvent.click(screen.getByText('1M'));
    expect(screen.getByText('1M')).toHaveClass('bg-blue-100');
  });
});
