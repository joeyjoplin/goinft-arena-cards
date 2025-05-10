
import { ReactNode } from "react";
import { AppHeader } from "@/components/navigation/app-header";
import { useLocation } from "react-router-dom";
import { useWallet } from "@/hooks/use-wallet";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const { isConnected, walletAddress, formattedAddress, connectWallet, disconnectWallet } = useWallet();

  return (
    <div className="min-h-screen bg-goinft-dark flex flex-col font-montserrat">
      {!isLandingPage && (
        <AppHeader
          isConnected={isConnected}
          walletAddress={formattedAddress}
          onConnectWallet={connectWallet}
          onDisconnectWallet={disconnectWallet}
        />
      )}
      <main className={`flex-1 ${!isLandingPage && 'pt-16'}`}>
        {children}
      </main>
    </div>
  );
}
