export type TimeFrame = '1D' | '1W' | '1M' | '3M' | '1Y' | '5Y' | 'ALL';

export interface ChartData {
  t: number; // timestamp
  o: number; // open
  h: number; // high
  l: number; // low
  c: number; // close
  v: number; // volume
}

export interface ProcessedChartData {
  date: number;
  price: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export interface IndicatorData {
  timestamp: number;
  value: number;
  signal?: number;
  histogram?: number;
}

export interface ChartResponse {
  results: ChartData[];
  ticker: string;
}

export interface IndicatorResponse {
  values: IndicatorData[];
  ticker: string;
}
