import type { TimeFrame } from '../../types/chart';
import { TIME_FRAMES } from '../../constants/chart';

interface TimeframeSelectorProps {
  timeframe: TimeFrame;
  onChange: (timeframe: TimeFrame) => void;
}

export const TimeframeSelector = ({ timeframe, onChange }: TimeframeSelectorProps) => (
  <div className="flex flex-wrap gap-2">
    {TIME_FRAMES.map(({ label, value }) => (
      <button
        key={value}
        onClick={() => onChange(value)}
        className={`rounded-md px-3 py-1 text-sm transition-colors ${
          timeframe === value ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
        }`}
      >
        {label}
      </button>
    ))}
  </div>
);
