
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface ChallengeCountdownProps {
  endDate: Date;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function ChallengeCountdown({ 
  endDate, 
  className 
}: ChallengeCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isUrgent, setIsUrgent] = useState(false);
  
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }
      
      // Check if less than 24 hours remaining
      setIsUrgent(difference < 86400000);
      
      // Calculate time units
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return { days, hours, minutes, seconds };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [endDate]);
  
  const formatNumber = (num: number): string => {
    return num < 10 ? `0${num}` : `${num}`;
  };
  
  return (
    <div className={cn(
      "flex items-center justify-between font-mono",
      className
    )}>
      <div className="text-center">
        <span className={cn(
          "text-lg font-bold",
          isUrgent ? "text-red-500" : "text-white"
        )}>
          {formatNumber(timeLeft.days)}
        </span>
        <span className="block text-xs text-gray-400">days</span>
      </div>
      <span className={isUrgent ? "text-red-500" : "text-gray-600"}>:</span>
      <div className="text-center">
        <span className={cn(
          "text-lg font-bold",
          isUrgent ? "text-red-500" : "text-white"
        )}>
          {formatNumber(timeLeft.hours)}
        </span>
        <span className="block text-xs text-gray-400">hours</span>
      </div>
      <span className={isUrgent ? "text-red-500" : "text-gray-600"}>:</span>
      <div className="text-center">
        <span className={cn(
          "text-lg font-bold",
          isUrgent ? "text-red-500" : "text-white"
        )}>
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className="block text-xs text-gray-400">min</span>
      </div>
      <span className={isUrgent ? "text-red-500" : "text-gray-600"}>:</span>
      <div className="text-center">
        <span className={cn(
          "text-lg font-bold",
          isUrgent ? "text-red-500" : "text-white"
        )}>
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className="block text-xs text-gray-400">sec</span>
      </div>
    </div>
  );
}
