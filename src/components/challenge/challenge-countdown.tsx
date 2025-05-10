
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

interface ChallengeCountdownProps {
  endDate: Date;
}

export function ChallengeCountdown({ endDate }: ChallengeCountdownProps) {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        setIsExpired(true);
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };

    // Initial calculation
    setTimeRemaining(calculateTimeRemaining());
    
    // Update countdown every second
    const timer = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
    }, 1000);
    
    // Clean up timer
    return () => clearInterval(timer);
  }, [endDate]);

  if (isExpired) {
    return (
      <div className="text-red-400 flex items-center text-sm">
        <Clock className="h-4 w-4 mr-1.5" />
        Challenge has ended
      </div>
    );
  }

  return (
    <div className="bg-goinft-light/30 rounded-md p-2">
      <div className="flex items-center text-xs text-gray-300 mb-1.5">
        <Clock className="h-3 w-3 mr-1.5" />
        Time remaining:
      </div>
      
      <div className="grid grid-cols-4 gap-1">
        <div className="flex flex-col items-center">
          <div className="bg-goinft-light rounded p-1 w-full text-center font-orbitron text-white">
            {timeRemaining.days}
          </div>
          <span className="text-xs text-gray-400 mt-1">days</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-goinft-light rounded p-1 w-full text-center font-orbitron text-white">
            {timeRemaining.hours}
          </div>
          <span className="text-xs text-gray-400 mt-1">hrs</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-goinft-light rounded p-1 w-full text-center font-orbitron text-white">
            {timeRemaining.minutes}
          </div>
          <span className="text-xs text-gray-400 mt-1">min</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="bg-goinft-light rounded p-1 w-full text-center font-orbitron text-white">
            {timeRemaining.seconds}
          </div>
          <span className="text-xs text-gray-400 mt-1">sec</span>
        </div>
      </div>
    </div>
  );
}
