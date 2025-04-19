
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface NFTCardProps {
  id: string;
  name: string;
  image: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  team?: string;
  position?: string;
  isNew?: boolean;
  isOwned?: boolean;
  price?: number;
  onClick?: () => void;
  className?: string;
}

export function NFTCard({
  id,
  name,
  image,
  rarity,
  team,
  position,
  isNew = false,
  isOwned = false,
  price,
  onClick,
  className,
}: NFTCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getRarityColor = () => {
    switch (rarity) {
      case "common":
        return "from-gray-400 to-gray-300";
      case "rare":
        return "from-blue-500 to-blue-400";
      case "epic":
        return "from-purple-500 to-pink-500";
      case "legendary":
        return "from-yellow-400 to-orange-500";
      default:
        return "from-gray-400 to-gray-300";
    }
  };

  const getRarityGlow = () => {
    switch (rarity) {
      case "common":
        return "";
      case "rare":
        return "shadow-[0_0_15px_rgba(59,130,246,0.5)]";
      case "epic":
        return "shadow-[0_0_20px_rgba(168,85,247,0.5)]";
      case "legendary":
        return "shadow-[0_0_25px_rgba(234,179,8,0.6)]";
      default:
        return "";
    }
  };

  return (
    <Card
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform",
        "bg-goinft-card border-none",
        getRarityGlow(),
        isHovered ? "scale-105" : "scale-100",
        isNew && "animate-pulse-glow",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className={cn(
        "absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r",
        getRarityColor()
      )} />
      
      <div className="p-3">
        <div className="relative pb-[140%]">
          <img 
            src={image} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          
          {isNew && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full font-orbitron">
              NEW
            </div>
          )}
          
          {isOwned && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full font-orbitron">
              OWNED
            </div>
          )}
          
          {price && !isOwned && (
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded-full font-orbitron">
              {price} CHZ
            </div>
          )}
        </div>
        
        <div className="pt-3 pb-1">
          <h3 className="text-white font-orbitron text-lg font-semibold truncate">{name}</h3>
          
          <div className="flex justify-between items-center mt-1 text-sm text-gray-300">
            {team && <span>{team}</span>}
            {position && <span className="bg-goinft-light px-2 py-0.5 rounded text-xs">{position}</span>}
          </div>
          
          <div className="mt-2">
            <span className={cn(
              "text-xs font-semibold uppercase font-orbitron px-2 py-1 rounded",
              rarity === "common" && "bg-gray-700 text-gray-300",
              rarity === "rare" && "bg-blue-900 text-blue-300",
              rarity === "epic" && "bg-purple-900 text-purple-300",
              rarity === "legendary" && "bg-yellow-900 text-yellow-300"
            )}>
              {rarity}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
