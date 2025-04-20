import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Dna, Menu, X } from 'lucide-react';
import { useWeb3 } from '../../contexts/Web3Context';
import WalletButton from '../web3/WalletButton';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { connected, isCorrectNetwork, networkName } = useWeb3();

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/mint', label: 'Mint DNA NFT' },
    { to: '/gallery', label: 'My NFTs' },
    { to: '/verify', label: 'Verify DNA' },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-slate-900 shadow-lg border-b border-teal-800/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center" onClick={closeMenu}>
              <Dna className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
                DNA Identity NFT
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`text-sm font-medium transition-colors duration-200 hover:text-teal-400 ${
                    location.pathname === link.to ? 'text-teal-400' : 'text-slate-300'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="ml-8">
              <WalletButton />
            </div>
          </div>

          {/* Network Status Indicator - Desktop */}
          {connected && (
            <div className="hidden md:flex items-center ml-4">
              <div
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isCorrectNetwork ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                }`}
              >
                {networkName}
              </div>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-slate-300 hover:text-teal-400 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMenu}
                className={`block font-medium transition-colors duration-200 hover:text-teal-400 ${
                  location.pathname === link.to ? 'text-teal-400' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-slate-800">
              <WalletButton />
            </div>
            {connected && (
              <div
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  isCorrectNetwork ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                }`}
              >
                {networkName}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;