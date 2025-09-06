import { useState } from 'react';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './lib/web3';
import Layout from './components/Layout';
import MarketsPage from './pages/MarketsPage';
import CreateMarketPage from './pages/CreateMarketPage';
import PortfolioPage from './pages/PortfolioPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ProfilePage from './pages/ProfilePage';
import MarketDetailPage from './pages/MarketDetailPage';
import TradePage from './pages/TradePage';
import '@rainbow-me/rainbowkit/styles.css';
import './App.css';

const queryClient = new QueryClient();

function App() {
  const [currentPage, setCurrentPage] = useState('markets');
  const [selectedMarketId, setSelectedMarketId] = useState(null);

  const handleViewMarket = (marketId) => {
    setSelectedMarketId(marketId);
    setCurrentPage('market-detail');
  };

  const handleTrade = (marketId) => {
    setSelectedMarketId(marketId);
    setCurrentPage('trade');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'markets':
        return (
          <MarketsPage 
            onViewMarket={handleViewMarket}
            onTrade={handleTrade}
          />
        );
      case 'create':
        return <CreateMarketPage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'profile':
        return <ProfilePage />;
      case 'market-detail':
        return (
          <MarketDetailPage 
            marketId={selectedMarketId}
            onTrade={handleTrade}
            onBack={() => setCurrentPage('markets')}
          />
        );
      case 'trade':
        return (
          <TradePage 
            marketId={selectedMarketId}
            onBack={() => setCurrentPage('markets')}
          />
        );
      default:
        return <MarketsPage onViewMarket={handleViewMarket} onTrade={handleTrade} />;
    }
  };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Layout currentPage={currentPage} onPageChange={setCurrentPage}>
            {renderPage()}
          </Layout>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;

