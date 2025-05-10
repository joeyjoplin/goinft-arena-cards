
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlbumVoteCardProps {
  album: {
    id: string;
    title: string;
    creator: string;
    creatorAddress: string;
    coverImage: string;
    stickerCount: number;
    votes: number;
    createdAt: Date;
    category: string;
    isVoted: boolean;
  };
  onVote: (id: string) => void;
  featured?: boolean;
}

export function AlbumVoteCard({ album, onVote, featured = false }: AlbumVoteCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "womens-football":
        return "Women's Football";
      case "legendary-matches":
        return "Legendary Matches";
      case "rising-stars":
        return "Rising Stars";
      case "world-cup":
        return "World Cup";
      default:
        return category;
    }
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 transform border-none",
        "bg-goinft-card hover:shadow-lg",
        isHovered ? "scale-[1.02]" : "scale-100",
        featured && "animate-pulse-glow"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[65%]">
        <img 
          src={album.coverImage} 
          alt={album.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {featured && (
          <div className="absolute top-2 right-2">
            <Badge className="bg-neon-blue text-white font-orbitron animate-glow">
              Featured
            </Badge>
          </div>
        )}
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute left-0 bottom-0 w-full p-4">
          <h3 className="text-xl font-orbitron font-bold text-white mb-1 line-clamp-2">
            {album.title}
          </h3>
          <div className="flex items-center justify-between text-gray-300 text-sm">
            <span>by {album.creator}</span>
            <span>{album.stickerCount} stickers</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="bg-goinft-light/30 text-gray-300">
            {getCategoryLabel(album.category)}
          </Badge>
          <span className="text-sm text-gray-400">Created {formatDate(album.createdAt)}</span>
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onVote(album.id);
            }}
            variant={album.isVoted ? "default" : "outline"}
            size="sm"
            className={cn(
              "gap-2 transition-all",
              album.isVoted ? 
                "bg-neon-purple hover:bg-neon-purple/90" : 
                "hover:bg-neon-purple/20 hover:border-neon-purple"
            )}
          >
            <ChevronUp className={cn(
              "h-4 w-4 transition-transform",
              album.isVoted ? "text-white animate-bounce" : "text-gray-400"
            )} />
            <span>{album.isVoted ? "Voted" : "Vote"}</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "text-lg font-orbitron",
              album.isVoted ? "text-neon-purple font-bold" : "text-gray-300"
            )}>
              {album.votes.toLocaleString()}
            </div>
            <span className="text-xs text-gray-400">votes</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
