import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';
import contractABI from '../utils/contractABI';

interface Web3ContextType {
  connected: boolean;
  account: string | null;
  provider: ethers.BrowserProvider | null;
  signer: ethers.JsonRpcSigner | null;
  contract: ethers.Contract | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  networkName: string;
  isCorrectNetwork: boolean;
  switchNetwork: () => Promise<void>;
}

const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const useWeb3 = (): Web3ContextType => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within a Web3Provider');
  }
  return context;
};

interface Web3ProviderProps {
  children: ReactNode;
}

// Contract address (replace with your deployed contract address)
const CONTRACT_ADDRESS = '0x0000000000000000000000000000000000000000';

// Required network (Ethereum mainnet = 1, Goerli = 5, Sepolia = 11155111, etc.)
const REQUIRED_NETWORK_ID = '11155111'; // Sepolia testnet

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [connected, setConnected] = useState<boolean>(false);
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [networkName, setNetworkName] = useState<string>('');
  const [isCorrectNetwork, setIsCorrectNetwork] = useState<boolean>(false);

  const initializeWeb3 = async () => {
    if (window.ethereum) {
      const ethersProvider = new ethers.BrowserProvider(window.ethereum);
      setProvider(ethersProvider);

      try {
        const accounts = await ethersProvider.listAccounts();
        if (accounts.length > 0) {
          const signerInstance = await ethersProvider.getSigner();
          setSigner(signerInstance);
          setAccount(accounts[0].address);
          setConnected(true);

          const network = await ethersProvider.getNetwork();
          const networkId = network.chainId.toString();
          setNetworkName(getNetworkName(networkId));
          setIsCorrectNetwork(networkId === REQUIRED_NETWORK_ID);

          const contractInstance = new ethers.Contract(
            CONTRACT_ADDRESS,
            contractABI,
            signerInstance
          );
          setContract(contractInstance);
        }
      } catch (error) {
        console.error('Error initializing web3:', error);
      }
    }
  };

  const getNetworkName = (chainId: string): string => {
    const networks: Record<string, string> = {
      '1': 'Ethereum Mainnet',
      '5': 'Goerli Testnet',
      '11155111': 'Sepolia Testnet',
      '137': 'Polygon Mainnet',
      '80001': 'Mumbai Testnet',
    };
    return networks[chainId] || `Chain ID: ${chainId}`;
  };

  const connectWallet = async (): Promise<void> => {
    if (window.ethereum) {
      try {
        const ethersProvider = new ethers.BrowserProvider(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const signerInstance = await ethersProvider.getSigner();
        const address = await signerInstance.getAddress();

        setProvider(ethersProvider);
        setSigner(signerInstance);
        setAccount(address);
        setConnected(true);

        const network = await ethersProvider.getNetwork();
        const networkId = network.chainId.toString();
        setNetworkName(getNetworkName(networkId));
        setIsCorrectNetwork(networkId === REQUIRED_NETWORK_ID);

        const contractInstance = new ethers.Contract(
          CONTRACT_ADDRESS,
          contractABI,
          signerInstance
        );
        setContract(contractInstance);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask or another Ethereum wallet provider.');
    }
  };

  const disconnectWallet = (): void => {
    setConnected(false);
    setAccount(null);
    setSigner(null);
    setContract(null);
  };

  const switchNetwork = async (): Promise<void> => {
    if (!window.ethereum) {
      alert('Please install MetaMask or another Ethereum wallet provider.');
      return;
    }

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${parseInt(REQUIRED_NETWORK_ID).toString(16)}` }],
      });
      
      // Refresh connection after network switch
      await initializeWeb3();
    } catch (error) {
      console.error('Error switching network:', error);
      
      // If the network is not added to MetaMask, we can add it
      if ((error as any).code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: `0x${parseInt(REQUIRED_NETWORK_ID).toString(16)}`,
                chainName: 'Sepolia Testnet',
                nativeCurrency: {
                  name: 'ETH',
                  symbol: 'ETH',
                  decimals: 18,
                },
                rpcUrls: ['https://rpc.sepolia.org'],
                blockExplorerUrls: ['https://sepolia.etherscan.io'],
              },
            ],
          });
          await initializeWeb3();
        } catch (addError) {
          console.error('Error adding network:', addError);
        }
      }
    }
  };

  // Handle account changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnectWallet();
        } else if (accounts[0] !== account) {
          initializeWeb3();
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      // Initial check
      initializeWeb3();

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, [account]);

  const contextValue: Web3ContextType = {
    connected,
    account,
    provider,
    signer,
    contract,
    connectWallet,
    disconnectWallet,
    networkName,
    isCorrectNetwork,
    switchNetwork,
  };

  return <Web3Context.Provider value={contextValue}>{children}</Web3Context.Provider>;
};