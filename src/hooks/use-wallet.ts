
import { useState, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { useToast } from "@/hooks/use-toast";

export const useWallet = () => {
  const { address, isConnected } = useAccount()
  const { connect, isPending: isConnecting } = useConnect()
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  const connectWallet = async () => {
    try {
      connect({
        connector: injected(),
      })
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast({
        title: "Erro ao conectar",
        description: "Ocorreu um erro ao tentar conectar sua carteira.",
        variant: "destructive",
      });
    }
  };

  const disconnectWallet = () => {
    disconnect()
    toast({
      title: "Carteira desconectada",
      description: "Sua carteira foi desconectada com sucesso.",
    });
  };

  const formatAddress = (address?: string) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return {
    isConnected,
    isConnecting,
    walletAddress: address || '',
    formattedAddress: formatAddress(address),
    connectWallet,
    disconnectWallet
  };
};
