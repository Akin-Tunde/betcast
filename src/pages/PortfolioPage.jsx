import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Clock, 
  Trophy,
  Activity,
  Wallet,
  Target,
  Calendar
} from 'lucide-react';
import { formatEther } from '@/lib/web3';

const PortfolioPage = () => {
  const [portfolio, setPortfolio] = useState(null);
  const [positions, setPositions] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockPortfolio = {
    totalInvested: 5000e18,
    totalWinnings: 6500e18,
    unrealizedPnL: 800e18,
    realizedPnL: 700e18,
    tradeCount: 45,
    winRate: 68.9,
    avgReturn: 12.5,
    bestTrade: 450e18,
    worstTrade: -120e18
  };

  const mockPositions = [
    {
      marketId: 1,
      question: "Will Bitcoin reach $100,000 by the end of 2024?",
      optionName: "Yes",
      shares: 150,
      avgPrice: 0.65e18,
      currentPrice: 0.72e18,
      invested: 97.5e18,
      currentValue: 108e18,
      pnl: 10.5e18,
      pnlPercent: 10.77,
      endTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
      status: 'active'
    },
    {
      marketId: 2,
      question: "Who will win the 2024 NBA Championship?",
      optionName: "Lakers",
      shares: 200,
      avgPrice: 0.25e18,
      currentPrice: 0.30e18,
      invested: 50e18,
      currentValue: 60e18,
      pnl: 10e18,
      pnlPercent: 20,
      endTime: Date.now() + 60 * 24 * 60 * 60 * 1000,
      status: 'active'
    },
    {
      marketId: 3,
      question: "Will AI achieve AGI by 2030?",
      optionName: "No",
      shares: 100,
      avgPrice: 0.60e18,
      currentPrice: 0.55e18,
      invested: 60e18,
      currentValue: 55e18,
      pnl: -5e18,
      pnlPercent: -8.33,
      endTime: Date.now() + 90 * 24 * 60 * 60 * 1000,
      status: 'active'
    },
    {
      marketId: 4,
      question: "2024 US Presidential Election Winner",
      optionName: "Candidate A",
      shares: 300,
      avgPrice: 0.45e18,
      currentPrice: 0,
      invested: 135e18,
      currentValue: 300e18,
      pnl: 165e18,
      pnlPercent: 122.22,
      endTime: Date.now() - 10 * 24 * 60 * 60 * 1000,
      status: 'won'
    }
  ];

  const mockTradeHistory = [
    {
      id: 1,
      marketId: 1,
      question: "Will Bitcoin reach $100,000 by the end of 2024?",
      type: 'buy',
      optionName: 'Yes',
      quantity: 50,
      price: 0.65e18,
      total: 32.5e18,
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000
    },
    {
      id: 2,
      marketId: 2,
      question: "Who will win the 2024 NBA Championship?",
      type: 'buy',
      optionName: 'Lakers',
      quantity: 200,
      price: 0.25e18,
      total: 50e18,
      timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000
    },
    {
      id: 3,
      marketId: 5,
      question: "Will Tesla stock hit $300 this year?",
      type: 'sell',
      optionName: 'Yes',
      quantity: 100,
      price: 0.80e18,
      total: 80e18,
      timestamp: Date.now() - 7 * 24 * 60 * 60 * 1000
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setPortfolio(mockPortfolio);
      setPositions(mockPositions);
      setTradeHistory(mockTradeHistory);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline">Active</Badge>;
      case 'won':
        return <Badge className="bg-green-500">Won</Badge>;
      case 'lost':
        return <Badge variant="destructive">Lost</Badge>;
      case 'expired':
        return <Badge variant="secondary">Expired</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPnLColor = (pnl) => {
    if (pnl > 0) return 'text-green-600 dark:text-green-400';
    if (pnl < 0) return 'text-red-600 dark:text-red-400';
    return 'text-slate-600 dark:text-slate-400';
  };

  const getPnLIcon = (pnl) => {
    if (pnl > 0) return <TrendingUp className="w-4 h-4" />;
    if (pnl < 0) return <TrendingDown className="w-4 h-4" />;
    return null;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Portfolio
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Track your positions, performance, and trading history
        </p>
      </div>

      {/* Portfolio Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Value</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${formatEther(portfolio.totalInvested + portfolio.unrealizedPnL)}
                </p>
              </div>
              <Wallet className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total P&L</p>
                <p className={`text-2xl font-bold ${getPnLColor(portfolio.realizedPnL + portfolio.unrealizedPnL)}`}>
                  ${formatEther(portfolio.realizedPnL + portfolio.unrealizedPnL)}
                </p>
              </div>
              {getPnLIcon(portfolio.realizedPnL + portfolio.unrealizedPnL) || <BarChart3 className="w-8 h-8 text-slate-400" />}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Win Rate</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {portfolio.winRate}%
                </p>
              </div>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Trades</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {portfolio.tradeCount}
                </p>
              </div>
              <Activity className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Realized P&L</span>
              <span className={`font-semibold ${getPnLColor(portfolio.realizedPnL)}`}>
                ${formatEther(portfolio.realizedPnL)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Unrealized P&L</span>
              <span className={`font-semibold ${getPnLColor(portfolio.unrealizedPnL)}`}>
                ${formatEther(portfolio.unrealizedPnL)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Average Return</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {portfolio.avgReturn}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Best Trade</span>
              <span className="font-semibold text-green-600 dark:text-green-400">
                +${formatEther(portfolio.bestTrade)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-600 dark:text-slate-400">Worst Trade</span>
              <span className="font-semibold text-red-600 dark:text-red-400">
                ${formatEther(portfolio.worstTrade)}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Portfolio Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {positions.filter(p => p.status === 'active').map((position, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium truncate flex-1 mr-2">
                      {position.question}
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      ${formatEther(position.currentValue)}
                    </span>
                  </div>
                  <Progress 
                    value={(Number(position.currentValue) / Number(portfolio.totalInvested + portfolio.unrealizedPnL)) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Positions and History */}
      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="positions">Active Positions</TabsTrigger>
          <TabsTrigger value="history">Trade History</TabsTrigger>
        </TabsList>

        <TabsContent value="positions" className="space-y-4">
          {positions.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No active positions
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Start trading to see your positions here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {positions.map((position, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {getStatusBadge(position.status)}
                          <Badge variant="outline">{position.optionName}</Badge>
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {position.question}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <span>{position.shares} shares</span>
                          <span>Avg: ${formatEther(position.avgPrice)}</span>
                          <span>Current: ${formatEther(position.currentPrice)}</span>
                        </div>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-4 lg:items-center">
                        <div className="text-right">
                          <p className="text-sm text-slate-600 dark:text-slate-400">Invested</p>
                          <p className="font-semibold">${formatEther(position.invested)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600 dark:text-slate-400">Current Value</p>
                          <p className="font-semibold">${formatEther(position.currentValue)}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-slate-600 dark:text-slate-400">P&L</p>
                          <div className={`font-semibold flex items-center gap-1 ${getPnLColor(position.pnl)}`}>
                            {getPnLIcon(position.pnl)}
                            <span>${formatEther(Math.abs(position.pnl))} ({position.pnlPercent > 0 ? '+' : ''}{position.pnlPercent.toFixed(2)}%)</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            View Market
                          </Button>
                          {position.status === 'active' && (
                            <Button size="sm">
                              Trade
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {tradeHistory.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No trade history
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Your completed trades will appear here
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {tradeHistory.map((trade, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant={trade.type === 'buy' ? 'default' : 'secondary'}>
                            {trade.type.toUpperCase()}
                          </Badge>
                          <Badge variant="outline">{trade.optionName}</Badge>
                        </div>
                        <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                          {trade.question}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                          <span>{trade.quantity} shares</span>
                          <span>@ ${formatEther(trade.price)}</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(trade.timestamp).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-slate-600 dark:text-slate-400">Total</p>
                        <p className="text-lg font-semibold text-slate-900 dark:text-white">
                          ${formatEther(trade.total)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioPage;

