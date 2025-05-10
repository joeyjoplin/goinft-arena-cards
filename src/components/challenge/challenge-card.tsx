
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Trophy, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChallengeCountdown } from "./challenge-countdown";

interface ChallengeCardProps {
  challenge: {
    id: string;
    title: string;
    description: string;
    theme: string;
    teamId: string;
    teamName: string;
    teamLogo: string;
    isVerified: boolean;
    startDate: Date;
    endDate: Date;
    prizeTiers: {
      tier: string;
      reward: string;
    }[];
    submissionCount: number;
    status: "open" | "closed";
  };
  isSelected?: boolean;
  onSelect: () => void;
  onJoin: () => void;
}

export function ChallengeCard({ 
  challenge, 
  isSelected = false,
  onSelect,
  onJoin 
}: ChallengeCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const isActive = challenge.status === "open";

  return (
    <Card
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300 transform border-none",
        "bg-goinft-card hover:shadow-lg",
        isHovered ? "scale-[1.02]" : "scale-100",
        isSelected && "ring-2 ring-neon-purple",
        !isActive && "opacity-80"
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Team banner */}
      <div className="relative h-32">
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"
          style={{
            backgroundImage: `url(${challenge.teamLogo})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-4 flex items-center">
          <div className="w-12 h-12 bg-white rounded-full overflow-hidden border-2 border-white mr-3">
            <img 
              src={challenge.teamLogo} 
              alt={challenge.teamName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center">
              <h3 className="text-lg font-semibold text-white">{challenge.teamName}</h3>
              {challenge.isVerified && (
                <Badge variant="outline" className="ml-2 bg-blue-500/20 border-blue-400 flex items-center gap-1">
                  <Check className="h-3 w-3" /> Verified
                </Badge>
              )}
            </div>
            <p className="text-xs text-gray-300">Created {formatDate(challenge.startDate)}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3">
          <Badge variant="outline" className="bg-neon-purple/10 text-neon-purple border-neon-purple/30">
            {challenge.theme}
          </Badge>
          
          {challenge.status === "open" ? (
            <Badge variant="outline" className="ml-2 bg-green-500/10 text-green-400 border-green-500/30">
              Active
            </Badge>
          ) : (
            <Badge variant="outline" className="ml-2 bg-gray-500/10 text-gray-400 border-gray-500/30">
              Closed
            </Badge>
          )}
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{challenge.title}</h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">{challenge.description}</p>
        
        {challenge.status === "open" && (
          <div className="mb-4">
            <ChallengeCountdown endDate={challenge.endDate} />
          </div>
        )}
        
        <div className="mb-4">
          <h4 className="flex items-center text-sm font-semibold text-white mb-2">
            <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
            Prizes
          </h4>
          <ul className="space-y-1">
            {challenge.prizeTiers.map((prize, index) => (
              <li key={index} className="flex justify-between text-xs">
                <span className="text-gray-400">{prize.tier}:</span>
                <span className="text-gray-200">{prize.reward}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="text-neon-purple font-bold">{challenge.submissionCount}</span>
            <span className="text-gray-400 ml-1">submissions</span>
          </div>
          
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onJoin();
            }}
            variant={challenge.status === "open" ? "default" : "outline"}
            size="sm"
            disabled={challenge.status !== "open"}
            className={cn(
              "transition-all",
              challenge.status === "open" ? 
                "bg-neon-purple hover:bg-neon-purple/90" : 
                "text-gray-400"
            )}
          >
            {challenge.status === "open" ? "Join Challenge" : "Closed"}
          </Button>
        </div>
      </div>
    </Card>
  );
}
