import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  Users, 
  TrendingUp, 
  DollarSign,
  Calendar,
  BarChart3
} from 'lucide-react';
import { formatEther } from '@/lib/web3';

const MarketCard = ({ market, onViewMarket, onTrade }) => {
  const {
    id,
    question,
    description,
    endTime,
    category,
    options,
    totalVolume,
    participants,
    resolved,
    disputed,
    marketType
  } = market;

  const timeRemaining = Math.max(0, endTime - Date.now());
  const isExpired = timeRemaining === 0;
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
    if (resolved) {
      return <Badge variant="default" className="bg-green-500">Resolved</Badge>;
    }
    if (disputed) {
      return <Badge variant="destructive">Disputed</Badge>;
    }
    if (isExpired) {
      return <Badge variant="secondary">Expired</Badge>;
    }
    return <Badge variant="outline">Active</Badge>;
  };

  const getMarketTypeBadge = () => {
    if (marketType === 'FREE_ENTRY') {
      return <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">Free Entry</Badge>;
    }
    return <Badge variant="outline">Paid</Badge>;
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-0 shadow-md bg-white dark:bg-slate-800">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getCategoryColor(category)}>
                {category}
              </Badge>
              {getMarketTypeBadge()}
              {getStatusBadge()}
            </div>
            <CardTitle className="text-lg font-semibold leading-tight mb-2 line-clamp-2">
              {question}
            </CardTitle>
            <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
              {description}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Market Options */}
        <div className="space-y-2 mb-4">
          {options?.slice(0, 3).map((option, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium truncate flex-1 mr-2">
                {option.name}
              </span>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  {((option.currentPrice / 1e18) * 100).toFixed(1)}%
                </span>
                <div className="w-16">
                  <Progress 
                    value={(option.currentPrice / 1e18) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            </div>
          ))}
          {options?.length > 3 && (
            <div className="text-xs text-slate-500 text-center">
              +{options.length - 3} more options
            </div>
          )}
        </div>

        {/* Market Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-slate-600 dark:text-slate-400">Volume</div>
              <div className="font-semibold">${formatEther(totalVolume || 0)}</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-400" />
            <div>
              <div className="text-slate-600 dark:text-slate-400">Traders</div>
              <div className="font-semibold">{participants?.length || 0}</div>
            </div>
          </div>
        </div>

        {/* Time Remaining */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">
              {isExpired ? 'Expired' : 
               daysRemaining > 0 ? `${daysRemaining}d ${hoursRemaining}h left` :
               hoursRemaining > 0 ? `${hoursRemaining}h left` : 'Ending soon'}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span className="text-slate-600 dark:text-slate-400">
              {new Date(endTime).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            onClick={() => onViewMarket(id)}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            View Details
          </Button>
          {!resolved && !isExpired && (
            <Button 
              size="sm" 
              className="flex-1"
              onClick={() => onTrade(id)}
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Trade
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketCard;

