
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Bell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/ui/wallet-button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

interface AppHeaderProps {
  isConnected?: boolean;
  walletAddress?: string;
  onConnectWallet?: () => void;
  onDisconnectWallet?: () => void;
}

export function AppHeader({
  isConnected = false,
  walletAddress = "",
  onConnectWallet,
  onDisconnectWallet
}: AppHeaderProps) {
  const location = useLocation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const navigationLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Álbuns", path: "/albums" },
    { name: "Mercado", path: "/marketplace" },
    { name: "Pacotes", path: "/packs" },
    { name: "Lab de Álbuns", path: "/album-lab" },
    { name: "Votação", path: "/album-voting" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-goinft-darker/90 backdrop-blur-md z-50 border-b border-goinft-light/30">
      <div className="container mx-auto flex justify-between items-center h-16 px-4">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold text-white font-orbitron bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
            GoINFT
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.path
                  ? "text-white font-orbitron"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-white/70 hover:text-white hover:bg-goinft-light">
            <Bell className="h-5 w-5" />
          </Button>
          
          {isConnected ? (
            <WalletButton
              isConnected={true}
              walletAddress={walletAddress}
              onClick={onDisconnectWallet}
            />
          ) : (
            <WalletButton
              onClick={onConnectWallet}
            />
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-white/70">
            <Bell className="h-5 w-5" />
          </Button>
          
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] p-0 bg-goinft-dark border-goinft-light">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-goinft-light/30 flex justify-between items-center">
                  <span className="text-xl font-bold text-white font-orbitron bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                    GoINFT
                  </span>
                  <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsSheetOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="flex-1 overflow-auto py-6 px-4">
                  <nav className="flex flex-col space-y-6">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`text-lg font-medium transition-colors ${
                          location.pathname === link.path
                            ? "text-white font-orbitron"
                            : "text-white/70 hover:text-white"
                        }`}
                        onClick={() => setIsSheetOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                </div>
                
                <div className="p-4 border-t border-goinft-light/30">
                  {isConnected ? (
                    <WalletButton
                      isConnected={true}
                      walletAddress={walletAddress}
                      onClick={() => {
                        onDisconnectWallet?.();
                        setIsSheetOpen(false);
                      }}
                      className="w-full"
                    />
                  ) : (
                    <WalletButton
                      onClick={() => {
                        onConnectWallet?.();
                        setIsSheetOpen(false);
                      }}
                      className="w-full"
                    />
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};
