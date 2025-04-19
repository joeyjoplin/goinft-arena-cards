
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/ui/wallet-button";

interface WalletConnectModalProps {
  open: boolean;
  onClose: () => void;
  onConnect: (provider: string) => void;
}

export function WalletConnectModal({
  open,
  onClose,
  onConnect
}: WalletConnectModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-goinft-dark border-goinft-light sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-orbitron text-white">Conecte sua carteira</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-center text-white/70 mb-2">
            Conecte-se com um dos nossos provedores de carteira disponíveis para continuar
          </p>
          
          <WalletButton 
            variant="metamask" 
            className="w-full justify-center py-6 text-lg"
            onClick={() => onConnect("metamask")}
          >
            MetaMask
          </WalletButton>
          
          <WalletButton 
            variant="walletconnect" 
            className="w-full justify-center py-6 text-lg"
            onClick={() => onConnect("walletconnect")}
          >
            WalletConnect
          </WalletButton>
          
          <div className="mt-4 text-center text-xs text-white/50">
            Ao conectar, você concorda com os <span className="underline">Termos de Serviço</span> e <span className="underline">Política de Privacidade</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
