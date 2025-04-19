
import { useState } from "react";
import { AlbumCard } from "@/components/ui/album-card";
import { NFTCard } from "@/components/ui/nft-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for albums
const albums = [
  {
    id: "1",
    name: "World Cup 2026",
    coverImage: "https://placehold.co/800x600/1a1f2c/ffffff?text=WorldCup2026",
    progress: 35,
    totalCards: 32,
    collectedCards: 11,
  },
  {
    id: "2",
    name: "Champions League",
    coverImage: "https://placehold.co/800x600/1a1f2c/ffffff?text=ChampionsLeague",
    progress: 20,
    totalCards: 40,
    collectedCards: 8,
  },
  {
    id: "3",
    name: "Premier League",
    coverImage: "https://placehold.co/800x600/1a1f2c/ffffff?text=PremierLeague",
    progress: 45,
    totalCards: 30,
    collectedCards: 13,
  },
  {
    id: "4",
    name: "Football Legends",
    coverImage: "https://placehold.co/800x600/1a1f2c/ffffff?text=FootballLegends",
    progress: 10,
    totalCards: 25,
    collectedCards: 2,
  },
  {
    id: "5",
    name: "Copa América",
    coverImage: "https://placehold.co/800x600/1a1f2c/ffffff?text=CopaAmerica",
    progress: 0,
    totalCards: 28,
    collectedCards: 0,
  },
];

// Mock data for album cards (World Cup 2026)
const worldCupCards = [
  {
    id: "wc1",
    name: "Lionel Messi",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Messi",
    rarity: "legendary" as const,
    team: "Argentina",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "wc2",
    name: "Cristiano Ronaldo",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Ronaldo",
    rarity: "epic" as const,
    team: "Portugal",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "wc3",
    name: "Kylian Mbappé",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Mbappe",
    rarity: "rare" as const,
    team: "France",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "wc4",
    name: "Neymar Jr",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Neymar",
    rarity: "epic" as const,
    team: "Brazil",
    position: "Forward",
    isOwned: true,
  },
  {
    id: "wc5",
    name: "Erling Haaland",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Haaland",
    rarity: "rare" as const,
    team: "Norway",
    position: "Forward",
    isOwned: false,
  },
  {
    id: "wc6",
    name: "Kevin De Bruyne",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=DeBruyne",
    rarity: "rare" as const,
    team: "Belgium",
    position: "Midfielder",
    isOwned: true,
  },
  {
    id: "wc7",
    name: "Virgil van Dijk",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=VanDijk",
    rarity: "rare" as const,
    team: "Netherlands",
    position: "Defender",
    isOwned: false,
  },
  {
    id: "wc8",
    name: "Luka Modric",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Modric",
    rarity: "epic" as const,
    team: "Croatia",
    position: "Midfielder",
    isOwned: true,
  },
];

const Albums = () => {
  const [selectedAlbum, setSelectedAlbum] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("all-albums");

  const handleAlbumClick = (albumId: string) => {
    setSelectedAlbum(albumId);
    setActiveTab("album-view");
  };

  const handleBackToAlbums = () => {
    setSelectedAlbum(null);
    setActiveTab("all-albums");
  };

  return (
    <div className="min-h-screen bg-goinft-dark pb-16">
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-white font-orbitron text-3xl font-bold">
              {selectedAlbum ? "Album View" : "My Albums"}
            </h1>
            
            <TabsList className="bg-goinft-card">
              {selectedAlbum && (
                <TabsTrigger value="all-albums" onClick={handleBackToAlbums}>
                  All Albums
                </TabsTrigger>
              )}
              <TabsTrigger value="album-view">
                {selectedAlbum ? "Card View" : "Albums"}
              </TabsTrigger>
              {selectedAlbum && (
                <TabsTrigger value="album-progress">
                  Progress
                </TabsTrigger>
              )}
            </TabsList>
          </div>
          
          <TabsContent value="all-albums" className="mt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {albums.map((album) => (
                <AlbumCard 
                  key={album.id} 
                  {...album} 
                  onClick={() => handleAlbumClick(album.id)} 
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="album-view" className="mt-0">
            {selectedAlbum ? (
              <>
                <div className="bg-goinft-card rounded-xl p-6 mb-8">
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-64">
                      <img 
                        src={albums.find(a => a.id === selectedAlbum)?.coverImage} 
                        alt={albums.find(a => a.id === selectedAlbum)?.name}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h2 className="text-white font-orbitron text-2xl font-bold mb-2">
                        {albums.find(a => a.id === selectedAlbum)?.name}
                      </h2>
                      
                      <div className="grid grid-cols-2 gap-4 text-white/70 mb-4">
                        <div>
                          <span className="block text-sm">Total Cards</span>
                          <span className="block text-xl font-bold text-white">
                            {albums.find(a => a.id === selectedAlbum)?.totalCards}
                          </span>
                        </div>
                        
                        <div>
                          <span className="block text-sm">Collected</span>
                          <span className="block text-xl font-bold text-white">
                            {albums.find(a => a.id === selectedAlbum)?.collectedCards}
                          </span>
                        </div>
                        
                        <div>
                          <span className="block text-sm">Progress</span>
                          <span className="block text-xl font-bold text-white">
                            {Math.round(albums.find(a => a.id === selectedAlbum)?.progress || 0)}%
                          </span>
                        </div>
                        
                        <div>
                          <span className="block text-sm">Missing</span>
                          <span className="block text-xl font-bold text-white">
                            {(albums.find(a => a.id === selectedAlbum)?.totalCards || 0) - 
                             (albums.find(a => a.id === selectedAlbum)?.collectedCards || 0)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="w-full bg-goinft-darker rounded-full h-2.5 mb-6">
                        <div 
                          className="bg-gradient-to-r from-neon-purple to-neon-pink h-2.5 rounded-full" 
                          style={{ width: `${albums.find(a => a.id === selectedAlbum)?.progress}%` }}
                        ></div>
                      </div>
                      
                      <p className="text-white/70 mb-4">
                        Complete this album to earn exclusive rewards and achievements!
                      </p>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-white font-orbitron text-xl font-bold mb-4">Album Cards</h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {worldCupCards.map((card) => (
                    <NFTCard key={card.id} {...card} />
                  ))}
                  
                  {/* Empty card slots */}
                  {Array.from({ length: 4 }).map((_, index) => (
                    <div 
                      key={`empty-${index}`} 
                      className="aspect-[3/4] rounded-xl border-2 border-dashed border-goinft-light/30 bg-goinft-card/50 flex items-center justify-center"
                    >
                      <span className="text-white/30 font-orbitron">Empty Slot</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {albums.map((album) => (
                  <AlbumCard 
                    key={album.id} 
                    {...album} 
                    onClick={() => handleAlbumClick(album.id)} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="album-progress" className="mt-0">
            {selectedAlbum && (
              <div className="bg-goinft-card rounded-xl p-6">
                <h3 className="text-white font-orbitron text-xl font-bold mb-6">
                  Album Completion Progress
                </h3>
                
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">Common Cards</span>
                      <span className="text-white/70">8/12</span>
                    </div>
                    <div className="w-full bg-goinft-darker rounded-full h-2.5">
                      <div className="bg-gray-400 h-2.5 rounded-full" style={{ width: "66.6%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">Rare Cards</span>
                      <span className="text-white/70">3/10</span>
                    </div>
                    <div className="w-full bg-goinft-darker rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">Epic Cards</span>
                      <span className="text-white/70">2/7</span>
                    </div>
                    <div className="w-full bg-goinft-darker rounded-full h-2.5">
                      <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: "28.5%" }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-white font-medium">Legendary Cards</span>
                      <span className="text-white/70">1/3</span>
                    </div>
                    <div className="w-full bg-goinft-darker rounded-full h-2.5">
                      <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: "33.3%" }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-goinft-light/20 rounded-lg border border-neon-purple/30">
                  <h4 className="text-white font-orbitron font-bold mb-2">Album Rewards</h4>
                  <ul className="space-y-2 text-white/70">
                    <li className="flex items-center">
                      <span className="w-24">50% Complete</span>
                      <span className="ml-2 px-2 py-0.5 rounded bg-goinft-card text-xs">Special Card</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-24">75% Complete</span>
                      <span className="ml-2 px-2 py-0.5 rounded bg-goinft-card text-xs">10 CHZ Tokens</span>
                    </li>
                    <li className="flex items-center">
                      <span className="w-24">100% Complete</span>
                      <span className="ml-2 px-2 py-0.5 rounded bg-goinft-card text-xs">Exclusive NFT</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Albums;
