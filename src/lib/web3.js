import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { mainnet, polygon, optimism, arbitrum, base, sepolia } from 'wagmi/chains';

export const config = getDefaultConfig({
  appName: 'PolicastMarket',
  projectId: 'YOUR_PROJECT_ID', // Get this from WalletConnect Cloud
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  ssr: false, // If your dApp uses server side rendering (SSR)
});

// Contract ABI - This would be the actual ABI from your compiled contract
export const PREDICTION_MARKET_ABI = [
  // Market Creation
  "function createMarket(string memory _question, string memory _description, string[] memory _optionNames, string[] memory _optionDescriptions, uint256 _duration, uint8 _category, uint8 _marketType, uint256 _initialLiquidity, bool _earlyResolutionAllowed) public returns (uint256)",
  "function createFreeMarket(string memory _question, string memory _description, string[] memory _optionNames, string[] memory _optionDescriptions, uint256 _duration, uint8 _category, uint256 _maxFreeParticipants, uint256 _tokensPerParticipant, uint256 _initialLiquidity, bool _earlyResolutionAllowed) external returns (uint256)",
  
  // Trading Functions
  "function buyShares(uint256 _marketId, uint256 _optionId, uint256 _quantity, uint256 _maxPricePerShare) external",
  "function sellShares(uint256 _marketId, uint256 _optionId, uint256 _quantity, uint256 _minPricePerShare) external",
  "function ammSwap(uint256 _marketId, uint256 _optionIdIn, uint256 _optionIdOut, uint256 _amountIn, uint256 _minAmountOut) external returns (uint256)",
  "function claimFreeTokens(uint256 _marketId) external",
  "function addAMMLiquidity(uint256 _marketId, uint256 _amount) external",
  
  // Resolution Functions
  "function resolveMarket(uint256 _marketId, uint256 _winningOptionId) external",
  "function disputeMarket(uint256 _marketId, string memory _reason) external",
  "function claimWinnings(uint256 _marketId) external",
  
  // View Functions
  "function getMarketInfo(uint256 _marketId) external view returns (string memory question, string memory description, uint256 endTime, uint8 category, uint256 optionCount, bool resolved, bool disputed, uint8 marketType, bool invalidated, uint256 winningOptionId, address creator, bool earlyResolutionAllowed)",
  "function getMarketOption(uint256 _marketId, uint256 _optionId) external view returns (string memory name, string memory description, uint256 totalShares, uint256 totalVolume, uint256 currentPrice, bool isActive)",
  "function getUserShares(uint256 _marketId, address _user) external view returns (uint256[] memory)",
  "function getUserPortfolio(address _user) external view returns (uint256 totalInvested, uint256 totalWinnings, int256 unrealizedPnL, int256 realizedPnL, uint256 tradeCount)",
  "function getPriceHistory(uint256 _marketId, uint256 _optionId, uint256 _limit) external view returns (tuple(uint256 price, uint256 timestamp, uint256 volume)[] memory)",
  "function getMarketsByCategory(uint8 _category, uint256 _limit) external view returns (uint256[] memory)",
  "function getMarketCount() external view returns (uint256)",
  "function getBettingToken() external view returns (address)",
  "function getMarketStatus(uint256 _marketId) external view returns (bool isActive, bool isResolved, bool isExpired, bool canTrade, bool canResolve, uint256 timeRemaining)",
  "function getUserMarkets(address _user) external view returns (uint256[] memory)",
  "function isMarketTradable(uint256 _marketId) external view returns (bool)",
  
  // Events
  "event MarketCreated(uint256 indexed marketId, string question, string[] options, uint256 endTime, uint8 category, uint8 marketType, address creator)",
  "event TradeExecuted(uint256 indexed marketId, uint256 indexed optionId, address indexed buyer, address seller, uint256 price, uint256 quantity, uint256 tradeId)",
  "event MarketResolved(uint256 indexed marketId, uint256 winningOptionId, address resolver)",
  "event Claimed(uint256 indexed marketId, address indexed user, uint256 amount)"
];

// ERC20 Token ABI for betting token interactions
export const ERC20_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function transferFrom(address from, address to, uint256 amount) returns (bool)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  "function name() view returns (string)"
];

// Contract addresses (these would be the actual deployed contract addresses)
export const CONTRACT_ADDRESSES = {
  PREDICTION_MARKET: "0x0000000000000000000000000000000000000000", // Replace with actual address
  BETTING_TOKEN: "0x0000000000000000000000000000000000000000" // Replace with actual address
};

// Market categories enum
export const MARKET_CATEGORIES = {
  POLITICS: 0,
  SPORTS: 1,
  ENTERTAINMENT: 2,
  TECHNOLOGY: 3,
  ECONOMICS: 4,
  SCIENCE: 5,
  WEATHER: 6,
  OTHER: 7
};

// Market types enum
export const MARKET_TYPES = {
  PAID: 0,
  FREE_ENTRY: 1
};

// Helper function to format wei to ether
export const formatEther = (wei) => {
  return (Number(wei) / 1e18).toFixed(4);
};

// Helper function to parse ether to wei
export const parseEther = (ether) => {
  return BigInt(Math.floor(Number(ether) * 1e18));
};

