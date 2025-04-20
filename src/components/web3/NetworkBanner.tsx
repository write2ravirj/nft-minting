import React from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { AlertCircle } from 'lucide-react';

const NetworkBanner: React.FC = () => {
  const { connected, isCorrectNetwork, switchNetwork } = useWeb3();

  if (!connected || isCorrectNetwork) {
    return null;
  }

  return (
    <div className="bg-red-900/20 border-b border-red-800 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
            <p className="text-sm text-red-400">
              You are on the wrong network. Please switch to the Sepolia testnet.
            </p>
          </div>
          <button 
            onClick={switchNetwork}
            className="text-sm px-3 py-1 bg-red-800 hover:bg-red-700 text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            Switch Network
          </button>
        </div>
      </div>
    </div>
  );
};

export default NetworkBanner;