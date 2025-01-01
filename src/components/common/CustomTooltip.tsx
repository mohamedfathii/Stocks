import type { TooltipProps } from 'recharts';
import { formatNumber } from '../../utils/formatters';

export interface TooltipData {
  label: string | number;
  value: number;
  [key: string]: unknown;
}

interface CustomTooltipProps extends Omit<TooltipProps<number, string>, 'payload'> {
  payload?: Array<{ payload: Record<string, number> }>;
  fields?: Array<{
    key: string;
    label: string;
    format?: (value: number) => string;
  }>;
}

export const CustomTooltip = ({ active, payload, label, fields }: CustomTooltipProps) => {
  if (!active || !payload?.length) return null;

  const data = payload[0].payload;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-lg">
      <p className="mb-2 text-sm text-gray-600">
        {typeof label === 'number'
          ? new Date(label).toLocaleDateString(undefined, {
              weekday: 'short',
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })
          : label}
      </p>
      <div className="space-y-1">
        {fields?.map(({ key, label, format }) => (
          <p key={key} className="text-sm">
            <span className="text-gray-500">{label}:</span>{' '}
            <span className="font-semibold">{format ? format(data[key]) : data[key]}</span>
          </p>
        ))}
      </div>
    </div>
  );
};

// Preset configurations
export const PRICE_TOOLTIP_FIELDS = [
  { key: 'open', label: 'Open', format: (v: number) => `$${v.toFixed(2)}` },
  { key: 'high', label: 'High', format: (v: number) => `$${v.toFixed(2)}` },
  { key: 'low', label: 'Low', format: (v: number) => `$${v.toFixed(2)}` },
  { key: 'price', label: 'Close', format: (v: number) => `$${v.toFixed(2)}` },
  { key: 'volume', label: 'Volume', format: formatNumber },
];

export const INDICATOR_TOOLTIP_FIELDS = [
  { key: 'value', label: 'Value', format: (v: number) => v.toFixed(2) },
  { key: 'signal', label: 'Signal', format: (v: number) => v?.toFixed(2) },
  { key: 'histogram', label: 'Histogram', format: (v: number) => v?.toFixed(2) },
];
