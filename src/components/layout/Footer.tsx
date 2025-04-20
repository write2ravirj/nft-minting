import React from 'react';
import { Dna, Github, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 border-t border-teal-800/30 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Dna className="h-6 w-6 text-teal-500" />
            <span className="ml-2 text-lg font-bold bg-gradient-to-r from-teal-400 to-purple-500 bg-clip-text text-transparent">
              DNA Identity NFT
            </span>
          </div>
          
          <div className="flex flex-col md:flex-row md:space-x-12 text-center md:text-left">
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/mint" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                    Mint DNA NFT
                  </Link>
                </li>
                <li>
                  <Link to="/gallery" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                    My NFTs
                  </Link>
                </li>
                <li>
                  <Link to="/verify" className="text-sm text-slate-400 hover:text-teal-400 transition-colors">
                    Verify DNA
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="mb-4 md:mb-0">
              <h3 className="text-sm font-semibold text-slate-300 mb-2">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="https://etherscan.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    Etherscan
                  </a>
                </li>
                <li>
                  <a 
                    href="https://ethereum.org" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    Ethereum
                  </a>
                </li>
                <li>
                  <a 
                    href="https://opensea.io" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    OpenSea
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} DNA Identity NFT. All rights reserved.</p>
          <p className="mt-1">Secured by Ethereum blockchain technology.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;