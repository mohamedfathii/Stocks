import { render, screen } from '@testing-library/react';
import { TechnicalIndicator } from '../TechnicalIndicators';

describe('TechnicalIndicator', () => {
  const mockData = [
    { timestamp: 1234567890, value: 100 },
    { timestamp: 1234567891, value: 110 },
  ];

  it('renders SMA chart correctly', () => {
    render(<TechnicalIndicator data={mockData} type="sma" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });

  it('renders MACD chart with signal and histogram', () => {
    const macdData = mockData.map((d) => ({
      ...d,
      signal: 90,
      histogram: 10,
    }));

    render(<TechnicalIndicator data={macdData} type="macd" />);
    expect(screen.getAllByRole('img')).toHaveLength(3); // Line, Signal, Histogram
  });

  it('handles empty data gracefully', () => {
    render(<TechnicalIndicator data={[]} type="rsi" />);
    expect(screen.getByRole('img')).toBeInTheDocument();
  });
});
