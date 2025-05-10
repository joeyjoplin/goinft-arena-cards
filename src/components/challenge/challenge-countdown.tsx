
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";

interface ChallengeCountdownProps {
  endDate: Date;
}

export function ChallengeCountdown({ endDate }: ChallengeCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [isEnded, setIsEnded] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = endDate.getTime() - new Date().getTime();
      
      if (difference <= 0) {
        setIsEnded(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000)
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    // Clean up
    return () => clearInterval(timer);
  }, [endDate]);
  
  if (isEnded) {
    return (
      <Badge className="bg-red-500 text-white font-orbitron animate-pulse">
        <Clock className="h-3 w-3 mr-1" /> Ended
      </Badge>
    );
  }

  let displayText = "";
  if (timeLeft.days > 0) {
    displayText = `${timeLeft.days}d ${timeLeft.hours}h`;
  } else if (timeLeft.hours > 0) {
    displayText = `${timeLeft.hours}h ${timeLeft.minutes}m`;
  } else {
    displayText = `${timeLeft.minutes}m ${timeLeft.seconds}s`;
  }
  
  return (
    <Badge className="bg-green-500/80 text-white font-orbitron flex items-center gap-1 animate-pulse">
      <Clock className="h-3 w-3" /> {displayText}
    </Badge>
  );
}
