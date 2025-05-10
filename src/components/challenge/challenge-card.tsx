
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Clock, Trophy, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChallengeCountdown } from "./challenge-countdown";

interface PrizeTier {
  tier: string;
  reward: string;
}

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
    prizeTiers: PrizeTier[];
    submissionCount: number;
    status: "open" | "closed";
  };
  isSelected?: boolean;
  onSelect?: () => void;
  onJoin?: () => void;
}

export function ChallengeCard({ 
  challenge,
  isSelected = false,
  onSelect,
  onJoin
}: ChallengeCardProps) {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const {
    title,
    description,
    theme,
    teamName,
    teamLogo,
    isVerified,
    endDate,
    submissionCount,
    status,
    prizeTiers
  } = challenge;
  
  const isActive = status === "open";
  const now = new Date();
  const isEnding = isActive && endDate.getTime() - now.getTime() < 86400000 * 3; // 3 days
  
  return (
    <Card 
      className={cn(
        "relative overflow-hidden cursor-pointer transition-all duration-300",
        "bg-goinft-card border-goinft-light/20 hover:border-neon-purple/50",
        isHovered && "shadow-lg shadow-neon-purple/20",
        isSelected && "border-neon-purple/80 shadow-lg shadow-neon-purple/30",
        isEnding && isActive && "animate-pulse-glow"
      )}
      onClick={onSelect}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-purple to-neon-blue" />
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img 
              src={teamLogo} 
              alt={teamName} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center">
            <span className="text-sm font-medium text-gray-200">{teamName}</span>
            {isVerified && (
              <Check className="ml-1 h-4 w-4 text-neon-blue" />
            )}
          </div>
          <div className="ml-auto">
            <Badge
              variant={isActive ? "default" : "outline"}
              className={cn(
                isActive ? "bg-green-600 text-white hover:bg-green-700" : "text-gray-400"
              )}
            >
              {isActive ? "Open" : "Closed"}
            </Badge>
          </div>
        </div>
        
        <h3 className="text-xl font-bold font-orbitron text-white mb-2 line-clamp-1">
          {title}
        </h3>
        
        <p className="text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center gap-2 mb-3">
          <Badge variant="outline" className="bg-goinft-light/50 text-gray-300">
            {theme}
          </Badge>
          
          <div className="flex items-center ml-auto">
            <Users className="h-4 w-4 text-gray-400 mr-1" />
            <span className="text-xs text-gray-400">{submissionCount} entries</span>
          </div>
        </div>
        
        {isActive && (
          <div className="mb-4">
            <span className="text-xs text-gray-400 mb-1 block">Time remaining:</span>
            <ChallengeCountdown endDate={endDate} />
          </div>
        )}
        
        <div className="mt-4 border-t border-goinft-light/20 pt-3">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="h-4 w-4 text-neon-purple" />
            <span className="text-sm font-medium text-white">Prizes</span>
          </div>
          
          <div className="space-y-2">
            {prizeTiers.map((prize) => (
              <div key={prize.tier} className="flex items-center justify-between text-xs">
                <span className={cn(
                  "font-medium",
                  prize.tier === "Gold" ? "text-yellow-400" :
                  prize.tier === "Silver" ? "text-gray-300" :
                  "text-amber-700"
                )}>
                  {prize.tier}
                </span>
                <span className="text-gray-400">{prize.reward}</span>
              </div>
            ))}
          </div>
        </div>

        {isActive && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onJoin?.();
            }}
            className="w-full mt-4 bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
          >
            Join Challenge
          </Button>
        )}
      </div>
    </Card>
  );
}
