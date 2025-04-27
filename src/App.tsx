
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "@/components/layout/app-layout";
import { useWallet } from "@/hooks/use-wallet";
import Welcome from "@/pages/Welcome";
import Dashboard from "@/pages/Dashboard";
import Albums from "@/pages/Albums";
import Marketplace from "@/pages/Marketplace";
import Packs from "@/pages/Packs";
import Profile from "@/pages/Profile";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const {
    isConnected,
    walletAddress,
    formattedAddress,
    connectWallet,
    disconnectWallet
  } = useWallet();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout 
            isConnected={isConnected}
            walletAddress={formattedAddress}
            onConnectWallet={connectWallet}
            onDisconnectWallet={disconnectWallet}
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
