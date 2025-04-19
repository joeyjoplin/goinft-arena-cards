
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import Welcome from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import Albums from "@/pages/Albums";
import Marketplace from "@/pages/Marketplace";
import Packs from "@/pages/Packs";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");

  const handleConnectWallet = () => {
    // This would connect to the actual wallet in a real implementation
    setIsConnected(true);
    setWalletAddress("0x1234...5678");
  };

  const handleDisconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress("");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout 
            isConnected={isConnected}
            walletAddress={walletAddress}
            onConnectWallet={handleConnectWallet}
            onDisconnectWallet={handleDisconnectWallet}
          >
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/albums" element={<Albums />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/packs" element={<Packs />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
