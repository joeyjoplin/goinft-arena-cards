
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface TeamBadgeProps {
  name: string;
  logo: string;
  isVerified: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function TeamBadge({ 
  name, 
  logo, 
  isVerified,
  size = "md",
  className 
}: TeamBadgeProps) {
  const sizeClasses = {
    sm: "h-6 text-xs gap-1.5",
    md: "h-8 text-sm gap-2",
    lg: "h-10 text-base gap-2.5"
  };

  const logoSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8"
  };

  return (
    <div 
      className={cn(
        "flex items-center bg-goinft-light/50 rounded-full px-3 py-1",
        sizeClasses[size],
        className
      )}
    >
      <div className={cn("rounded-full overflow-hidden flex-shrink-0", logoSizes[size])}>
        <img src={logo} alt={name} className="w-full h-full object-cover" />
      </div>
      
      <span className="font-medium text-white truncate">{name}</span>
      
      {isVerified && (
        <div className="flex-shrink-0 bg-blue-500 rounded-full p-0.5">
          <Check className={cn(
            "text-white",
            size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
          )} />
        </div>
      )}
    </div>
  );
}
