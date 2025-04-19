
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/ui/wallet-button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NFTCard } from "@/components/ui/nft-card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Award, Trophy, Star, User } from "lucide-react";

// Mock data for collections
const collections = [
  {
    id: "c1",
    name: "Rare Cards",
    count: 14,
    total: 50,
    progress: 28,
  },
  {
    id: "c2",
    name: "Epic Cards",
    count: 5,
    total: 25,
    progress: 20,
  },
  {
    id: "c3",
    name: "Legendary Cards",
    count: 2,
    total: 10,
    progress: 20,
  },
  {
    id: "c4",
    name: "World Cup 2026",
    count: 11,
    total: 32,
    progress: 34,
  },
  {
    id: "c5",
    name: "Champions League",
    count: 8,
    total: 40,
    progress: 20,
  },
];

// Mock data for owned cards
const ownedCards = [
  {
    id: "o1",
    name: "Lionel Messi",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Messi",
    rarity: "legendary" as const,
    team: "Argentina",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "o2",
    name: "Cristiano Ronaldo",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Ronaldo",
    rarity: "epic" as const,
    team: "Portugal",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "o3",
    name: "Kylian Mbappé",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Mbappe",
    rarity: "rare" as const,
    team: "France",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "o4",
    name: "Neymar Jr",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Neymar",
    rarity: "epic" as const,
    team: "Brazil",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "o5",
    name: "Erling Haaland",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Haaland",
    rarity: "rare" as const,
    team: "Norway",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "o6",
    name: "Kevin De Bruyne",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=DeBruyne",
    rarity: "rare" as const,
    team: "Belgium",
    position: "Midfielder",
    isOwned: true,
  },
];

// Mock data for achievements
const achievements = [
  {
    id: "a1",
    name: "Collector Rookie",
    description: "Collect your first 10 cards",
    progress: 100,
    completed: true,
    reward: "5 CHZ",
    icon: <Trophy className="h-6 w-6 text-yellow-400" />,
  },
  {
    id: "a2",
    name: "Trading Expert",
    description: "Complete 5 successful trades",
    progress: 60,
    completed: false,
    reward: "10 CHZ",
    icon: <Award className="h-6 w-6 text-blue-400" />,
  },
  {
    id: "a3",
    name: "Album Master",
    description: "Complete your first album",
    progress: 35,
    completed: false,
    reward: "Exclusive NFT",
    icon: <Star className="h-6 w-6 text-purple-400" />,
  },
];

// Mock data for transaction history
const transactions = [
  {
    id: "t1",
    type: "Purchase",
    item: "Premium Pack",
    amount: -25,
    date: "2023-05-15",
  },
  {
    id: "t2",
    type: "Sale",
    item: "Rare Player Card",
    amount: 15,
    date: "2023-05-14",
  },
  {
    id: "t3",
    type: "Trade",
    item: "Epic Player Card",
    amount: 0,
    date: "2023-05-12",
  },
  {
    id: "t4",
    type: "Reward",
    item: "Achievement Completion",
    amount: 5,
    date: "2023-05-10",
  },
];

