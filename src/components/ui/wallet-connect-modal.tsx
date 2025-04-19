
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
          <DialogTitle className="text-center text-xl font-orbitron text-white">Connect your wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <p className="text-center text-white/70 mb-2">
            Connect with one of our available wallet providers to continue
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
            By connecting, you agree to the <span className="underline">Terms of Service</span> and <span className="underline">Privacy Policy</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
