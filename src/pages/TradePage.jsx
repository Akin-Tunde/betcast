import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Calculator,
  AlertTriangle,
  Info,
  Zap,
  Target
} from 'lucide-react';
import { formatEther, parseEther } from '@/lib/web3';

const TradePage = ({ marketId, onBack }) => {
  const [market, setMarket] = useState(null);
  const [selectedOption, setSelectedOption] = useState(0);
  const [tradeType, setTradeType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock market data
  const mockMarket = {
    id: marketId,
    question: "Will Bitcoin reach $100,000 by the end of 2024?",
    description: "This market will resolve to 'Yes' if Bitcoin reaches $100,000 USD by December 31, 2024.",
    category: "ECONOMICS",
    marketType: "PAID",
    endTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
    resolved: false,
    validated: true,
    options: [
      {
        id: 0,
        name: "Yes",
        description: "Bitcoin will reach $100,000",
        currentPrice: 0.72e18,
        totalShares: 1500,
        userShares: 50 // User's current shares
      },
      {
        id: 1,
        name: "No", 
        description: "Bitcoin will not reach $100,000",
        currentPrice: 0.28e18,
        totalShares: 800,
        userShares: 0
      }
    ]
  };

  const [userBalance] = useState(1000e18); // Mock user balance

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setMarket(mockMarket);
      setLoading(false);
    }, 1000);
  }, [marketId]);

  const calculateTotalCost = () => {
    if (!quantity || !market) return 0;
    const option = market.options[selectedOption];
    const qty = parseFloat(quantity);
    const price = Number(option.currentPrice) / 1e18;
    return qty * price;
  };

  const calculatePotentialReturn = () => {
    if (!quantity) return 0;
    const qty = parseFloat(quantity);
    const currentPrice = Number(market.options[selectedOption].currentPrice) / 1e18;
    
    if (tradeType === 'buy') {
      // If option wins, each share is worth $1
      return qty * (1 - currentPrice);
    } else {
      // Selling shares
      return qty * currentPrice;
    }
  };

  const calculateMaxReturn = () => {
    if (!quantity) return 0;
    const qty = parseFloat(quantity);
    return qty; // Maximum return is $1 per share if option wins
  };

  const getReturnPercentage = () => {
    const cost = calculateTotalCost();
    const potentialReturn = calculatePotentialReturn();
    if (cost === 0) return 0;
    return (potentialReturn / cost) * 100;
  };

  const handleTrade = async () => {
    if (!quantity || !market) return;
    
    setIsSubmitting(true);
    
    try {
      // Here you would integrate with the smart contract
      console.log('Executing trade:', {
        marketId,
        optionId: selectedOption,
        type: tradeType,
        quantity: parseFloat(quantity),
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined
      });
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      alert(`${tradeType === 'buy' ? 'Purchase' : 'Sale'} successful!`);
      setQuantity('');
      setMaxPrice('');
    } catch (error) {
      console.error('Trade failed:', error);
      alert('Trade failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const canTrade = () => {
    if (!quantity || !market) return false;
    
    const qty = parseFloat(quantity);
    const option = market.options[selectedOption];
    
    if (tradeType === 'buy') {
      const cost = calculateTotalCost();
      return qty > 0 && cost <= Number(userBalance) / 1e18;
    } else {
      return qty > 0 && qty <= option.userShares;
    }
  };

  const getTradeButtonText = () => {
    if (isSubmitting) {
      return tradeType === 'buy' ? 'Buying...' : 'Selling...';
    }
    
    if (!quantity) {
      return `Enter ${tradeType === 'buy' ? 'purchase' : 'sale'} amount`;
    }
    
    if (tradeType === 'buy') {
      const cost = calculateTotalCost();
      if (cost > Number(userBalance) / 1e18) {
        return 'Insufficient balance';
      }
      return `Buy ${quantity} shares for $${cost.toFixed(2)}`;
    } else {
      const option = market.options[selectedOption];
      if (parseFloat(quantity) > option.userShares) {
        return 'Insufficient shares';
      }
      return `Sell ${quantity} shares for $${calculateTotalCost().toFixed(2)}`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
          <div className="h-32 bg-slate-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-96 bg-slate-200 rounded"></div>
            <div className="h-96 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!market) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
          Market not found
        </h2>
        <Button onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Markets
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-yellow-100 text-yellow-800">
              {market.category}
            </Badge>
            <Badge variant="outline">Trading</Badge>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            {market.question}
          </h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trading Interface */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Place Trade
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Trade Type */}
            <Tabs value={tradeType} onValueChange={setTradeType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy" className="text-green-600">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Buy
                </TabsTrigger>
                <TabsTrigger value="sell" className="text-red-600">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Sell
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Option Selection */}
            <div>
              <Label className="text-base font-medium mb-3 block">Select Option</Label>
              <div className="space-y-2">
                {market.options.map((option, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedOption === index
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                    onClick={() => setSelectedOption(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{option.name}</h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {option.description}
                        </p>
                        {tradeType === 'sell' && option.userShares > 0 && (
                          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                            You own {option.userShares} shares
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold">
                          {((option.currentPrice / 1e18) * 100).toFixed(1)}%
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          ${formatEther(option.currentPrice)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Input */}
            <div>
              <Label htmlFor="quantity">Quantity (shares)</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter number of shares"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                min="0"
                step="1"
              />
              {tradeType === 'sell' && (
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Available: {market.options[selectedOption].userShares} shares
                </p>
              )}
            </div>

            {/* Quick Amount Buttons */}
            {tradeType === 'sell' && market.options[selectedOption].userShares > 0 && (
              <div>
                <Label className="text-sm">Quick Select</Label>
                <div className="flex gap-2 mt-2">
                  {[25, 50, 75, 100].map(percentage => {
                    const shares = Math.floor(market.options[selectedOption].userShares * percentage / 100);
                    if (shares === 0) return null;
                    return (
                      <Button
                        key={percentage}
                        variant="outline"
                        size="sm"
                        onClick={() => setQuantity(shares.toString())}
                      >
                        {percentage}%
                      </Button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Max Price (for buys) */}
            {tradeType === 'buy' && (
              <div>
                <Label htmlFor="maxPrice">Max Price per Share (optional)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="e.g., 0.75"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  max="1"
                  step="0.01"
                />
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Current price: ${formatEther(market.options[selectedOption].currentPrice)}
                </p>
              </div>
            )}

            {/* Trade Summary */}
            {quantity && (
              <Card className="bg-slate-50 dark:bg-slate-800">
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    Trade Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Shares:</span>
                      <span className="font-medium">{quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Price per share:</span>
                      <span className="font-medium">
                        ${formatEther(market.options[selectedOption].currentPrice)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total cost:</span>
                      <span className="font-medium">${calculateTotalCost().toFixed(2)}</span>
                    </div>
                    {tradeType === 'buy' && (
                      <>
                        <div className="flex justify-between">
                          <span>Potential return:</span>
                          <span className="font-medium text-green-600">
                            ${calculatePotentialReturn().toFixed(2)} ({getReturnPercentage().toFixed(1)}%)
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Max return:</span>
                          <span className="font-medium">${calculateMaxReturn().toFixed(2)}</span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Trade Button */}
            <Button
              onClick={handleTrade}
              disabled={!canTrade() || isSubmitting}
              className="w-full"
              size="lg"
            >
              {getTradeButtonText()}
            </Button>

            {/* Warnings */}
            {tradeType === 'buy' && quantity && calculateTotalCost() > Number(userBalance) / 1e18 && (
              <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                <p className="text-sm text-red-700 dark:text-red-300">
                  Insufficient balance. You need ${(calculateTotalCost() - Number(userBalance) / 1e18).toFixed(2)} more.
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Market Info & Tips */}
        <div className="space-y-6">
          {/* Current Position */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Your Position
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 dark:text-slate-400">Balance:</span>
                  <span className="font-semibold">${formatEther(userBalance)}</span>
                </div>
                
                {market.options.map((option, index) => (
                  option.userShares > 0 && (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-400">{option.name} shares:</span>
                      <span className="font-semibold">{option.userShares}</span>
                    </div>
                  )
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Market Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="w-5 h-5" />
                Market Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <h4 className="font-medium mb-1">Current Odds</h4>
                  <div className="space-y-1">
                    {market.options.map((option, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{option.name}:</span>
                        <span>{((option.currentPrice / 1e18) * 100).toFixed(1)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-1">Total Shares</h4>
                  <div className="space-y-1">
                    {market.options.map((option, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{option.name}:</span>
                        <span>{option.totalShares}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Trading Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Trading Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p>Prices represent the market's probability of each outcome occurring.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p>If your prediction is correct, each share pays out $1.00.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p>You can sell your shares anytime before the market closes.</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <p>Set a max price to protect against price movements during execution.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TradePage;

