
import { useState } from "react";
import { NFTCard } from "@/components/ui/nft-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter } from "lucide-react";

// Mock data for marketplace
const marketplaceCards = [
  {
    id: "m1",
    name: "Lionel Messi",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Messi",
    rarity: "legendary" as const,
    team: "Argentina",
    position: "Forward",
    price: 100,
  },
  {
    id: "m2",
    name: "Cristiano Ronaldo",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Ronaldo",
    rarity: "epic" as const,
    team: "Portugal",
    position: "Forward",
    price: 75,
  },
  {
    id: "m3",
    name: "Kylian Mbappé",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Mbappe",
    rarity: "rare" as const,
    team: "France",
    position: "Forward",
    price: 50,
  },
  {
    id: "m4",
    name: "Neymar Jr",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Neymar",
    rarity: "epic" as const,
    team: "Brazil",
    position: "Forward",
    price: 60,
  },
  {
    id: "m5",
    name: "Kevin De Bruyne",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=DeBruyne",
    rarity: "rare" as const,
    team: "Belgium",
    position: "Midfielder",
    price: 45,
  },
  {
    id: "m6",
    name: "Virgil van Dijk",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=VanDijk",
    rarity: "rare" as const,
    team: "Netherlands",
    position: "Defender",
    price: 40,
  },
  {
    id: "m7",
    name: "Robert Lewandowski",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Lewandowski",
    rarity: "rare" as const,
    team: "Poland",
    position: "Forward",
    price: 35,
  },
  {
    id: "m8",
    name: "Luka Modric",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Modric",
    rarity: "epic" as const,
    team: "Croatia",
    position: "Midfielder",
    price: 55,
  },
];

// Mock data for own cards for trading
const ownedCards = [
  {
    id: "o1",
    name: "Erling Haaland",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Haaland",
    rarity: "rare" as const,
    team: "Norway",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "o2",
    name: "Trent Alexander-Arnold",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=AlexanderArnold",
    rarity: "rare" as const,
    team: "England",
    position: "Defender",
    isOwned: true,
  },
  {
    id: "o3",
    name: "Joshua Kimmich",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Kimmich",
    rarity: "rare" as const,
    team: "Germany",
    position: "Midfielder",
    isOwned: true,
  },
  {
    id: "o4",
    name: "Jude Bellingham",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Bellingham",
    rarity: "epic" as const,
    team: "England",
    position: "Midfielder",
    isOwned: true,
  },
];

const positions = ["Forward", "Midfielder", "Defender", "Goalkeeper"];
const rarities = ["common", "rare", "epic", "legendary"];

