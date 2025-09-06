import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Users, 
  DollarSign, 
  BarChart3,
  Calendar,
  Info,
  AlertCircle,
  CheckCircle,
  Share2
} from 'lucide-react';
import { formatEther } from '@/lib/web3';

const MarketDetailPage = ({ marketId, onTrade, onBack }) => {
  const [market, setMarket] = useState(null);
  const [priceHistory, setPriceHistory] = useState([]);
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock market data
  const mockMarket = {
    id: marketId,
    question: "Will Bitcoin reach $100,000 by the end of 2024?",
    description: "This market will resolve to 'Yes' if Bitcoin (BTC) reaches or exceeds $100,000 USD on any major exchange (Coinbase, Binance, Kraken) at any point before December 31, 2024, 11:59 PM UTC. The market will resolve to 'No' if Bitcoin does not reach this price by the deadline.",
    category: "ECONOMICS",
    marketType: "PAID",
    creator: "0x1234...5678",
    createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
    endTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
    resolved: false,
    disputed: false,
    validated: true,
    totalVolume: 125000e18,
    participants: new Array(456),
    options: [
      {
        id: 0,
        name: "Yes",
        description: "Bitcoin will reach $100,000",
        currentPrice: 0.72e18,
        totalShares: 1500,
        totalVolume: 75000e18
      },
      {
        id: 1,
        name: "No", 
        description: "Bitcoin will not reach $100,000",
        currentPrice: 0.28e18,
        totalShares: 800,
        totalVolume: 50000e18
      }
    ]
  };

  const mockPriceHistory = [
    { time: '2024-01-01', yes: 0.45, no: 0.55 },
    { time: '2024-01-02', yes: 0.48, no: 0.52 },
    { time: '2024-01-03', yes: 0.52, no: 0.48 },
    { time: '2024-01-04', yes: 0.55, no: 0.45 },
    { time: '2024-01-05', yes: 0.58, no: 0.42 },
    { time: '2024-01-06', yes: 0.65, no: 0.35 },
    { time: '2024-01-07', yes: 0.72, no: 0.28 }
  ];

  const mockTrades = [
    {
      id: 1,
      type: 'buy',
      option: 'Yes',
      quantity: 50,
      price: 0.72e18,
      trader: '0xabcd...1234',
      timestamp: Date.now() - 2 * 60 * 60 * 1000
    },
    {
      id: 2,
      type: 'sell',
      option: 'No',
      quantity: 25,
      price: 0.28e18,
      trader: '0xefgh...5678',
      timestamp: Date.now() - 4 * 60 * 60 * 1000
    },
    {
      id: 3,
      type: 'buy',
      option: 'Yes',
      quantity: 100,
      price: 0.70e18,
      trader: '0xijkl...9012',
      timestamp: Date.now() - 6 * 60 * 60 * 1000
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMarket(mockMarket);
      setPriceHistory(mockPriceHistory);
      setTrades(mockTrades);
      setLoading(false);
    }, 1000);
  }, [marketId]);

  const timeRemaining = market ? Math.max(0, market.endTime - Date.now()) : 0;
  const daysRemaining = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hoursRemaining = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  const getCategoryColor = (category) => {
    const colors = {
      POLITICS: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      SPORTS: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      ENTERTAINMENT: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      TECHNOLOGY: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      ECONOMICS: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      SCIENCE: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      WEATHER: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200',
      OTHER: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    };
    return colors[category] || colors.OTHER;
  };

  const getStatusBadge = () => {
    if (!market) return null;
    
    if (market.resolved) {
      return <Badge className="bg-green-500">Resolved</Badge>;
    }
    if (market.disputed) {
      return <Badge variant="destructive">Disputed</Badge>;
    }
    if (timeRemaining === 0) {
      return <Badge variant="secondary">Expired</Badge>;
    }
    return <Badge variant="outline">Active</Badge>;
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-slate-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-96 bg-slate-200 rounded"></div>
            <div className="h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Market not found
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mb-4">
          The market you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Markets
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className={getCategoryColor(market.category)}>
              {market.category}
            </Badge>
            <Badge variant="outline">
              {market.marketType === 'FREE_ENTRY' ? 'Free Entry' : 'Paid'}
            </Badge>
            {getStatusBadge()}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {market.question}
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button onClick={() => onTrade(market.id)}>
            <TrendingUp className="w-4 h-4 mr-2" />
            Trade
          </Button>
        </div>
      </div>

      {/* Market Info */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Total Volume</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                ${formatEther(market.totalVolume)}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Participants</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {market.participants.length}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">Time Remaining</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {timeRemaining === 0 ? 'Expired' : 
                 daysRemaining > 0 ? `${daysRemaining}d ${hoursRemaining}h` :
                 hoursRemaining > 0 ? `${hoursRemaining}h` : 'Ending soon'}
              </p>
            </div>
            
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="text-sm text-slate-600 dark:text-slate-400">End Date</span>
              </div>
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                {new Date(market.endTime).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Options */}
      <Card>
        <CardHeader>
          <CardTitle>Market Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {market.options.map((option, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white">
                      {option.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {option.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-slate-900 dark:text-white">
                      {((option.currentPrice / 1e18) * 100).toFixed(1)}%
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      ${formatEther(option.currentPrice)}
                    </p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <Progress 
                    value={(option.currentPrice / 1e18) * 100} 
                    className="h-3"
                  />
                </div>
                
                <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                  <span>{option.totalShares} shares</span>
                  <span>${formatEther(option.totalVolume)} volume</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="chart" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="chart">Price Chart</TabsTrigger>
          <TabsTrigger value="trades">Recent Trades</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="discussion">Discussion</TabsTrigger>
        </TabsList>

        <TabsContent value="chart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Price History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Tooltip 
                    formatter={(value, name) => [`${(value * 100).toFixed(1)}%`, name]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="yes" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    name="Yes"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="no" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="No"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trades" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trades.map((trade, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        trade.type === 'buy' ? 'bg-green-500' : 'bg-red-500'
                      }`} />
                      <div>
                        <p className="font-medium">
                          {trade.type === 'buy' ? 'Bought' : 'Sold'} {trade.quantity} shares of "{trade.option}"
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {trade.trader} • {new Date(trade.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${formatEther(trade.price)}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">per share</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Market Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {market.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-1">Creator</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 font-mono">
                    {market.creator}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Created</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(market.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Market Type</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {market.marketType === 'FREE_ENTRY' ? 'Free Entry' : 'Paid Market'}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-1">Status</h4>
                  <div className="flex items-center gap-2">
                    {market.validated ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Validated</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm text-yellow-600">Pending Validation</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="discussion" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Discussion</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <p className="text-slate-600 dark:text-slate-400">
                  Discussion feature coming soon...
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketDetailPage;

