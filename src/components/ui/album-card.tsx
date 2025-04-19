
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface AlbumCardProps {
  id: string;
  name: string;
  coverImage: string;
  progress: number;
  totalCards: number;
  collectedCards: number;
  onClick?: () => void;
  className?: string;
}

export function AlbumCard({
  id,
  name,
  coverImage,
  progress,
  totalCards,
  collectedCards,
  onClick,
  className,
}: AlbumCardProps) {
  return (
    <Card
      className={cn(
        "relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 transform",
        "bg-goinft-card border-none hover:shadow-lg",
        "hover:scale-105",
        className
      )}
      onClick={onClick}
    >
      <div className="relative pb-[80%]">
        <img 
          src={coverImage} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-orbitron text-xl font-bold mb-1">{name}</h3>
          
          <div className="flex justify-between text-white/80 text-sm mb-2">
            <span>{collectedCards} / {totalCards} cards</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          
          <Progress value={progress} className="h-2 bg-white/20" />
        </div>
      </div>
    </Card>
  );
}
