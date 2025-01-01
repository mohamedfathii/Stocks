import { StockList } from './components/StockList';
import { AlertProvider } from './contexts/AlertContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AlertProvider>
        <div className="min-h-screen bg-gray-50">
          <h1 className="p-4 text-2xl font-bold">NASDAQ Stocks</h1>
          <StockList />
        </div>
      </AlertProvider>
    </QueryClientProvider>
  );
}

export default App;
