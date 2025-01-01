import { Modal } from './common/Modal';
import { StockChart } from './Chart/StockChart';

interface StockSidebarProps {
  ticker: string | null;
  onClose: () => void;
}

export const StockSidebar = ({ ticker, onClose }: StockSidebarProps) => {
  return (
    <Modal isOpen={!!ticker} onClose={onClose} width="max-w-4xl">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white p-4">
        <h2 className="text-xl font-semibold">{ticker}</h2>
        <button onClick={onClose} className="rounded-full p-2 transition-colors hover:bg-gray-100">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="p-4">{ticker && <StockChart ticker={ticker} />}</div>
    </Modal>
  );
};
