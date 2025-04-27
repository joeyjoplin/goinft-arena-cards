
import { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const { toast } = useToast();

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        return false;
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setIsConnected(true);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error checking wallet connection:', error);
      return false;
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        toast({
          title: "MetaMask não encontrada",
          description: "Por favor, instale a MetaMask para continuar.",
          variant: "destructive",
        });
        return;
      }

      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
      
      toast({
        title: "Carteira conectada",
        description: "Sua carteira foi conectada com sucesso!",
      });
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast({
        title: "Erro ao conectar",
        description: "Ocorreu um erro ao tentar conectar sua carteira.",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    setWalletAddress('');
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
  }, []);

  return {
    isConnected,
    walletAddress,
    formattedAddress: formatAddress(walletAddress),
    connectWallet,
    disconnectWallet
  };
};
