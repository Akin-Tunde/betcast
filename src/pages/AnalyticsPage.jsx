import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, 
  BarChart3, 
  PieChart as PieChartIcon, 
  Activity,
  DollarSign,
  Users,
  Target,
  Calendar
} from 'lucide-react';

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  // Mock data for charts
  const volumeData = [
    { date: '2024-01-01', volume: 12000, trades: 45 },
    { date: '2024-01-02', volume: 15000, trades: 52 },
    { date: '2024-01-03', volume: 18000, trades: 61 },
    { date: '2024-01-04', volume: 14000, trades: 48 },
    { date: '2024-01-05', volume: 22000, trades: 73 },
    { date: '2024-01-06', volume: 25000, trades: 81 },
    { date: '2024-01-07', volume: 28000, trades: 95 }
  ];

  const categoryData = [
    { name: 'Politics', value: 35, volume: 450000, color: '#ef4444' },
    { name: 'Sports', value: 25, volume: 320000, color: '#22c55e' },
    { name: 'Technology', value: 20, volume: 280000, color: '#3b82f6' },
    { name: 'Economics', value: 12, volume: 180000, color: '#f59e0b' },
    { name: 'Entertainment', value: 8, volume: 120000, color: '#8b5cf6' }
  ];

  const performanceData = [
    { category: 'Politics', winRate: 68, avgReturn: 15.2, totalTrades: 234 },
    { category: 'Sports', winRate: 72, avgReturn: 18.7, totalTrades: 189 },
    { category: 'Technology', winRate: 65, avgReturn: 12.8, totalTrades: 156 },
    { category: 'Economics', winRate: 70, avgReturn: 16.4, totalTrades: 98 },
    { category: 'Entertainment', winRate: 63, avgReturn: 11.9, totalTrades: 67 }
  ];

  const priceMovementData = [
    { time: '00:00', bitcoin: 0.65, ai: 0.40, election: 0.52 },
    { time: '04:00', bitcoin: 0.67, ai: 0.38, election: 0.54 },
    { time: '08:00', bitcoin: 0.69, ai: 0.42, election: 0.51 },
    { time: '12:00', bitcoin: 0.72, ai: 0.45, election: 0.53 },
    { time: '16:00', bitcoin: 0.70, ai: 0.43, election: 0.55 },
    { time: '20:00', bitcoin: 0.73, ai: 0.41, election: 0.57 },
    { time: '24:00', bitcoin: 0.75, ai: 0.39, election: 0.58 }
  ];

  const topMarkets = [
    {
      id: 1,
      question: "Will Bitcoin reach $100,000 by the end of 2024?",
      volume: 125000,
      participants: 456,
      change24h: 12.5,
      category: 'Economics'
    },
    {
      id: 2,
      question: "Who will win the 2024 NBA Championship?",
      volume: 98000,
      participants: 389,
      change24h: -3.2,
      category: 'Sports'
    },
    {
      id: 3,
      question: "Will AI achieve AGI by 2030?",
      volume: 87000,
      participants: 234,
      change24h: 8.7,
      category: 'Technology'
    },
    {
      id: 4,
      question: "2024 US Presidential Election Winner",
      volume: 156000,
      participants: 678,
      change24h: 5.4,
      category: 'Politics'
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatPercent = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[1, 2].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-64 bg-slate-200 rounded"></div>
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Market insights and performance analytics
          </p>
        </div>
        
        <div className="flex gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">24 Hours</SelectItem>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="politics">Politics</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="economics">Economics</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Volume (24h)</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(28000)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400">
                  +12.5% from yesterday
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Active Markets</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  1,234
                </p>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                  +8 new today
                </p>
              </div>
              <BarChart3 className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Traders</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  5,678
                </p>
                <p className="text-sm text-purple-600 dark:text-purple-400">
                  +156 this week
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Avg Win Rate</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  68.9%
                </p>
                <p className="text-sm text-yellow-600 dark:text-yellow-400">
                  +2.1% this month
                </p>
              </div>
              <Target className="w-8 h-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Tabs defaultValue="volume" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="volume">Volume & Trades</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="prices">Price Movements</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="volume" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Trading Volume & Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={volumeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'volume' ? formatCurrency(value) : value,
                      name === 'volume' ? 'Volume' : 'Trades'
                    ]}
                  />
                  <Legend />
                  <Area 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                    name="Volume"
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="trades" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Trades"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5" />
                  Market Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Volume</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [formatCurrency(value), 'Volume']} />
                    <Bar dataKey="volume" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="prices" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Top Market Price Movements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={priceMovementData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis domain={[0, 1]} tickFormatter={(value) => `${(value * 100).toFixed(0)}%`} />
                  <Tooltip 
                    formatter={(value, name) => [`${(value * 100).toFixed(1)}%`, name]}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="bitcoin" 
                    stroke="#f59e0b" 
                    strokeWidth={2}
                    name="Bitcoin $100K"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="ai" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    name="AI AGI 2030"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="election" 
                    stroke="#ef4444" 
                    strokeWidth={2}
                    name="Election 2024"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Category Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceData.map((category, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{category.category}</h3>
                      <Badge variant="outline">{category.totalTrades} trades</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Win Rate</span>
                        <p className="font-semibold text-lg">{category.winRate}%</p>
                      </div>
                      <div>
                        <span className="text-slate-600 dark:text-slate-400">Avg Return</span>
                        <p className="font-semibold text-lg">{category.avgReturn}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Top Markets */}
      <Card>
        <CardHeader>
          <CardTitle>Top Markets by Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topMarkets.map((market, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{market.category}</Badge>
                    <span className={`text-sm font-medium ${
                      market.change24h > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {formatPercent(market.change24h)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-1">
                    {market.question}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                    <span>{market.participants} participants</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-slate-900 dark:text-white">
                    {formatCurrency(market.volume)}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">24h volume</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsPage;

