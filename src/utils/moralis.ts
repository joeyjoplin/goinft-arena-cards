
import Moralis from 'moralis/common-evm-utils';

export const initializeMoralis = async () => {
  if (!Moralis.Core.isStarted) {
    await Moralis.start({
      // We're using Moralis in client-side only mode for now
      // This means we don't need an API key yet
      // When you need to use Moralis API features, you'll need to add an API key
    });
  }
};

export const getMoralisEthAddress = async (ethereumAddress: string) => {
  try {
    await initializeMoralis();
    
    // Get native (ETH) balance using Moralis
    const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
      address: ethereumAddress,
      chain: 0x1, // Ethereum mainnet
    });

    return {
      address: ethereumAddress,
      balance: nativeBalance.result.balance.ether,
    };
  } catch (error) {
    console.error('Error fetching Moralis data:', error);
    throw error;
  }
};
