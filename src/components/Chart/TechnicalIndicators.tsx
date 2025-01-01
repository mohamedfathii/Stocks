import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  ComposedChart,
} from 'recharts';
import { CustomTooltip, INDICATOR_TOOLTIP_FIELDS } from '../common/CustomTooltip';

interface IndicatorData {
  timestamp: number;
  value: number;
  signal?: number;
  histogram?: number;
}

interface IndicatorProps {
  data: IndicatorData[];
  height?: number;
  type: 'sma' | 'ema' | 'macd' | 'rsi';
}

export const TechnicalIndicator = ({ data = [], height = 200, type }: IndicatorProps) => {
  const chartData = Array.isArray(data)
    ? data.map((d) => ({
        date: d.timestamp,
        value: d.value,
        signal: d.signal,
        histogram: d.histogram,
      }))
    : [];

  if (type === 'macd') {
    return (
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} width={65} />
          <Tooltip
            content={({ payload }) => (
              <CustomTooltip
                payload={payload?.map((p) => ({ payload: p.payload }))}
                fields={INDICATOR_TOOLTIP_FIELDS}
              />
            )}
          />
          <Line type="monotone" dataKey="value" stroke="#2962FF" dot={false} />
          <Line type="monotone" dataKey="signal" stroke="#FF6B6B" dot={false} />
          <Area type="monotone" dataKey="histogram" fill="#82ca9d" stroke="#82ca9d" />
        </ComposedChart>
      </ResponsiveContainer>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} width={65} />
        <Tooltip
          content={({ payload }) => (
            <CustomTooltip payload={payload?.map((p) => ({ payload: p.payload }))} fields={INDICATOR_TOOLTIP_FIELDS} />
          )}
        />
        <Area type="monotone" dataKey="value" stroke="#2962FF" fill="#2962FF" fillOpacity={0.1} dot={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
