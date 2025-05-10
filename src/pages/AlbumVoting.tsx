
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ChevronUp, 
  TrendingUp, 
  Clock, 
  ThumbsUp, 
  Filter,
  Search
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { AlbumVoteCard } from "@/components/album/album-vote-card";
import { useToast } from "@/hooks/use-toast";

// Types for album data
type SortOption = "most-voted" | "newest" | "trending";
type Category = "all" | "womens-football" | "legendary-matches" | "rising-stars" | "world-cup";

interface Album {
  id: string;
  title: string;
  creator: string;
  creatorAddress: string;
  coverImage: string;
  stickerCount: number;
  votes: number;
  createdAt: Date;
  category: Category;
  isVoted: boolean;
}

export default function AlbumVoting() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<SortOption>("most-voted");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Category[]>(["all"]);
  const [featuredAlbums, setFeaturedAlbums] = useState<Album[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Mock data for albums
    const mockAlbums: Album[] = [
      {
        id: "1",
        title: "Women's World Cup 2023",
        creator: "FIFA Official",
        creatorAddress: "0x1234...5678",
        coverImage: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=1687&auto=format&fit=crop",
        stickerCount: 134,
        votes: 2456,
        createdAt: new Date(2023, 6, 15),
        category: "womens-football",
        isVoted: false
      },
      {
        id: "2",
        title: "Legends of Football",
        creator: "HistoryMaker",
        creatorAddress: "0xabcd...efgh",
        coverImage: "https://images.unsplash.com/photo-1626248801379-51a0748a5f96?q=80&w=1470&auto=format&fit=crop",
        stickerCount: 98,
        votes: 1823,
        createdAt: new Date(2023, 5, 22),
        category: "legendary-matches",
        isVoted: false
      },
      {
        id: "3",
        title: "NextGen Stars 2025",
        creator: "ScoutPro",
        creatorAddress: "0x7890...1234",
        coverImage: "https://images.unsplash.com/photo-1517747614396-d21a5925eee6?q=80&w=1374&auto=format&fit=crop",
        stickerCount: 112,
        votes: 943,
        createdAt: new Date(2023, 8, 5),
        category: "rising-stars",
        isVoted: true
      },
      {
        id: "4",
        title: "World Cup Qatar Memories",
        creator: "WorldCupFan",
        creatorAddress: "0xdefg...5678",
        coverImage: "https://images.unsplash.com/photo-1638913662380-9799def8ffb1?q=80&w=1470&auto=format&fit=crop",
        stickerCount: 150,
        votes: 3102,
        createdAt: new Date(2023, 2, 18),
        category: "world-cup",
        isVoted: false
      },
      {
        id: "5",
        title: "Rising Stars: Americas",
        creator: "TalentSpotter",
        creatorAddress: "0xijkl...9012",
        coverImage: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=1469&auto=format&fit=crop",
        stickerCount: 76,
        votes: 682,
        createdAt: new Date(2023, 9, 30),
        category: "rising-stars",
        isVoted: false
      },
      {
        id: "6",
        title: "Women's Football Pioneers",
        creator: "SoccerHerstory",
        creatorAddress: "0xmnop...3456",
        coverImage: "https://images.unsplash.com/photo-1571925401922-ea31e412bbfa?q=80&w=1443&auto=format&fit=crop",
        stickerCount: 64,
        votes: 1205,
        createdAt: new Date(2023, 7, 12),
        category: "womens-football",
        isVoted: false
      },
    ];

    // Sort and filter albums based on active tab
    let sortedAlbums = [...mockAlbums];
    
    switch (activeTab) {
      case "most-voted":
        sortedAlbums.sort((a, b) => b.votes - a.votes);
        break;
      case "newest":
        sortedAlbums.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "trending":
        // For trending, we'd normally use a more complex algorithm, 
        // but for demo purposes, we'll use a combination of recency and votes
        sortedAlbums.sort((a, b) => {
          const recencyScoreA = (Date.now() - a.createdAt.getTime()) / (1000 * 60 * 60 * 24);
          const recencyScoreB = (Date.now() - b.createdAt.getTime()) / (1000 * 60 * 60 * 24);
          const trendScoreA = a.votes / (recencyScoreA + 1);
          const trendScoreB = b.votes / (recencyScoreB + 1);
          return trendScoreB - trendScoreA;
        });
        break;
    }

    // Apply category filter if not set to "all"
    if (activeCategories.length === 1 && activeCategories[0] === "all") {
      setAlbums(sortedAlbums);
    } else {
      const filteredAlbums = sortedAlbums.filter(album => 
        activeCategories.includes(album.category)
      );
      setAlbums(filteredAlbums);
    }

    // Set featured albums (top 3 most voted)
    setFeaturedAlbums(mockAlbums.sort((a, b) => b.votes - a.votes).slice(0, 3));
  }, [activeTab, activeCategories]);

  // Handle voting on an album
  const handleVote = (albumId: string) => {
    setAlbums(prevAlbums => 
      prevAlbums.map(album => {
        if (album.id === albumId) {
          const newIsVoted = !album.isVoted;
          return {
            ...album,
            votes: newIsVoted ? album.votes + 1 : album.votes - 1,
            isVoted: newIsVoted
          };
        }
        return album;
      })
    );

    toast({
      title: "Vote registered!",
      description: "Your vote has been successfully recorded.",
    });
  };

  // Handle category filter
  const toggleCategory = (category: Category) => {
    if (category === "all") {
      setActiveCategories(["all"]);
      return;
    }

    setActiveCategories(prev => {
      // Remove "all" from the array when selecting specific categories
      const withoutAll = prev.filter(c => c !== "all");
      
      if (withoutAll.includes(category)) {
        const result = withoutAll.filter(c => c !== category);
        // If no categories are selected, default back to "all"
        return result.length === 0 ? ["all"] : result;
      } else {
        return [...withoutAll, category];
      }
    });
  };

  // Filtered albums based on search query
  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    album.creator.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container px-4 py-8 mx-auto max-w-7xl">
      {/* Page header */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold font-orbitron mb-2 bg-gradient-to-r from-neon-purple to-neon-blue text-transparent bg-clip-text">
          Community Album Voting
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto">
          Vote on your favorite NFT sticker albums created by the community. The most popular designs will be featured in our marketplace.
        </p>
      </div>

      {/* Featured albums carousel */}
      <div className="mb-12">
        <h2 className="text-2xl font-orbitron mb-4">Featured Albums</h2>
        <Carousel className="w-full">
          <CarouselContent>
            {featuredAlbums.map((album) => (
              <CarouselItem key={album.id} className="md:basis-1/2 lg:basis-1/3">
                <AlbumVoteCard
                  album={album}
                  onVote={handleVote}
                  featured={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Search and filter bar */}
      <div className="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Search albums or creators..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-goinft-card border-goinft-light/30 focus-visible:ring-neon-purple"
          />
        </div>

        <div className="flex gap-2 items-center overflow-x-auto pb-2 w-full md:w-auto">
          <Filter className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-300 mr-1">Categories:</span>
          
          {["all", "womens-football", "legendary-matches", "rising-stars", "world-cup"].map((category) => (
            <Badge 
              key={category}
              variant="outline"
              className={`cursor-pointer whitespace-nowrap ${
                activeCategories.includes(category as Category) 
                  ? "bg-neon-purple/20 border-neon-purple" 
                  : "bg-transparent hover:bg-goinft-card"
              }`}
              onClick={() => toggleCategory(category as Category)}
            >
              {category === "womens-football" ? "Women's Football" : 
               category === "legendary-matches" ? "Legendary Matches" :
               category === "rising-stars" ? "Rising Stars" :
               category === "world-cup" ? "World Cup" : "All"}
            </Badge>
          ))}
        </div>
      </div>

      {/* Sorting tabs */}
      <Tabs 
        defaultValue="most-voted" 
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as SortOption)}
        className="mb-6"
      >
        <TabsList className="bg-goinft-card">
          <TabsTrigger value="most-voted" className="data-[state=active]:bg-goinft-light">
            <ThumbsUp className="h-4 w-4 mr-2" /> Most Voted
          </TabsTrigger>
          <TabsTrigger value="newest" className="data-[state=active]:bg-goinft-light">
            <Clock className="h-4 w-4 mr-2" /> Newest
          </TabsTrigger>
          <TabsTrigger value="trending" className="data-[state=active]:bg-goinft-light">
            <TrendingUp className="h-4 w-4 mr-2" /> Trending
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Albums grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlbums.length > 0 ? (
          filteredAlbums.map(album => (
            <AlbumVoteCard
              key={album.id}
              album={album}
              onVote={handleVote}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-20">
            <p className="text-xl text-gray-400">No albums match your search criteria.</p>
            <Button 
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchQuery("");
                setActiveCategories(["all"]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
