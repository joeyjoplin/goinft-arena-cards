
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { WalletButton } from "@/components/ui/wallet-button";
import { WalletConnectModal } from "@/components/ui/wallet-connect-modal";

const Welcome = () => {
  const navigate = useNavigate();
  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const handleConnectWallet = (provider: string) => {
    console.log(`Connecting with ${provider}`);
    // In a real implementation, this would connect to the actual wallet
    // For demo purposes, we'll just navigate to the dashboard
    setWalletModalOpen(false);
    navigate("/dashboard");
  };

  const handleCreateWallet = () => {
    // This would open a flow to create a new wallet
    // For demo purposes, we'll just navigate to the dashboard
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col bg-goinft-darker">
      {/* Background gradient effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-neon-purple/20 filter blur-3xl"></div>
      <div className="absolute top-1/3 -right-32 w-64 h-64 rounded-full bg-neon-blue/20 filter blur-3xl"></div>
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-neon-pink/20 filter blur-3xl"></div>
      
      <main className="container mx-auto px-4 py-12 flex-1 flex flex-col justify-center items-center relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold font-orbitron bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent mb-4 animate-float">
            GoINFT
          </h1>
          <p className="text-white/70 text-lg md:text-xl max-w-md mx-auto">
            Collect, trade, and play with digital football cards on the blockchain
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mb-16">
          <div className="bg-goinft-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">1</span>
            </div>
            <h3 className="text-white font-orbitron text-lg font-bold mb-2">Collect</h3>
            <p className="text-white/70 text-sm">
              Buy packs and collect rare NFT cards of your favorite players
            </p>
          </div>
          
          <div className="bg-goinft-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">2</span>
            </div>
            <h3 className="text-white font-orbitron text-lg font-bold mb-2">Trade</h3>
            <p className="text-white/70 text-sm">
              Trade cards with other collectors to complete your album
            </p>
          </div>
          
          <div className="bg-goinft-card rounded-xl p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-neon-purple to-neon-pink flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-white">3</span>
            </div>
            <h3 className="text-white font-orbitron text-lg font-bold mb-2">Rewards</h3>
            <p className="text-white/70 text-sm">
              Earn exclusive rewards by completing albums and collections
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <WalletButton
            className="flex-1 py-6 text-lg"
            onClick={() => setWalletModalOpen(true)}
          >
            Connect Wallet
          </WalletButton>
          
          <Button
            className="flex-1 py-6 text-lg font-orbitron bg-goinft-light hover:bg-goinft-light/80 text-white"
            onClick={handleCreateWallet}
          >
            Create Wallet
          </Button>
        </div>
        
        <p className="text-white/50 text-sm mt-6 max-w-md text-center">
          Powered by Chiliz Chain. Your digital collectibles are stored securely on the blockchain.
        </p>
      </main>
      
      <WalletConnectModal
        open={walletModalOpen}
        onClose={() => setWalletModalOpen(false)}
        onConnect={handleConnectWallet}
      />
    </div>
  );
};

export default Welcome;
