import axios from 'axios';
import type { PolygonResponse } from '../types/stock';
import type { ChartResponse } from '../types/chart';
import type { TimeFrame } from '../types/chart';

const API_KEY = 'OKk6dP29KpA7k_NbrmgXudQ8_HmS5by7';
const API_BASE_URL = 'https://api.polygon.io';
const INDICATOR_BASE_URL = '/v1/indicators';

interface FetchStocksParams {
  market: string;
  exchange: string;
  active: boolean;
  limit: number;
  cursor?: string;
}

interface SearchStocksParams {
  search: string;
  market: string;
  exchange: string;
  active: boolean;
  limit: number;
}

interface IndicatorParams {
  from: string;
  to: string;
  timeframe: TimeFrame;
}

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

export const fetchStocks = async (cursor?: string): Promise<PolygonResponse> => {
  const params: FetchStocksParams = {
    market: 'stocks',
    exchange: 'XNAS',
    active: true,
    limit: 100,
  };

  if (cursor) {
    params.cursor = cursor;
  }

  const response = await api.get<PolygonResponse>('/v3/reference/tickers', { params });
  return response.data;
};

export const searchStocks = async (query: string): Promise<PolygonResponse> => {
  const params: SearchStocksParams = {
    search: query,
    market: 'stocks',
    exchange: 'XNAS',
    active: true,
    limit: 10,
  };

  const response = await api.get<PolygonResponse>('/v3/reference/tickers', { params });
  return response.data;
};

export const fetchStockChart = async (ticker: string, timeframe: TimeFrame): Promise<ChartResponse> => {
  const now = new Date();
  const timeframeToParams = {
    '1D': { timespan: 'minute', from: new Date(now.setDate(now.getDate() - 1)) },
    '1W': { timespan: 'hour', from: new Date(now.setDate(now.getDate() - 7)) },
    '1M': { timespan: 'day', from: new Date(now.setMonth(now.getMonth() - 1)) },
    '3M': { timespan: 'day', from: new Date(now.setMonth(now.getMonth() - 3)) },
    '1Y': { timespan: 'day', from: new Date(now.setFullYear(now.getFullYear() - 1)) },
    '5Y': { timespan: 'week', from: new Date(now.setFullYear(now.getFullYear() - 5)) },
    ALL: { timespan: 'week', from: new Date(2000, 0, 1) },
  } as const;

  const { timespan, from } = timeframeToParams[timeframe];
  const to = new Date();

  const response = await api.get<ChartResponse>(
    `v2/aggs/ticker/${ticker}/range/1/${timespan}/${from.toISOString().split('T')[0]}/${to.toISOString().split('T')[0]}`,
  );
  return response.data;
};

export const fetchIndicator = async (
  ticker: string,
  type: 'sma' | 'ema' | 'macd' | 'rsi',
  timeframe: TimeFrame = '1Y',
) => {
  const now = new Date();
  const from = new Date(now.setFullYear(now.getFullYear() - 1));

  const params: IndicatorParams = {
    from: from.toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0],
    timeframe,
  };

  const response = await api.get(`${INDICATOR_BASE_URL}/${type}/${ticker}`, { params });
  return response.data?.results;
};
