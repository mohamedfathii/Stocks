import type { TimeFrame } from '../types/chart';

export const TIME_FRAMES: Array<{ label: string; value: TimeFrame }> = [
  { label: '1D', value: '1D' },
  { label: '5D', value: '1W' },
  { label: '1M', value: '1M' },
  { label: '6M', value: '3M' },
  { label: '1Y', value: '1Y' },
  { label: '5Y', value: '5Y' },
  { label: 'ALL', value: 'ALL' },
];

export const CHART_COLORS = {
  primary: '#2962FF',
  success: '#26a69a',
  danger: '#ef5350',
  neutral: '#6B7280',
} as const;

export const TIMEFRAME_PARAMS = {
  '1D': { timespan: 'minute', days: 1 },
  '1W': { timespan: 'hour', days: 7 },
  '1M': { timespan: 'day', days: 30 },
  '3M': { timespan: 'day', days: 90 },
  '1Y': { timespan: 'day', days: 365 },
  '5Y': { timespan: 'week', days: 1825 },
  ALL: { timespan: 'week', days: 3650 },
} as const;
