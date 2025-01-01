import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { CustomTooltip, PRICE_TOOLTIP_FIELDS } from '../common/CustomTooltip';
import type { ProcessedChartData } from '../../types/chart';

interface ChartProps {
  data: ProcessedChartData[];
  height?: number;
}

export const Chart = ({ data, height = 400 }: ChartProps) => {
  const prices = data?.map((d) => d.price) || [];
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const priceMargin = (maxPrice - minPrice) * 0.05;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#2962FF" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#2962FF" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
        <XAxis
          dataKey="date"
          tickFormatter={(timestamp) => new Date(timestamp).toLocaleDateString()}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[minPrice - priceMargin, maxPrice + priceMargin]}
          tick={{ fill: '#6B7280', fontSize: 12 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(value) => `$${value.toFixed(2)}`}
          width={65}
        />

        <Tooltip
          content={({ payload }) => (
            <CustomTooltip payload={payload?.map((p) => ({ payload: p.payload }))} fields={PRICE_TOOLTIP_FIELDS} />
          )}
        />

        <Area
          type="monotone"
          dataKey="price"
          stroke="#2962FF"
          strokeWidth={2}
          fill="url(#colorPrice)"
          isAnimationActive={false}
          dot={false}
          activeDot={{ r: 4, fill: '#2962FF' }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
