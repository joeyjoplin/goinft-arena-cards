
import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NFTCard } from "@/components/ui/nft-card";
import { AlbumCard } from "@/components/ui/album-card";
import { PackCard } from "@/components/ui/pack-card";

// Mock data for dashboard
const recentNFTs = [
  {
    id: "1",
    name: "Lionel Messi",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Messi",
    rarity: "legendary" as const,
    team: "Inter Miami",
    position: "Forward",
    isNew: true,
  },
  {
    id: "2",
    name: "Cristiano Ronaldo",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Ronaldo",
    rarity: "epic" as const,
    team: "Al Nassr",
    position: "Forward",
    isNew: true,
  },
  {
    id: "3",
    name: "Kylian Mbappé",
    image: "https://placehold.co/600x800/1a1f2c/ffffff?text=Mbappe",
    rarity: "rare" as const,
    team: "Real Madrid",
    position: "Forward",
    isNew: false,
  },
];

const featuredAlbums = [
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
];

const featuredPacks = [
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
];

const Dashboard = () => {
  const [walletBalance] = useState(100); // Mock wallet balance

  return (
    <div className="min-h-screen bg-goinft-dark pb-16">
      {/* Hero Banner */}
      <div className="relative h-64 bg-gradient-to-r from-goinft-darker to-goinft-dark overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full bg-neon-purple/30 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-neon-pink/30 filter blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 h-full flex flex-col justify-center">
          <h1 className="text-white font-orbitron text-3xl font-bold mb-2">Bem-vindo ao GoINFT</h1>
          <p className="text-white/70 text-lg max-w-xl">
            Comece a colecionar cartões digitais de futebol e complete seus álbuns!
          </p>
          
          <div className="mt-6 inline-flex items-center gap-4 bg-goinft-card/50 backdrop-blur-sm rounded-lg py-2 px-4 border border-goinft-light/30 text-white">
            <span className="font-orbitron">Saldo da Carteira:</span>
            <span className="font-bold">{walletBalance} CHZ</span>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="container mx-auto px-4 -mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Link to="/albums" className="bg-goinft-card rounded-xl p-6 text-center hover:bg-goinft-light/20 transition-colors">
            <h3 className="text-white font-orbitron text-lg font-bold mb-2">Meus Álbuns</h3>
            <p className="text-white/70 text-sm mb-4">
              Visualize e complete suas coleções de álbuns
            </p>
            <Button variant="outline" className="border-neon-purple text-white">
              Ver Álbuns
            </Button>
          </Link>
          
          <Link to="/marketplace" className="bg-goinft-card rounded-xl p-6 text-center hover:bg-goinft-light/20 transition-colors">
            <h3 className="text-white font-orbitron text-lg font-bold mb-2">Mercado</h3>
            <p className="text-white/70 text-sm mb-4">
              Compre, venda e troque cartas com outros
            </p>
            <Button variant="outline" className="border-neon-purple text-white">
              Ir para o Mercado
            </Button>
          </Link>
          
          <Link to="/packs" className="bg-goinft-card rounded-xl p-6 text-center hover:bg-goinft-light/20 transition-colors">
            <h3 className="text-white font-orbitron text-lg font-bold mb-2">Comprar Pacotes</h3>
            <p className="text-white/70 text-sm mb-4">
              Obtenha novas cartas para expandir sua coleção
            </p>
            <Button variant="outline" className="border-neon-purple text-white">
              Comprar Pacotes
            </Button>
          </Link>
          
          <Link to="/profile" className="bg-goinft-card rounded-xl p-6 text-center hover:bg-goinft-light/20 transition-colors">
            <h3 className="text-white font-orbitron text-lg font-bold mb-2">Meu Perfil</h3>
            <p className="text-white/70 text-sm mb-4">
              Visualize suas estatísticas e progresso da coleção
            </p>
            <Button variant="outline" className="border-neon-purple text-white">
              Ver Perfil
            </Button>
          </Link>
        </div>
        
        {/* Recent NFTs */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-orbitron text-2xl font-bold">Adições Recentes</h2>
            <Link to="/collection" className="text-neon-purple flex items-center font-orbitron text-sm">
              Ver Todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {recentNFTs.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
          </div>
        </section>
        
        {/* Featured Albums */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-orbitron text-2xl font-bold">Álbuns em Destaque</h2>
            <Link to="/albums" className="text-neon-purple flex items-center font-orbitron text-sm">
              Ver Todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAlbums.map((album) => (
              <AlbumCard key={album.id} {...album} />
            ))}
          </div>
        </section>
        
        {/* Featured Packs */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white font-orbitron text-2xl font-bold">Pacotes em Destaque</h2>
            <Link to="/packs" className="text-neon-purple flex items-center font-orbitron text-sm">
              Ver Todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredPacks.map((pack) => (
              <PackCard key={pack.id} {...pack} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
