
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { getMoralisEthAddress } from '@/utils/moralis';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("MetaMask not detected");
        return false;
      }

      console.log("MetaMask detected, checking for accounts");
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        console.log("Found authorized account:", accounts[0]);
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        return true;
      }

      console.log("No authorized accounts found");
      return false;
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return false;
    }
  };

  const connectWallet = async () => {
    setIsConnecting(true);
    
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast({
          title: "MetaMask não encontrada",
          description: "Por favor, instale a MetaMask para continuar.",
          variant: "destructive",
        });
        setIsConnecting(false);
        return;
      }

      console.log("Requesting account access...");
      try {
        const accounts = await ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        
        const address = accounts[0];
        console.log("Connected account:", address);
        
        // Get Moralis data for the connected address
        const moralisData = await getMoralisEthAddress(address);
        
        setWalletAddress(address);
        setEthBalance(moralisData.balance);
        setIsConnected(true);
        
        toast({
          title: "Carteira conectada",
          description: "Sua carteira foi conectada com sucesso!",
        });
      } catch (requestError) {
        console.error("User denied account access", requestError);
        toast({
          title: "Conexão negada",
          description: "Você negou o acesso à sua carteira.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Erro ao conectar",
        description: "Ocorreu um erro ao tentar conectar sua carteira.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
    setEthBalance(null);
    setIsConnected(false);
    toast({
      title: "Carteira desconectada",
      description: "Sua carteira foi desconectada com sucesso.",
    });
  };

  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', async (accounts: string[]) => {
        if (accounts.length > 0) {
          const moralisData = await getMoralisEthAddress(accounts[0]);
          setWalletAddress(accounts[0]);
          setEthBalance(moralisData.balance);
          setIsConnected(true);
        } else {
          setWalletAddress('');
          setEthBalance(null);
          setIsConnected(false);
        }
      });
    }
    
    return () => {
      if (window.ethereum && window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {
          console.log('Accounts changed listener removed');
        });
      }
    };
  }, []);

  return {
    isConnected,
    isConnecting,
    walletAddress,
    ethBalance,
    formattedAddress: formatAddress(walletAddress),
    connectWallet,
    disconnectWallet
  };
};
