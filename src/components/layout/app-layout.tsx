
import { ReactNode } from "react";
import { AppHeader } from "@/components/navigation/app-header";
import { useLocation } from "react-router-dom";

interface AppLayoutProps {
  children: ReactNode;
  isConnected?: boolean;
  walletAddress?: string;
  onConnectWallet?: () => void;
  onDisconnectWallet?: () => void;
}

export function AppLayout({
  children,
  isConnected = false,
  walletAddress = "",
  onConnectWallet,
  onDisconnectWallet
}: AppLayoutProps) {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";

  return (
    <div className="min-h-screen bg-goinft-dark flex flex-col font-montserrat">
      {!isLandingPage && (
        <AppHeader
          isConnected={isConnected}
          walletAddress={walletAddress}
          onConnectWallet={onConnectWallet}
          onDisconnectWallet={onDisconnectWallet}
        />
      )}
      <main className={`flex-1 ${!isLandingPage && 'pt-16'}`}>
        {children}
      </main>
    </div>
  );
}
