import React from 'react';
import { useWeb3 } from '../../contexts/Web3Context';
import { ChevronDown, Wallet } from 'lucide-react';

const WalletButton: React.FC = () => {
  const { connected, account, connectWallet, disconnectWallet, isCorrectNetwork, switchNetwork } = useWeb3();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDisconnect = () => {
    disconnectWallet();
    setIsDropdownOpen(false);
  };

  const handleSwitchNetwork = () => {
    switchNetwork();
    setIsDropdownOpen(false);
  };

  // Format address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  if (!connected) {
    return (
      <button
        onClick={connectWallet}
        className="btn-primary flex items-center"
      >
        <Wallet className="h-4 w-4 mr-2" />
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="btn-outline flex items-center"
      >
        <Wallet className="h-4 w-4 mr-2" />
        {account && formatAddress(account)}
        <ChevronDown className="h-4 w-4 ml-2" />
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-slate-800 ring-1 ring-slate-700 z-50">
          <div className="py-1" onClick={() => setIsDropdownOpen(false)}>
            {!isCorrectNetwork && (
              <button
                onClick={handleSwitchNetwork}
                className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700"
              >
                Switch Network
              </button>
            )}
            <button
              onClick={handleDisconnect}
              className="block w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletButton;