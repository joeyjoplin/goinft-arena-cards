import { useState } from "react";
import { NFTCard } from "@/components/ui/nft-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Filter } from "lucide-react";

const marketplaceCards = [
  {
    id: "m1",
    name: "Ana Silva",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=AnaSilva",
    rarity: "legendary" as const,
    team: "São Paulo FC",
    position: "Atacante",
    price: 100,
  },
  {
    id: "m2",
    name: "Carlos Santos",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=CarlosSantos",
    rarity: "epic" as const,
    team: "Palmeiras",
    position: "Atacante",
    price: 75,
  },
  {
    id: "m3",
    name: "Beatriz Oliveira",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=BeatrizOliveira",
    rarity: "rare" as const,
    team: "Corinthians",
    position: "Atacante",
    price: 50,
  },
  {
    id: "m4",
    name: "Pedro Costa",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=PedroCosta",
    rarity: "epic" as const,
    team: "Santos FC",
    position: "Atacante",
    price: 60,
  },
  {
    id: "m5",
    name: "Marina Lima",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=MarinaLima",
    rarity: "rare" as const,
    team: "Ferroviária",
    position: "Meio-Campo",
    price: 45,
  },
  {
    id: "m6",
    name: "Lucas Pereira",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=LucasPereira",
    rarity: "rare" as const,
    team: "Internacional",
    position: "Defensor",
    price: 40,
  },
  {
    id: "m7",
    name: "Carolina Souza",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=CarolinaSouza",
    rarity: "rare" as const,
    team: "Cruzeiro",
    position: "Atacante",
    price: 35,
  },
  {
    id: "m8",
    name: "Roberto Almeida",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=RobertoAlmeida",
    rarity: "epic" as const,
    team: "Flamengo",
    position: "Meio-Campo",
    price: 55,
  },
];

const ownedCards = [
  {
    id: "o1",
    name: "Julia Santos",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=JuliaSantos",
    rarity: "rare" as const,
    team: "Palmeiras",
    position: "Atacante",
    isOwned: true,
  },
  {
    id: "o2",
    name: "Marcos Silva",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=MarcosSilva",
    rarity: "rare" as const,
    team: "São Paulo FC",
    position: "Defensor",
    isOwned: true,
  },
  {
    id: "o3",
    name: "Fernanda Lima",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=FernandaLima",
    rarity: "rare" as const,
    team: "Santos FC",
    position: "Meio-Campo",
    isOwned: true,
  },
  {
    id: "o4",
    name: "Gabriel Costa",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=GabrielCosta",
    rarity: "epic" as const,
    team: "Corinthians",
    position: "Meio-Campo",
    isOwned: true,
  },
];

const positions = ["Atacante", "Meio-Campo", "Defensor", "Goleiro"];
const rarities = ["comum", "raro", "épico", "lendário"];

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

  const filteredCards = marketplaceCards.filter(card => {
    if (searchQuery && !card.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    if (selectedPositions.length > 0 && !selectedPositions.includes(card.position)) {
      return false;
    }
    
    if (selectedRarities.length > 0 && !selectedRarities.includes(card.rarity)) {
      return false;
    }
    
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
                Mercado
              </h1>
              <p className="text-white/70 mt-1">
                Compre, venda e troque cards com outros colecionadores
              </p>
            </div>
            
            <TabsList className="bg-goinft-card">
              <TabsTrigger value="buy">Comprar</TabsTrigger>
              <TabsTrigger value="sell">Vender</TabsTrigger>
              <TabsTrigger value="trade">Trocar</TabsTrigger>
            </TabsList>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                <Input 
                  placeholder="Buscar cards..." 
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
                Filtros
              </Button>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-goinft-card rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-white mb-2 block">Posição</Label>
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
                    <Label className="text-white mb-2 block">Raridade</Label>
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
                    <Label className="text-white mb-2 block">Faixa de Preço (CHZ)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Mín"
                        className="bg-goinft-light border-none text-white"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                      />
                      <span className="text-white">até</span>
                      <Input
                        type="number"
                        placeholder="Máx"
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
                    Limpar
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-neon-purple to-neon-pink text-white"
                    onClick={() => setShowFilters(false)}
                  >
                    Aplicar Filtros
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
                <p className="text-white/70 text-lg">Nenhum card encontrado com os filtros selecionados.</p>
                <Button 
                  className="mt-4 bg-goinft-light text-white"
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedPositions([]);
                    setSelectedRarities([]);
                    setPriceRange({ min: 0, max: 100 });
                  }}
                >
                  Limpar Filtros
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
                <p className="text-white/70 text-lg">Você ainda não tem cards para vender.</p>
                <Button className="mt-4 bg-goinft-light text-white">
                  Comprar Pacotes
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trade" className="mt-0">
            <div className="bg-goinft-card rounded-xl p-6 mb-6">
              <h2 className="text-white font-orbitron text-xl font-bold mb-4">
                Sistema de Trocas
              </h2>
              
              <p className="text-white/70 mb-4">
                Troque seus cards com outros colecionadores. Encontre alguém que tenha o card que você precisa 
                e ofereça um dos seus cards em troca.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-white font-medium mb-2">Seus Cards</h3>
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
                  <h3 className="text-white font-medium mb-2">Cards Desejados</h3>
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
                  Propor Troca
                </Button>
              </div>
            </div>
            
            <h2 className="text-white font-orbitron text-xl font-bold mb-4">
              Ofertas de Troca Abertas
            </h2>
            
            <div className="space-y-4">
              <div className="bg-goinft-card rounded-xl p-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-white font-orbitron">Troca #28754</span>
                  <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs font-medium">
                    Aberta
                  </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-white/70 block mb-2">Eles oferecem:</span>
                    <div className="flex items-center space-x-2">
                      <img 
                        src="https://placehold.co/600x800/1a1f2c/ffffff?text=AnaSilva" 
                        alt="Card" 
                        className="w-12 h-16 rounded"
                      />
                      <div>
                        <span className="text-white block">Ana Silva</span>
                        <span className="text-white/50 text-xs">Lendário</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <span className="text-white/70 block mb-2">Pelo seu:</span>
                    <div className="flex items-center space-x-2">
                      <img 
                        src="https://placehold.co/600x800/1a1f2c/ffffff?text=JuliaSantos" 
                        alt="Card" 
                        className="w-12 h-16 rounded"
                      />
                      <div>
                        <span className="text-white block">Julia Santos</span>
                        <span className="text-white/50 text-xs">Raro</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end space-x-3">
                  <Button variant="outline" className="text-white">
                    Recusar
                  </Button>
                  <Button className="bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                    Aceitar
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Dialog open={detailsDialogOpen} onOpenChange={setDetailsDialogOpen}>
        <DialogContent className="bg-goinft-dark border-goinft-light sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-orbitron text-white">
              Detalhes do Card
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
                    <span className="block text-sm">Time</span>
                    <span className="block text-white">{selectedCard.team}</span>
                  </div>
                  
                  <div>
                    <span className="block text-sm">Posição</span>
                    <span className="block text-white">{selectedCard.position}</span>
                  </div>
                  
                  <div>
                    <span className="block text-sm">Raridade</span>
                    <span className="block text-white capitalize">{selectedCard.rarity}</span>
                  </div>
                  
                  <div>
                    <span className="block text-sm">ID do Card</span>
                    <span className="block text-white">{selectedCard.id}</span>
                  </div>
                </div>
                
                <div className="border-t border-goinft-light pt-4 mb-4">
                  <div className="text-white/70 text-sm mb-2">Estatísticas do Card</div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Velocidade</span>
                        <span className="text-white">92</span>
                      </div>
                      <div className="w-full bg-goinft-darker rounded-full h-1.5 mt-1">
                        <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: "92%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Finalização</span>
                        <span className="text-white">95</span>
                      </div>
                      <div className="w-full bg-goinft-darker rounded-full h-1.5 mt-1">
                        <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: "95%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Passe</span>
                        <span className="text-white">88</span>
                      </div>
                      <div className="w-full bg-goinft-darker rounded-full h-1.5 mt-1">
                        <div className="bg-neon-purple h-1.5 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between">
                        <span className="text-white">Drible</span>
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
                      <span className="text-white/70 mr-2">Preço:</span>
                      <span className="text-white text-xl font-bold font-orbitron">
                        {selectedCard.price} CHZ
                      </span>
                    </div>
                    
                    <Button 
                      className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-orbitron"
                    >
                      Comprar Agora
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-neon-purple text-white"
                      onClick={handleOpenTradeDialog}
                    >
                      Oferecer Troca
                    </Button>
                  </div>
                ) : (
                  <div className="mt-6">
                    <Button 
                      className="w-full py-6 bg-gradient-to-r from-neon-purple to-neon-pink text-white font-orbitron"
                    >
                      Vender Card
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full mt-3 border-neon-purple text-white"
                    >
                      Usar no Álbum
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <Dialog open={tradeDialogOpen} onOpenChange={setTradeDialogOpen}>
        <DialogContent className="bg-goinft-dark border-goinft-light sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-center text-xl font-orbitron text-white">
              Propor Troca
            </DialogTitle>
          </DialogHeader>
          
          {selectedCard && (
            <div>
              <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-6">
                <div>
                  <h3 className="text-center text-white/70 mb-2">Você Recebe</h3>
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
                  <h3 className="text-center text-white/70 mb-2">Você Oferece</h3>
                  <div className="w-full sm:w-48 aspect-[3/4] rounded-xl border-2 border-dashed border-goinft-light/40 bg-goinft-card/30 flex items-center justify-center">
                    <span className="text-white/50 text-center p-4">
                      Selecione um card para oferecer
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-white font-orbitron mb-3">Seus Cards</h3>
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
                  Cancelar
                </Button>
                <Button className="bg-gradient-to-r from-neon-purple to-neon-pink text-white">
                  Propor Troca
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