const Marketplace = () => {
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [tradeDialogOpen, setTradeDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<typeof marketplaceCards[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPositions, setSelectedPositions] = useState<string[]>([]);
  const [selectedRarities, setSelectedRarities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [showFilters, setShowFilters] = useState(false);

  const handleOpenCardDetails = (card: typeof marketplaceCards[0]) => {
    setSelectedCard(card);
    setDetailsDialogOpen(true);
  };

  const handleOpenTradeDialog = () => {
    setDetailsDialogOpen(false);
    setTradeDialogOpen(true);
  };

  const togglePosition = (position: string) => {
    if (selectedPositions.includes(position)) {
      setSelectedPositions(selectedPositions.filter(p => p !== position));
    } else {
      setSelectedPositions([...selectedPositions, position]);
    }
  };

  const toggleRarity = (rarity: string) => {
    if (selectedRarities.includes(rarity)) {
      setSelectedRarities(selectedRarities.filter(r => r !== rarity));
    } else {
      setSelectedRarities([...selectedRarities, rarity]);
    }
  };

  // Filter cards based on selected filters
  const filteredCards = marketplaceCards.filter(card => {
    // Apply search query filter
    if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Apply position filter
    if (selectedPositions.length > 0 && !selectedPositions.includes(card.position)) {
      return false;
    }
    
    // Apply rarity filter
    if (selectedRarities.length > 0 && !selectedRarities.includes(card.rarity)) {
      return false;
    }
    
    // Apply price range filter
    if (card.price < priceRange.min || card.price > priceRange.max) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="min-h-screen bg-goinft-dark pb-16">
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="buy">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h1 className="text-white font-orbitron text-3xl font-bold">
                Marketplace
              </h1>
              <p className="text-white/70 mt-1">
                Buy, sell, and trade cards with other collectors
              </p>
            </div>
            
            <TabsList className="bg-goinft-card">
              <TabsTrigger value="buy">Buy</TabsTrigger>
              <TabsTrigger value="sell">Sell</TabsTrigger>
              <TabsTrigger value="trade">Trade</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <Input 
                  placeholder="Search cards..." 
                  className="bg-goinft-card border-none pl-10 text-white" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Button
                variant="outline"
                className="bg-goinft-card border-none text-white"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-goinft-card rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-white mb-2 block">Position</Label>
                    <div className="space-y-2">
                      {positions.map((position) => (
                        <div key={position} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`position-${position}`}
                            checked={selectedPositions.includes(position)}
                            onChange={() => togglePosition(position)}
                            className="mr-2"
                          />
                          <label htmlFor={`position-${position}`} className="text-white/70">
                            {position}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">Rarity</Label>
                    <div className="space-y-2">
                      {rarities.map((rarity) => (
                        <div key={rarity} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`rarity-${rarity}`}
                            checked={selectedRarities.includes(rarity)}
                            onChange={() => toggleRarity(rarity)}
                            className="mr-2"
                          />
                          <label htmlFor={`rarity-${rarity}`} className="text-white/70 capitalize">
                            {rarity}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-white mb-2 block">Price Range (CHZ)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Min"
                        className="bg-goinft-light border-none text-white"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      />
                      <span className="text-white">to</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        className="bg-goinft-light border-none text-white"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <Button 
                    variant="outline" 
                    className="mr-2 text-white"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedPositions([]);
                      setSelectedRarities([]);
                      setPriceRange({ min: 0, max: 100 });
                    }}
                  >
                    Reset
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                    onClick={() => setShowFilters(false)}
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          <TabsContent value="buy" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredCards.map((card) => (
                <NFTCard 
                  key={card.id} 
                  {...card} 
                  onClick={() => handleOpenCardDetails(card)} 
                />
              ))}
            </div>
            
            {filteredCards.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">No cards found matching your filters.</p>
                <Button 
                  className="mt-4 bg-goinft-light text-white"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedPositions([]);
                    setSelectedRarities([]);
                    setPriceRange({ min: 0, max: 100 });
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="sell" className="mt-0">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {ownedCards.map((card) => (
                <NFTCard 
                  key={card.id} 
                  {...card} 
                  onClick={() => setSelectedCard(card as any)} 
                />
              ))}
            </div>
            
            {ownedCards.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white/70 text-lg">You don't have any cards to sell yet.</p>
                <Button className="mt-4 bg-goinft-light text-white">
                  Buy Packs
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trade" className="mt-0">
            <div className="bg-goinft-card rounded-xl p-6 mb-6">
              <h2 className="text-white font-orbitron text-xl font-bold mb-4">
                Trading System
              </h2>
              
              <p className="text-white/70 mb-4">
                Trade your cards with other collectors. Find someone who has the card you need, 
                and offer one of your cards in exchange.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Your Cards</h3>
                  <div className="bg-goinft-dark/50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {ownedCards.slice(0, 3).map((card) => (
                        <NFTCard 
                          key={card.id} 
                          {...card} 
                          onClick={() => {}} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-white font-medium mb-2">Cards You Want</h3>
                  <div className="bg-goinft-dark/50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      {marketplaceCards.slice(0, 3).map((card) => (
                        <NFTCard 
                          key={card.id} 
                          {...card} 
                          onClick={() => {}} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button className="bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                  Propose Trade
                </Button>
              </div>
            </div>
            
            <h2 className="text-white font-orbitron text-xl font-bold mb-4">
              Open Trade Offers
            </h2>
            
            <div className="space-y-4">
              <div className="bg-goinft-card rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-orbitron">Trade #28754</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                    Open
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-white/70 block mb-2">They offer:</span>
                    <div className="flex items-center space-x-2">
                      <img 
                        src="https://placehold.co/600x800/1a1f2c/ffffff?text=Messi" 
                        alt="Card" 
                        className="w-12 h-16 rounded"
                      />
                      <div>
                        <span className="text-white block">Lionel Messi</span>
                        <span className="text-white/50 text-xs">Legendary</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-white/70 block mb-2">For your:</span>
                    <div className="flex items-center space-x-2">
                      <img 
                        src="https://placehold.co/600x800/1a1f2c/ffffff?text=Haaland" 
                        alt="Card" 
                        className="w-12 h-16 rounded"
                      />
                      <div>
                        <span className="text-white block">Erling Haaland</span>
                        <span className="text-white/50 text-xs">Rare</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-3">
                  <Button variant="outline" className="text-white">
                    Decline
                  </Button>
                  <Button className="bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                    Accept
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Card Details Dialog */}
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="bg-goinft-dark border-goinft-light sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-orbitron text-white">
              Card Details
            </DialogTitle>
          </DialogHeader>
          
          {selectedCard && (
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-64">
                <NFTCard 
                  {...selectedCard} 
                  onClick={() => {}} 
                  className="w-full md:w-64"
                />
              </div>
              
              <div className="flex-1">
                <h2 className="text-white font-orbitron text-2xl font-bold mb-2">
                  {selectedCard.name}
                </h2>
                
                <div className="grid grid-cols-2 gap-4 text-white/70 mb-6">
                  <div>
                    <span className="block text-sm">Team</span>
                    <span className="block text-white">{selectedCard.team}</span>
                  </div>
                  
                  <div>
                    <span className="block text-sm">Position</span>
                    <span className="block text-white">{selectedCard.position}</span>
                  </div>
                  
                  <div>
                    <span className="block text-sm">Rarity</span>
                    <span className="block text-white capitalize">{selectedCard.rarity}</span>
                  </div>
                  
                  <div>
                    <span className="block text-sm">Card ID</span>
                    <span className="block text-white">{selectedCard.id}</span>
                  </div>
                </div>
                
                <div className="border-t border-goinft-light pt-4 mb-4">
                  <div className="text-white/70 text-sm mb-2">Card Stats</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Pace</span>
                        <span className="text-white">92</span>
                      </div>
                      <div className="w-full bg-goinft-darker rounded-full h-1.5 mt-1">
                        <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Shooting</span>
                        <span className="text-white">95</span>
                      </div>
                      <div className="w-full bg-goinft-darker rounded-full h-1.5 mt-1">
                        <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Passing</span>
                        <span className="text-white">88</span>
                      </div>
                      <div className="w-full bg-goinft-darker rounded-full h-1.5 mt-1">
                        <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Dribbling</span>
                        <span className="text-white">97</span>
                      </div>
                      <div className="w-full bg-goinft-darker rounded-full h-1.5 mt-1">
                        <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: "97%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {'price' in selectedCard ? (
                  <div className="mt-6">
                    <div className="flex items-center mb-4">
                      <span className="text-white/70 mr-2">Price:</span>
                      <span className="text-white text-xl font-bold font-orbitron">
                        {selectedCard.price} CHZ
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-orbitron"
                    >
                      Buy Now
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-neon-purple text-white"
                      onClick={handleOpenTradeDialog}
                    >
                      Offer Trade
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <Button 
                      className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-orbitron"
                    >
                      Sell Card
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-neon-purple text-white"
                    >
                      Use in Album
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Trade Dialog */}
      <Dialog open={tradeDialogOpen} onOpenChange={setTradeDialogOpen}>
        <DialogContent className="bg-goinft-dark border-goinft-light sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-orbitron text-white">
              Propose Trade Offer
            </DialogTitle>
          </DialogHeader>
          
          {selectedCard && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
                <div>
                  <h3 className="text-center text-white/70 mb-2">You Get</h3>
                  <NFTCard 
                    {...selectedCard} 
                    onClick={() => {}} 
                    className="w-full sm:w-48"
                  />
                </div>
                
                <div className="text-3xl font-bold text-white/50 px-4">
                  ↔️
                </div>
                
                <div>
                  <h3 className="text-center text-white/70 mb-2">You Give</h3>
                  <div className="w-full sm:w-48 aspect-[3/4] rounded-xl border-2 border-dashed border-goinft-light/40 bg-goinft-card/30 flex items-center justify-center">
                    <span className="text-white/50 text-center p-4">
                      Select a card to offer
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white font-orbitron mb-3">Your Cards</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {ownedCards.map((card) => (
                    <NFTCard 
                      key={card.id} 
                      {...card} 
                      onClick={() => {}} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <Button 
                  variant="outline" 
                  className="text-white"
                  onClick={() => setTradeDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button className="bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                  Propose Trade
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Marketplace;
