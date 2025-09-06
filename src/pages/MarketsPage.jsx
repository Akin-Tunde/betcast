import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MarketCard from '@/components/MarketCard';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Clock, 
  DollarSign,
  Users,
  BarChart3,
  Zap
} from 'lucide-react';

const MarketsPage = ({ onViewMarket, onTrade }) => {
  const [markets, setMarkets] = useState([]);
  const [filteredMarkets, setFilteredMarkets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockMarkets = [
    {
      id: 1,
      question: "Will Bitcoin reach $100,000 by the end of 2024?",
      description: "Prediction market for Bitcoin price reaching $100,000 USD by December 31, 2024",
      endTime: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
      category: "ECONOMICS",
      marketType: "PAID",
      options: [
        { name: "Yes", currentPrice: 0.65e18, totalShares: 1000 },
        { name: "No", currentPrice: 0.35e18, totalShares: 800 }
      ],
      totalVolume: 50000e18,
      participants: new Array(234),
      resolved: false,
      disputed: false
    },
    {
      id: 2,
      question: "Who will win the 2024 NBA Championship?",
      description: "Prediction market for the 2024 NBA Championship winner",
      endTime: Date.now() + 60 * 24 * 60 * 60 * 1000, // 60 days from now
      category: "SPORTS",
      marketType: "FREE_ENTRY",
      options: [
        { name: "Lakers", currentPrice: 0.25e18, totalShares: 500 },
        { name: "Celtics", currentPrice: 0.30e18, totalShares: 600 },
        { name: "Warriors", currentPrice: 0.20e18, totalShares: 400 },
        { name: "Other", currentPrice: 0.25e18, totalShares: 500 }
      ],
      totalVolume: 25000e18,
      participants: new Array(156),
      resolved: false,
      disputed: false
    },
    {
      id: 3,
      question: "Will AI achieve AGI by 2030?",
      description: "Will Artificial General Intelligence be achieved by any organization by 2030?",
      endTime: Date.now() + 90 * 24 * 60 * 60 * 1000, // 90 days from now
      category: "TECHNOLOGY",
      marketType: "PAID",
      options: [
        { name: "Yes", currentPrice: 0.40e18, totalShares: 800 },
        { name: "No", currentPrice: 0.60e18, totalShares: 1200 }
      ],
      totalVolume: 75000e18,
      participants: new Array(345),
      resolved: false,
      disputed: false
    },
    {
      id: 4,
      question: "Will it rain in New York tomorrow?",
      description: "Weather prediction for rainfall in New York City tomorrow",
      endTime: Date.now() + 1 * 24 * 60 * 60 * 1000, // 1 day from now
      category: "WEATHER",
      marketType: "FREE_ENTRY",
      options: [
        { name: "Yes", currentPrice: 0.70e18, totalShares: 700 },
        { name: "No", currentPrice: 0.30e18, totalShares: 300 }
      ],
      totalVolume: 5000e18,
      participants: new Array(89),
      resolved: false,
      disputed: false
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMarkets(mockMarkets);
      setFilteredMarkets(mockMarkets);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = markets;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(market => 
        market.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        market.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(market => market.category === selectedCategory);
    }

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(market => market.marketType === selectedType);
    }

    // Sort markets
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.id - a.id;
        case 'ending-soon':
          return a.endTime - b.endTime;
        case 'volume':
          return (b.totalVolume || 0) - (a.totalVolume || 0);
        case 'participants':
          return (b.participants?.length || 0) - (a.participants?.length || 0);
        default:
          return 0;
      }
    });

    setFilteredMarkets(filtered);
  }, [markets, searchTerm, selectedCategory, selectedType, sortBy]);

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'POLITICS', label: 'Politics' },
    { value: 'SPORTS', label: 'Sports' },
    { value: 'ENTERTAINMENT', label: 'Entertainment' },
    { value: 'TECHNOLOGY', label: 'Technology' },
    { value: 'ECONOMICS', label: 'Economics' },
    { value: 'SCIENCE', label: 'Science' },
    { value: 'WEATHER', label: 'Weather' },
    { value: 'OTHER', label: 'Other' }
  ];

  const marketTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'PAID', label: 'Paid Markets' },
    { value: 'FREE_ENTRY', label: 'Free Entry' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'ending-soon', label: 'Ending Soon' },
    { value: 'volume', label: 'Highest Volume' },
    { value: 'participants', label: 'Most Participants' }
  ];

  const getMarketStats = () => {
    const totalVolume = markets.reduce((sum, market) => sum + (market.totalVolume || 0), 0);
    const totalParticipants = markets.reduce((sum, market) => sum + (market.participants?.length || 0), 0);
    const activeMarkets = markets.filter(market => !market.resolved && market.endTime > Date.now()).length;
    
    return { totalVolume, totalParticipants, activeMarkets };
  };

  const stats = getMarketStats();

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-20 bg-slate-200 rounded"></div>
                </div>
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
          Prediction Markets
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Discover and trade on prediction markets across various categories
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Volume</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${(stats.totalVolume / 1e18).toLocaleString()}
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
                  {stats.activeMarkets}
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
                  {stats.totalParticipants.toLocaleString()}
                </p>
              </div>
              <Users className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search markets..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {marketTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Market Tabs */}
      <Tabs defaultValue="all" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All Markets</TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="w-4 h-4 mr-2" />
            Trending
          </TabsTrigger>
          <TabsTrigger value="ending-soon">
            <Clock className="w-4 h-4 mr-2" />
            Ending Soon
          </TabsTrigger>
          <TabsTrigger value="free">
            <Zap className="w-4 h-4 mr-2" />
            Free Entry
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {filteredMarkets.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                  No markets found
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Try adjusting your search criteria or filters
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMarkets.map(market => (
                <MarketCard
                  key={market.id}
                  market={market}
                  onViewMarket={onViewMarket}
                  onTrade={onTrade}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="trending" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets
              .sort((a, b) => (b.totalVolume || 0) - (a.totalVolume || 0))
              .slice(0, 6)
              .map(market => (
                <MarketCard
                  key={market.id}
                  market={market}
                  onViewMarket={onViewMarket}
                  onTrade={onTrade}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="ending-soon" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets
              .filter(market => !market.resolved)
              .sort((a, b) => a.endTime - b.endTime)
              .slice(0, 6)
              .map(market => (
                <MarketCard
                  key={market.id}
                  market={market}
                  onViewMarket={onViewMarket}
                  onTrade={onTrade}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="free" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMarkets
              .filter(market => market.marketType === 'FREE_ENTRY')
              .map(market => (
                <MarketCard
                  key={market.id}
                  market={market}
                  onViewMarket={onViewMarket}
                  onTrade={onTrade}
                />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MarketsPage;

