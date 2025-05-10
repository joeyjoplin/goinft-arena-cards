
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
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
  onSelect: () => void;
  onJoin: () => void;
}

export function ChallengeCard({ 
  challenge, 
  isSelected = false,
  onSelect,
  onJoin
}: ChallengeCardProps) {
  const isOpen = challenge.status === "open";
  const timeLeft = isOpen ? challenge.endDate.getTime() - new Date().getTime() : 0;
  const hasTimeLeft = timeLeft > 0;

  // Format date nicely
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    }).format(date);
  };

  return (
    <Card 
      className={cn(
        "overflow-hidden cursor-pointer transition-all duration-300 transform border-none",
        "bg-goinft-card hover:shadow-lg hover:scale-[1.02]",
        isSelected && "ring-2 ring-neon-purple scale-[1.02]"
      )}
      onClick={onSelect}
    >
      <div className="relative pb-[40%]">
        <img 
          src={challenge.teamLogo} 
          alt={challenge.teamName}
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        {isOpen && hasTimeLeft && (
          <div className="absolute top-2 right-2">
            <ChallengeCountdown endDate={challenge.endDate} />
          </div>
        )}
        
        <div className="absolute bottom-0 left-0 p-4">
          <div className="flex items-center gap-2 mb-1">
            <Badge className="bg-goinft-light/40 text-white">
              {challenge.theme}
            </Badge>
            
            <Badge 
              variant="outline" 
              className={isOpen ? "border-green-500 text-green-400" : "border-gray-500 text-gray-400"}
            >
              {isOpen ? "OPEN" : "CLOSED"}
            </Badge>
          </div>
          
          <h3 className="text-xl font-orbitron font-bold text-white line-clamp-1">
            {challenge.title}
          </h3>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <img 
              src={challenge.teamLogo} 
              alt={challenge.teamName}
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-sm text-gray-300 flex items-center gap-1">
            {challenge.teamName}
            {challenge.isVerified && (
              <Check className="h-4 w-4 text-neon-blue" />
            )}
          </span>
          <span className="text-xs text-gray-500 ml-auto">
            Created {formatDate(challenge.startDate)}
          </span>
        </div>
        
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">
          {challenge.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm text-gray-400">
            <span className="text-neon-purple font-medium">{challenge.submissionCount}</span> submissions
          </div>
          
          <div className="text-sm text-gray-400">
            {isOpen ? (
              <span>Ends {formatDate(challenge.endDate)}</span>
            ) : (
              <span>Ended {formatDate(challenge.endDate)}</span>
            )}
          </div>
        </div>
        
        {challenge.prizeTiers.length > 0 && (
          <div className="mb-4 mt-2">
            <h4 className="text-sm text-gray-300 mb-1">Prizes:</h4>
            <ul className="text-xs space-y-1">
              {challenge.prizeTiers.map((prize, index) => (
                <li key={prize.tier} className="flex items-center justify-between">
                  <span className="text-gray-400">{prize.tier}</span>
                  <span className="text-gray-300">{prize.reward}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {isOpen && hasTimeLeft ? (
          <Button 
            className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
            onClick={(e) => {
              e.stopPropagation();
              onJoin();
            }}
          >
            Join Challenge
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
          >
            View Submissions
          </Button>
        )}
      </div>
    </Card>
  );
}
