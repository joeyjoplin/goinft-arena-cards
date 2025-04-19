
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PackCardProps {
  id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  cardsCount: number;
  type: "common" | "rare" | "themed";
  onClick?: () => void;
  className?: string;
}

export function PackCard({
  id,
  name,
  image,
  description,
  price,
  cardsCount,
  type,
  onClick,
  className,
}: PackCardProps) {
  const getTypeStyles = () => {
    switch (type) {
      case "common":
        return "border-gray-400";
      case "rare":
        return "border-neon-blue animate-pulse-glow";
      case "themed":
        return "border-neon-purple animate-glow";
      default:
        return "border-gray-400";
    }
  };

  return (
    <Card
      className={cn(
        "relative rounded-xl overflow-hidden transition-all duration-300",
        "bg-goinft-card border-2",
        getTypeStyles(),
        "hover:scale-105",
        className
      )}
    >
      <div className="p-4">
        <div className="relative pb-[60%] mb-4">
          <img 
            src={image} 
            alt={name} 
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
          
          <div className={cn(
            "absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full font-orbitron",
            type === "common" && "bg-gray-600",
            type === "rare" && "bg-blue-600",
            type === "themed" && "bg-purple-600"
          )}>
            {type.toUpperCase()}
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-white font-orbitron text-xl font-bold">{name}</h3>
          <p className="text-white/70 text-sm mt-1">{description}</p>
          <div className="text-white mt-3 text-sm">
            Contém {cardsCount} cartas NFT
          </div>
        </div>
        
        <Button 
          className="w-full bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 font-orbitron text-lg py-6"
          onClick={onClick}
        >
          Compre por {price} CHZ
        </Button>
      </div>
    </Card>
  );
}
