
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubmissionCardProps {
  submission: {
    id: string;
    albumId: string;
    albumTitle: string;
    albumCover: string;
    creator: string;
    creatorAddress: string;
    teamId: string;
    challengeId: string;
    createdAt: Date;
    votes: number;
    userHasVoted: boolean;
  };
  onVote: () => void;
}

export function SubmissionCard({ submission, onVote }: SubmissionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 transform border-none",
        "bg-goinft-card hover:shadow-lg",
        isHovered ? "scale-[1.02]" : "scale-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[65%]">
        <img 
          src={submission.albumCover} 
          alt={submission.albumTitle} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute left-0 bottom-0 w-full p-4">
          <h3 className="text-xl font-orbitron font-bold text-white mb-1 line-clamp-2">
            {submission.albumTitle}
          </h3>
          <div className="flex items-center justify-between text-gray-300 text-sm">
            <span>by {submission.creator}</span>
            <span>{formatDate(submission.createdAt)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4 pt-3">
        <div className="flex items-center justify-between">
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onVote();
            }}
            variant={submission.userHasVoted ? "default" : "outline"}
            size="sm"
            className={cn(
              "gap-2 transition-all",
              submission.userHasVoted ? 
                "bg-neon-purple hover:bg-neon-purple/90" : 
                "hover:bg-neon-purple/20 hover:border-neon-purple"
            )}
          >
            <ThumbsUp className={cn(
              "h-4 w-4 transition-transform",
              submission.userHasVoted ? "text-white" : "text-gray-400"
            )} />
            <span>{submission.userHasVoted ? "Voted" : "Vote"}</span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className={cn(
              "text-lg font-orbitron",
              submission.userHasVoted ? "text-neon-purple font-bold" : "text-gray-300"
            )}>
              {submission.votes.toLocaleString()}
            </div>
            <span className="text-xs text-gray-400">votes</span>
          </div>
        </div>
        
        <div className="mt-3 flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 text-xs hover:bg-goinft-light/50"
          >
            <MessageSquare className="h-3 w-3 text-gray-400" />
            <span>Comments</span>
          </Button>
          
          <Badge variant="outline" className="text-xs bg-goinft-light/20">
            Album #{submission.albumId.slice(-4)}
          </Badge>
        </div>
      </div>
    </Card>
  );
}
