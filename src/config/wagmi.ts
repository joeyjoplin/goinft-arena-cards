// src/wagmiConfig.ts
import { configureChains, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { injected } from 'wagmi/connectors';

// Set up chains (you can add others too)
const { chains, publicClient } = configureChains(
  [mainnet, sepolia],
  [publicProvider()]
);

// Export the Wagmi config
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    injected({ chains }),
  ],
  publicClient,
});

