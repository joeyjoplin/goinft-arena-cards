
import { useState } from "react";
import { Check, LayoutGrid, LayoutList, SquareSplitVertical, SquareSplitHorizontal } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

type LayoutOption = {
  id: string;
  name: string;
  icon: React.ReactNode;
  columns: number;
  gap: number;
};

const AlbumLab = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [albumTitle, setAlbumTitle] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedLayout, setSelectedLayout] = useState<string>("grid-4");
  const [generatedStickers, setGeneratedStickers] = useState<string[]>([]);

  const layoutOptions: LayoutOption[] = [
    { 
      id: "grid-4", 
      name: "Grid (4x4)", 
      icon: <LayoutGrid className="h-6 w-6" />,
      columns: 4,
      gap: 4
    },
    { 
      id: "grid-3", 
      name: "Grid (3x3)", 
      icon: <LayoutGrid className="h-6 w-6" />,
      columns: 3,
      gap: 6
    },
    { 
      id: "horizontal", 
      name: "Horizontal", 
      icon: <SquareSplitHorizontal className="h-6 w-6" />,
      columns: 2,
      gap: 4
    },
    { 
      id: "vertical", 
      name: "Vertical", 
      icon: <SquareSplitVertical className="h-6 w-6" />,
      columns: 1,
      gap: 4
    },
    { 
      id: "list", 
      name: "List", 
      icon: <LayoutList className="h-6 w-6" />,
      columns: 1,
      gap: 2
    },
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) {
      toast({
        title: "Input necessário",
        description: "Por favor, descreva os stickers que você deseja gerar.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Mock AI sticker generation
    setTimeout(() => {
      // This would be replaced by actual API call to AI service
      const mockStickers = Array(8).fill(null).map((_, i) => 
        `https://source.unsplash.com/random/300x300?nft&sig=${i + Date.now()}`
      );
      setGeneratedStickers(mockStickers);
      setIsGenerating(false);
      
      toast({
        title: "Stickers gerados",
        description: "Seus stickers foram criados com sucesso!",
      });
    }, 2000);
  };

  const currentLayout = layoutOptions.find(layout => layout.id === selectedLayout) || layoutOptions[0];

  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-orbitron font-bold bg-gradient-to-r from-neon-purple to-neon-blue bg-clip-text text-transparent mb-4">
          Laboratório de Álbuns
        </h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Crie álbuns de stickers NFT personalizados com IA. Escolha um layout, 
          descreva o tema desejado e deixe nossa tecnologia criar seus stickers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-goinft-card border-goinft-light/30">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-white">Configuração do Álbum</CardTitle>
              <CardDescription>Personalize seu álbum de stickers NFT</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="album-title" className="block text-sm font-medium text-white/70">
                  Nome do Álbum
                </label>
                <Input
                  id="album-title"
                  value={albumTitle}
                  onChange={(e) => setAlbumTitle(e.target.value)}
                  placeholder="Meu Álbum NFT"
                  className="bg-goinft-light/30 border-goinft-light/30"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-white/70">
                  Escolha um Layout
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
                  {layoutOptions.map((layout) => (
                    <button
                      key={layout.id}
                      type="button"
                      onClick={() => setSelectedLayout(layout.id)}
                      className={cn(
                        "p-3 rounded-lg border flex flex-col items-center justify-center gap-2 transition-all",
                        selectedLayout === layout.id
                          ? "border-neon-purple bg-neon-purple/10"
                          : "border-goinft-light/30 bg-goinft-light/10 hover:bg-goinft-light/20"
                      )}
                    >
                      {layout.icon}
                      <span className="text-xs">{layout.name}</span>
                      {selectedLayout === layout.id && (
                        <Check className="absolute top-1 right-1 h-3 w-3 text-neon-purple" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-goinft-card border-goinft-light/30">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-white">Geração por IA</CardTitle>
              <CardDescription>Descreva os stickers que você deseja criar</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Descreva o tema, estilo e aparência dos stickers para o seu álbum NFT..."
                className="h-32 bg-goinft-light/30 border-goinft-light/30"
              />
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="w-full bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 transition-opacity"
              >
                {isGenerating ? "Gerando Stickers..." : "Gerar Stickers"}
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-goinft-card border-goinft-light/30 h-full">
            <CardHeader>
              <CardTitle className="text-xl font-orbitron text-white">
                {albumTitle || "Meu Álbum NFT"}
              </CardTitle>
              <CardDescription>
                {generatedStickers.length ? `${generatedStickers.length} stickers gerados` : "Prévia do seu álbum"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {generatedStickers.length > 0 ? (
                <div 
                  className="grid gap-4" 
                  style={{
                    gridTemplateColumns: `repeat(${isMobile ? 2 : currentLayout.columns}, 1fr)`,
                    gap: `${currentLayout.gap * 4}px`,
                  }}
                >
                  {generatedStickers.map((sticker, index) => (
                    <div 
                      key={index}
                      className="aspect-square rounded-lg overflow-hidden animate-card-reveal border-2 border-neon-purple/30 hover:border-neon-purple transition-colors animate-glow"
                    >
                      <img 
                        src={sticker} 
                        alt={`Sticker ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center text-white/50">
                  <LayoutGrid className="h-12 w-12 mb-4 opacity-30" />
                  <p>
                    Use o painel à esquerda para configurar e gerar stickers para o seu álbum NFT.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlbumLab;
