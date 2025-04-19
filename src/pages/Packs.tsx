
import { useState } from "react";
import { PackCard } from "@/components/ui/pack-card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/ui/nft-card";

// Mock data for packs
const packData = [
  {
    id: "1",
    name: "Standard Pack",
    image: "https://placehold.co/800x600/1a1f2c/ffffff?text=StandardPack",
    description: "Contains 5 random player cards",
    price: 10,
    cardsCount: 5,
    type: "common" as const,
  },
  {
    id: "2",
    name: "Premium Pack",
    image: "https://placehold.co/800x600/1a1f2c/ffffff?text=PremiumPack",
    description: "Higher chance of rare players",
    price: 25,
    cardsCount: 5,
    type: "rare" as const,
  },
  {
    id: "3",
    name: "World Cup Pack",
    image: "https://placehold.co/800x600/1a1f2c/ffffff?text=WorldCupPack",
    description: "World Cup 2026 themed cards",
    price: 30,
    cardsCount: 5,
    type: "themed" as const,
  },
  {
    id: "4",
    name: "Legends Pack",
    image: "https://placehold.co/800x600/1a1f2c/ffffff?text=LegendsPack",
    description: "Contains football legends cards",
    price: 50,
    cardsCount: 5,
    type: "themed" as const,
  }
];

// Mock data for cards in a pack
const packCards = [
  {
    id: "wc1",
    name: "Lionel Messi",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Messi",
    rarity: "legendary" as const,
    team: "Argentina",
    position: "Forward",
    isNew: true,
  },
  {
    id: "wc2",
    name: "Cristiano Ronaldo",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Ronaldo",
    rarity: "epic" as const,
    team: "Portugal",
    position: "Forward",
    isNew: true,
  },
  {
    id: "wc3",
    name: "Neymar Jr",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Neymar",
    rarity: "rare" as const,
    team: "Brazil",
    position: "Forward",
    isNew: true,
  },
  {
    id: "wc4",
    name: "Kevin De Bruyne",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=DeBruyne",
    rarity: "rare" as const,
    team: "Belgium",
    position: "Midfielder",
    isNew: true,
  },
  {
    id: "wc5",
    name: "Erling Haaland",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Haaland",
    rarity: "common" as const,
    team: "Norway",
    position: "Forward",
    isNew: true,
  },
];

const Packs = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [openingPack, setOpeningPack] = useState(false);
  const [revealedCards, setRevealedCards] = useState<number[]>([]);
  const [selectedPack, setSelectedPack] = useState<typeof packData[0] | null>(null);

  const handleOpenPack = (pack: typeof packData[0]) => {
    setSelectedPack(pack);
    setDialogOpen(true);
    setOpeningPack(true);
    setRevealedCards([]);
    
    // Simulate pack opening animation
    setTimeout(() => {
      setOpeningPack(false);
    }, 2000);
  };

  const handleRevealCard = (index: number) => {
    setRevealedCards((prev) => [...prev, index]);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setRevealedCards([]);
    setSelectedPack(null);
  };

  return (
    <div className="min-h-screen bg-goinft-dark pb-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-white font-orbitron text-3xl font-bold">
            Card Packs
          </h1>
          <div className="bg-goinft-card px-4 py-2 rounded-lg text-white">
            <span className="font-orbitron">Balance:</span>
            <span className="font-bold ml-2">100 CHZ</span>
          </div>
        </div>
        
        <p className="text-white/70 max-w-3xl mb-8">
          Purchase packs to expand your collection. Each pack contains a random selection of player cards with varying rarities.
          Open packs to reveal your new cards and add them to your collection.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {packData.map((pack) => (
            <PackCard 
              key={pack.id} 
              {...pack} 
              onClick={() => handleOpenPack(pack)} 
            />
          ))}
        </div>
      </div>
      
      {/* Pack Opening Dialog */}
      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="bg-goinft-dark border-goinft-light sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-orbitron text-white">
              {openingPack ? "Opening Pack..." : "Your New Cards!"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            {openingPack ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-48 h-64 bg-gradient-to-r from-neon-purple to-neon-pink rounded-xl animate-pulse-glow flex items-center justify-center">
                  <img 
                    src={selectedPack?.image} 
                    alt="Pack" 
                    className="w-32 h-32 animate-float"
                  />
                </div>
                <p className="mt-6 text-white font-orbitron">
                  Revealing your cards...
                </p>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {packCards.map((card, index) => (
                    <div key={card.id} className="relative">
                      {revealedCards.includes(index) ? (
                        <NFTCard {...card} className="animate-card-reveal" />
                      ) : (
                        <div 
                          className="aspect-[3/4] rounded-xl bg-gradient-to-r from-neon-purple to-neon-pink cursor-pointer"
                          onClick={() => handleRevealCard(index)}
                        >
                          <div className="w-full h-full bg-goinft-card m-0.5 rounded-lg flex items-center justify-center">
                            <span className="text-white font-orbitron">Tap to Reveal</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-center">
                  <Button 
                    className="bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 font-orbitron px-8"
                    onClick={handleCloseDialog}
                  >
                    Done
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Packs;
