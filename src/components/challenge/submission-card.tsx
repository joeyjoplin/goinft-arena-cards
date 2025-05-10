
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ThumbsUp, MessageCircle } from "lucide-react";
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
      year: "numeric"
    }).format(date);
  };

  const formatAddress = (address: string) => {
    return address;
  };

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 transform",
        "bg-goinft-card border-none hover:shadow-lg",
        isHovered ? "scale-[1.02]" : "scale-100"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative pb-[75%]">
        <img 
          src={submission.albumCover} 
          alt={submission.albumTitle} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="text-xl font-orbitron font-bold text-white mb-1">
            {submission.albumTitle}
          </h3>
          <p className="text-sm text-gray-300">
            by {submission.creator}
          </p>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-400">
            Submitted {formatDate(submission.createdAt)}
          </span>
          
          <span className="text-sm text-gray-400">
            {formatAddress(submission.creatorAddress)}
          </span>
        </div>

        <div className="flex items-center gap-4">
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
              submission.userHasVoted ? "text-white animate-bounce" : "text-gray-400"
            )} />
            <span>{submission.userHasVoted ? "Voted" : "Vote"}</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="gap-2"
          >
            <MessageCircle className="h-4 w-4 text-gray-400" />
            <span>Comment</span>
          </Button>
          
          <div className="ml-auto flex items-center gap-1">
            <div className={cn(
              "text-lg font-orbitron",
              submission.userHasVoted ? "text-neon-purple font-bold" : "text-gray-300"
            )}>
              {submission.votes.toLocaleString()}
            </div>
            <span className="text-xs text-gray-400">votes</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
