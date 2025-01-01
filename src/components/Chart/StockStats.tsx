interface StatsProps {
  marketCap: number;
  dividendYield: number;
  pe: number;
  eps: number;
  netIncome: number;
  revenue: number;
  sharesFloat: number;
  beta: number;
}

export const StockStats = ({
  marketCap,
  dividendYield,
  pe,
  eps,
  netIncome,
  revenue,
  sharesFloat,
  beta,
}: StatsProps) => {
  const formatNumber = (num: number) => {
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
    return num.toFixed(2);
  };

  return (
    <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
      <div>
        <h3 className="text-sm text-gray-500">Market Cap</h3>
        <p className="text-lg font-semibold">${formatNumber(marketCap)}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Dividend Yield</h3>
        <p className="text-lg font-semibold">{dividendYield.toFixed(2)}%</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-500">P/E Ratio (TTM)</h3>
        <p className="text-lg font-semibold">{pe.toFixed(2)}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-500">EPS (TTM)</h3>
        <p className="text-lg font-semibold">${eps.toFixed(2)}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Net Income (FY)</h3>
        <p className="text-lg font-semibold">${formatNumber(netIncome)}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Revenue (FY)</h3>
        <p className="text-lg font-semibold">${formatNumber(revenue)}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Shares Float</h3>
        <p className="text-lg font-semibold">{formatNumber(sharesFloat)}</p>
      </div>
      <div>
        <h3 className="text-sm text-gray-500">Beta (1Y)</h3>
        <p className="text-lg font-semibold">{beta.toFixed(2)}</p>
      </div>
    </div>
  );
};
