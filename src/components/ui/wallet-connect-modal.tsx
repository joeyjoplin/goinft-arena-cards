
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/ui/wallet-button";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
  onConnect: (provider: string) => void;
  isConnecting?: boolean;
}

export function WalletConnectModal({
  open,
  onClose,
  onConnect,
  isConnecting = false
}: WalletConnectModalProps) {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  
  const handleConnect = (provider: string) => {
    setSelectedProvider(provider);
    onConnect(provider);
  };
  
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-goinft-dark border-goinft-light sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-orbitron text-white">Conecte sua carteira</DialogTitle>
          <DialogDescription className="text-center text-white/70">
            Conecte-se com um dos nossos provedores de carteira disponíveis para continuar
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <WalletButton 
            variant="metamask" 
            className="w-full justify-center py-6 text-lg"
            onClick={() => handleConnect("metamask")}
            disabled={isConnecting}
          >
            {isConnecting && selectedProvider === "metamask" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Conectando...
              </>
            ) : (
              "MetaMask"
            )}
          </WalletButton>
          
          <WalletButton 
            variant="walletconnect" 
            className="w-full justify-center py-6 text-lg"
            onClick={() => handleConnect("walletconnect")}
            disabled={isConnecting}
          >
            {isConnecting && selectedProvider === "walletconnect" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Conectando...
              </>
            ) : (
              "WalletConnect"
            )}
          </WalletButton>
          
          <div className="mt-4 text-center text-xs text-white/50">
            Ao conectar, você concorda com os <span className="underline">Termos de Serviço</span> e <span className="underline">Política de Privacidade</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
