export interface StockTicker {
  ticker: string;
  name: string;
  market: string;
  locale: string;
  currency_name: string;
  primary_exchange: string;
  type: string;
  active: boolean;
  cik: string;
  composite_figi: string;
  share_class_figi: string;
  last_updated_utc: string;
}

export interface PolygonResponse {
  results: StockTicker[];
  status: string;
  request_id: string;
  count: number;
  next_url: string | null;
}