const Profile = () => {
  const [walletAddress] = useState("0x1234...5678");
  const [walletBalance] = useState(85);

  return (
    <div className="min-h-screen bg-goinft-dark pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="flex-1">
            <h1 className="text-white font-orbitron text-3xl font-bold mb-2">
              My Profile
            </h1>
            <p className="text-white/70">
              Manage your collection, view stats and achievements
            </p>
          </div>
          
          <div className="bg-goinft-card rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="bg-goinft-darker rounded-full p-4">
              <User className="h-8 w-8 text-white" />
            </div>
            
            <div className="text-center sm:text-left">
              <p className="text-white/70 text-sm">Connected Wallet</p>
              <p className="text-white font-orbitron font-medium">
                {walletAddress}
              </p>
              <p className="text-neon-purple font-medium mt-1">
                Balance: {walletBalance} CHZ
              </p>
            </div>
            
            <WalletButton 
              variant="disconnect" 
              className="mt-2 sm:mt-0 sm:ml-4"
            >
              Disconnect
            </WalletButton>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-goinft-card rounded-xl p-4 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white mb-2">
              {ownedCards.length}
            </span>
            <span className="text-white/70 text-sm">Total Cards</span>
          </div>
          
          <div className="bg-goinft-card rounded-xl p-4 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white mb-2">
              2
            </span>
            <span className="text-white/70 text-sm">Albums in Progress</span>
          </div>
          
          <div className="bg-goinft-card rounded-xl p-4 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white mb-2">
              5
            </span>
            <span className="text-white/70 text-sm">Trades Completed</span>
          </div>
          
          <div className="bg-goinft-card rounded-xl p-4 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white mb-2">
              3
            </span>
            <span className="text-white/70 text-sm">Achievements Earned</span>
          </div>
        </div>
        
        <Tabs defaultValue="collection">
          <TabsList className="bg-goinft-card mb-6">
            <TabsTrigger value="collection">Collection</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="collection" className="mt-0">
            <div className="space-y-6">
              <div>
                <h2 className="text-white font-orbitron text-xl font-bold mb-4">
                  Collection Progress
                </h2>
                
                <div className="bg-goinft-card rounded-xl p-6">
                  <div className="space-y-4">
                    {collections.map((collection) => (
                      <div key={collection.id}>
                        <div className="flex justify-between mb-1">
                          <span className="text-white font-medium">{collection.name}</span>
                          <span className="text-white/70">
                            {collection.count}/{collection.total}
                          </span>
                        </div>
                        <div className="w-full bg-goinft-darker rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-neon-purple to-neon-pink h-2 rounded-full"
                            style={{ width: `${collection.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h2 className="text-white font-orbitron text-xl font-bold mb-4">
                  My Cards
                </h2>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {ownedCards.map((card) => (
                    <NFTCard key={card.id} {...card} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="achievements" className="mt-0">
            <h2 className="text-white font-orbitron text-xl font-bold mb-4">
              Achievements
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.id} 
                  className={`bg-goinft-card rounded-xl p-4 border-2 ${
                    achievement.completed 
                      ? "border-neon-purple/50" 
                      : "border-transparent"
                  }`}
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-goinft-light p-2 rounded-lg mr-3">
                      {achievement.icon}
                    </div>
                    <div>
                      <h3 className="text-white font-orbitron font-bold">
                        {achievement.name}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white/70">Progress</span>
                      <span className="text-white/70">{achievement.progress}%</span>
                    </div>
                    <Progress value={achievement.progress} className="h-1.5 bg-goinft-darker" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-white/70 text-sm">
                      Reward: <span className="text-white">{achievement.reward}</span>
                    </span>
                    
                    {achievement.completed ? (
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                        Completed
                      </span>
                    ) : (
                      <span className="bg-goinft-light text-white/70 px-2 py-1 rounded text-xs">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <h2 className="text-white font-orbitron text-xl font-bold mb-4">
              Transaction History
            </h2>
            
            <div className="bg-goinft-card rounded-xl overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-goinft-light">
                    <TableHead className="text-white">Date</TableHead>
                    <TableHead className="text-white">Type</TableHead>
                    <TableHead className="text-white">Item</TableHead>
                    <TableHead className="text-white text-right">Amount (CHZ)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id} className="border-goinft-light">
                      <TableCell className="text-white/70">
                        {transaction.date}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          transaction.type === "Purchase" 
                            ? "bg-blue-500/20 text-blue-400" 
                            : transaction.type === "Sale" 
                            ? "bg-green-500/20 text-green-400"
                            : transaction.type === "Trade"
                            ? "bg-purple-500/20 text-purple-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}>
                          {transaction.type}
                        </span>
                      </TableCell>
                      <TableCell className="text-white">
                        {transaction.item}
                      </TableCell>
                      <TableCell className={`text-right font-medium ${
                        transaction.amount > 0 
                          ? "text-green-400" 
                          : transaction.amount < 0 
                          ? "text-red-400" 
                          : "text-white/70"
                      }`}>
                        {transaction.amount > 0 && "+"}
                        {transaction.amount} CHZ
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="mt-0">
            <h2 className="text-white font-orbitron text-xl font-bold mb-4">
              Account Settings
            </h2>
            
            <div className="bg-goinft-card rounded-xl p-6 mb-6">
              <h3 className="text-white font-medium mb-4">Wallet Connection</h3>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 bg-goinft-darker rounded-lg">
                <div>
                  <p className="text-white font-orbitron">
                    {walletAddress}
                  </p>
                  <p className="text-white/70 text-sm">
                    Connected to Chiliz Chain Mainnet (Chain ID: 88888)
                  </p>
                </div>
                
                <WalletButton variant="disconnect">
                  Disconnect
                </WalletButton>
              </div>
            </div>
            
            <div className="bg-goinft-card rounded-xl p-6 mb-6">
              <h3 className="text-white font-medium mb-4">Notifications</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-white" htmlFor="trade-offers">
                    Trade Offers
                  </label>
                  <input
                    type="checkbox"
                    id="trade-offers"
                    defaultChecked
                    className="toggle"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-white" htmlFor="new-releases">
                    New Pack Releases
                  </label>
                  <input
                    type="checkbox"
                    id="new-releases"
                    defaultChecked
                    className="toggle"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <label className="text-white" htmlFor="price-alerts">
                    Price Alerts
                  </label>
                  <input
                    type="checkbox"
                    id="price-alerts"
                    className="toggle"
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-goinft-card rounded-xl p-6">
              <h3 className="text-white font-medium mb-4">Display Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="text-white block mb-2" htmlFor="card-view">
                    Default Card View
                  </label>
                  <select
                    id="card-view"
                    className="w-full bg-goinft-darker border-none rounded-lg p-2 text-white"
                  >
                    <option value="grid">Grid</option>
                    <option value="list">List</option>
                    <option value="compact">Compact</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-white block mb-2" htmlFor="animation">
                    Animation Level
                  </label>
                  <select
                    id="animation"
                    className="w-full bg-goinft-darker border-none rounded-lg p-2 text-white"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                    <option value="off">Off</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-6">
                <Button className="bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                  Save Settings
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
