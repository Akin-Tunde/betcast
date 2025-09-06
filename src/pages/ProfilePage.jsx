import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Wallet, 
  Trophy,
  Activity,
  Star,
  Edit,
  Save,
  X
} from 'lucide-react';
import { useAccount } from 'wagmi';

const ProfilePage = () => {
  const { address, isConnected } = useAccount();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: 'CryptoTrader123',
    email: 'trader@example.com',
    bio: 'Passionate prediction market trader with 3+ years of experience',
    location: 'New York, USA',
    website: 'https://myportfolio.com',
    twitter: '@cryptotrader123'
  });

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    marketUpdates: true,
    priceAlerts: true,
    weeklyDigest: false
  });

  const [privacy, setPrivacy] = useState({
    publicProfile: true,
    showPortfolio: false,
    showTradeHistory: false
  });

  const stats = {
    totalTrades: 156,
    winRate: 68.9,
    totalVolume: 45000,
    rank: 42,
    achievements: 8,
    joinDate: '2023-03-15'
  };

  const achievements = [
    { id: 1, name: 'First Trade', description: 'Completed your first trade', earned: true, date: '2023-03-16' },
    { id: 2, name: 'High Roller', description: 'Traded over $10,000 in volume', earned: true, date: '2023-06-22' },
    { id: 3, name: 'Streak Master', description: '10 winning trades in a row', earned: true, date: '2023-08-15' },
    { id: 4, name: 'Market Maker', description: 'Created your first market', earned: false, date: null },
    { id: 5, name: 'Diamond Hands', description: 'Held a position for 30+ days', earned: true, date: '2023-09-10' },
    { id: 6, name: 'Prophet', description: 'Achieved 80%+ win rate over 50 trades', earned: false, date: null }
  ];

  const recentActivity = [
    { type: 'trade', action: 'Bought 100 shares of "Bitcoin $100K"', time: '2 hours ago' },
    { type: 'win', action: 'Won $450 from "NBA Championship" market', time: '1 day ago' },
    { type: 'trade', action: 'Sold 50 shares of "AI AGI 2030"', time: '2 days ago' },
    { type: 'achievement', action: 'Earned "Diamond Hands" achievement', time: '3 days ago' }
  ];

  const handleProfileUpdate = () => {
    setIsEditing(false);
    // Here you would save the profile data
    console.log('Profile updated:', profile);
  };

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'trade':
        return <Activity className="w-4 h-4 text-blue-500" />;
      case 'win':
        return <Trophy className="w-4 h-4 text-green-500" />;
      case 'achievement':
        return <Star className="w-4 h-4 text-yellow-500" />;
      default:
        return <Activity className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
          Profile
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {profile.username}
                </h2>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
                  Rank #{stats.rank}
                </Badge>
              </div>
              
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {profile.bio}
              </p>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Trades</p>
                  <p className="text-lg font-semibold">{stats.totalTrades}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Win Rate</p>
                  <p className="text-lg font-semibold">{stats.winRate}%</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Total Volume</p>
                  <p className="text-lg font-semibold">${stats.totalVolume.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Achievements</p>
                  <p className="text-lg font-semibold">{stats.achievements}</p>
                </div>
              </div>
            </div>
            
            {isConnected && (
              <div className="flex-shrink-0">
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">Connected Wallet</span>
                  </div>
                  <p className="text-sm font-mono">
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Information
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => isEditing ? handleProfileUpdate() : setIsEditing(true)}
                >
                  {isEditing ? (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </>
                  ) : (
                    <>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="username"
                    value={profile.username}
                    onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={profile.website}
                    onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={profile.twitter}
                  onChange={(e) => setProfile(prev => ({ ...prev, twitter: e.target.value }))}
                  disabled={!isEditing}
                />
              </div>
              
              {isEditing && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 border rounded-lg ${
                      achievement.earned 
                        ? 'bg-yellow-50 border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-800' 
                        : 'bg-slate-50 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        achievement.earned 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-slate-300 text-slate-600 dark:bg-slate-600 dark:text-slate-400'
                      }`}>
                        <Trophy className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold ${
                          achievement.earned 
                            ? 'text-yellow-800 dark:text-yellow-200' 
                            : 'text-slate-600 dark:text-slate-400'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {achievement.description}
                        </p>
                        {achievement.earned && achievement.date && (
                          <p className="text-xs text-slate-500 mt-1">
                            Earned on {new Date(achievement.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    {getActivityIcon(activity.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        {activity.action}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={key} className="text-sm font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                  </div>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Privacy Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(privacy).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <div>
                    <Label htmlFor={key} className="text-sm font-medium">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </Label>
                  </div>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => handlePrivacyChange(key, checked)}
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfilePage;

