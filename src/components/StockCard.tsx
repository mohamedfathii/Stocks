interface StockCardProps {
  ticker: string;
  name: string;
  currency: string;
  onClick: (ticker: string) => void;
}

export const StockCard = ({ ticker, name, currency, onClick }: StockCardProps) => (
  <div
    onClick={() => onClick(ticker)}
    className="cursor-pointer rounded-lg border bg-white p-4 shadow transition-shadow hover:shadow-lg"
  >
    <h2 className="text-xl font-semibold">{ticker}</h2>
    <p className="text-gray-600">{name}</p>
    <p className="text-sm text-gray-500">Currency: {currency}</p>
  </div>
); 