import axios from 'axios';
import { fetchStocks, fetchStockChart, fetchIndicator, searchStocks } from '../api';
import type { ChartResponse, IndicatorResponse } from '../../types/chart';
import type { PolygonResponse } from '../../types/stock';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

describe('API Service', () => {
  const mockAxios = axios.create();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchStocks', () => {
    const mockResponse: PolygonResponse = {
      results: [
        {
          ticker: 'AAPL',
          name: 'Apple Inc',
          market: 'stocks',
          locale: 'us',
          currency_name: 'USD',
          primary_exchange: 'NASDAQ',
          type: 'CS',
          active: true,
          cik: '0000320193',
          composite_figi: 'BBG000B9XRY4',
          share_class_figi: 'BBG001S5N8V8',
          last_updated_utc: '2024-01-25',
        },
      ],
      status: 'OK',
      request_id: 'test',
      count: 1,
      next_url: 'next-cursor',
    };

    it('fetches stock list successfully', async () => {
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      const result = await fetchStocks();

      expect(mockAxios.get).toHaveBeenCalledWith('/v3/reference/tickers', {
        params: {
          market: 'stocks',
          exchange: 'XNAS',
          active: true,
          limit: 100,
        },
      });
      expect(result).toEqual(mockResponse);
    });

    it('handles cursor pagination', async () => {
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      await fetchStocks('next-cursor');

      expect(mockAxios.get).toHaveBeenCalledWith('/v3/reference/tickers', {
        params: {
          market: 'stocks',
          exchange: 'XNAS',
          active: true,
          limit: 100,
          cursor: 'next-cursor',
        },
      });
    });
  });

  describe('searchStocks', () => {
    const mockResponse: PolygonResponse = {
      results: [
        {
          ticker: 'AAPL',
          name: 'Apple Inc',
          market: 'stocks',
          locale: 'us',
          currency_name: 'USD',
          primary_exchange: 'NASDAQ',
          type: 'CS',
          active: true,
          cik: '0000320193',
          composite_figi: 'BBG000B9XRY4',
          share_class_figi: 'BBG001S5N8V8',
          last_updated_utc: '2024-01-25',
        },
      ],
      status: 'OK',
      request_id: 'test',
      count: 1,
      next_url: 'next-cursor',
    };

    it('searches stocks successfully', async () => {
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      const result = await searchStocks('AAPL');

      expect(mockAxios.get).toHaveBeenCalledWith('/v3/reference/tickers', {
        params: {
          search: 'AAPL',
          market: 'stocks',
          exchange: 'XNAS',
          active: true,
          limit: 10,
        },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('fetchStockChart', () => {
    const mockResponse: ChartResponse = {
      results: [{ t: 1234567890, o: 100, h: 110, l: 90, c: 105, v: 1000 }],
      ticker: 'AAPL',
    };

    it('fetches chart data successfully', async () => {
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      const result = await fetchStockChart('AAPL', '1Y');

      expect(mockAxios.get).toHaveBeenCalledWith(
        expect.stringMatching(/v2\/aggs\/ticker\/AAPL\/range\/1\/day\/\d{4}-\d{2}-\d{2}\/\d{4}-\d{2}-\d{2}/),
      );
      expect(result).toEqual(mockResponse);
    });

    it('handles different timeframes', async () => {
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: mockResponse });
      await fetchStockChart('AAPL', '1D');

      expect(mockAxios.get).toHaveBeenCalledWith(expect.stringMatching(/v2\/aggs\/ticker\/AAPL\/range\/1\/minute/));
    });
  });

  describe('fetchIndicator', () => {
    const mockResponse: IndicatorResponse = {
      values: [{ timestamp: 1234567890, value: 100 }],
      ticker: 'AAPL',
    };

    it('fetches indicator data successfully', async () => {
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: { results: mockResponse } });
      const result = await fetchIndicator('AAPL', 'sma', '1Y');

      expect(mockAxios.get).toHaveBeenCalledWith('/v1/indicators/sma/AAPL', {
        params: expect.objectContaining({
          timeframe: '1Y',
        }),
      });
      expect(result).toEqual(mockResponse);
    });

    it('supports different indicator types', async () => {
      (mockAxios.get as jest.Mock).mockResolvedValueOnce({ data: { results: mockResponse } });
      await fetchIndicator('AAPL', 'macd', '1Y');

      expect(mockAxios.get).toHaveBeenCalledWith('/v1/indicators/macd/AAPL', expect.any(Object));
    });
  });

  describe('Error handling', () => {
    it('propagates errors from the API', async () => {
      const error = new Error('API Error');
      (mockAxios.get as jest.Mock).mockRejectedValueOnce(error);

      await expect(fetchStocks()).rejects.toThrow('API Error');
    });
  });
});
