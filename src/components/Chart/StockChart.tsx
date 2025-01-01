import { useState } from 'react';
import type { ChartData, TimeFrame } from '../../types/chart';
import { LoadingState } from '../LoadingState';
import { Chart } from './Chart';
import { TechnicalIndicator } from './TechnicalIndicators';
import { StockStats } from './StockStats';
import { TimeframeSelector } from './TimeframeSelector';
import { useChartData } from '../../hooks/useChartData';

interface StockChartProps {
  ticker: string;
}

export const StockChart = ({ ticker }: StockChartProps) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('1Y');
  const { chartData, smaData, emaData, macdData, rsiData, isLoading } = useChartData(ticker, timeframe);

  if (isLoading) return <LoadingState />;

  const processedChartData = chartData?.results?.map((bar: ChartData) => ({
    date: bar.t,
    price: bar.c,
    open: bar.o,
    high: bar.h,
    low: bar.l,
    volume: bar.v,
  }));

  const latestPrice = processedChartData?.[processedChartData.length - 1]?.price;
  const firstPrice = processedChartData?.[0]?.price;
  const priceChange = latestPrice && firstPrice ? (((latestPrice - firstPrice) / firstPrice) * 100).toFixed(2) : '0';
  const isPositive = Number(priceChange) >= 0;

  return (
    <div className="flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-2xl font-semibold">${latestPrice?.toFixed(2)}</div>
          <div className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}
            {priceChange}%
          </div>
        </div>
      </div>

      <TimeframeSelector timeframe={timeframe} onChange={setTimeframe} />

      <div className="h-[400px]">
        <Chart data={processedChartData ?? []} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'SMA', data: smaData?.values, type: 'sma' as const },
          { title: 'EMA', data: emaData?.values, type: 'ema' as const },
          { title: 'MACD', data: macdData?.values, type: 'macd' as const },
          { title: 'RSI', data: rsiData?.values, type: 'rsi' as const },
        ].map(({ title, data, type }) => (
          <div key={type} className="h-[200px]">
            <h3 className="mb-2 text-sm font-medium">{title}</h3>
            <TechnicalIndicator data={data || []} type={type} />
          </div>
        ))}
      </div>

      <StockStats
        marketCap={3.86e12}
        dividendYield={0.39}
        pe={42.67}
        eps={6.1}
        netIncome={93.74e9}
        revenue={391.04e9}
        sharesFloat={15.1e9}
        beta={0.89}
      />
    </div>
  );
};
