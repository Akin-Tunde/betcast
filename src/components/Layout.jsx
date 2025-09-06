import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  BarChart3, 
  Wallet, 
  Settings, 
  Plus,
  Home,
  Search,
  User,
  Menu,
  X
} from 'lucide-react';

const Layout = ({ children, currentPage, onPageChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Markets', icon: Home, id: 'markets' },
    { name: 'Create Market', icon: Plus, id: 'create' },
    { name: 'Portfolio', icon: Wallet, id: 'portfolio' },
    { name: 'Analytics', icon: BarChart3, id: 'analytics' },
    { name: 'Profile', icon: User, id: 'profile' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-900 shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">PolicastMarket</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onPageChange(item.id);
                    setSidebarOpen(false);
                  }}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.name}
                </Button>
              );
            })}
          </div>
        </nav>

        {/* Platform Stats */}
        <div className="mt-8 px-3">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Platform Stats</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Total Markets</span>
                <Badge variant="secondary">1,234</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Active Traders</span>
                <Badge variant="secondary">5,678</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Total Volume</span>
                <Badge variant="secondary">$2.3M</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top navigation */}
        <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="hidden md:flex items-center space-x-2">
                <Search className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search markets..."
                  className="bg-slate-100 dark:bg-slate-800 border-0 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <ConnectButton />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;

