import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import DNACard from '../components/dna/DNACard';
import { NFTToken } from '../utils/types';
import { Dna, ArrowRight } from 'lucide-react';
import NetworkBanner from '../components/web3/NetworkBanner';
import { Link } from 'react-router-dom';

const Gallery: React.FC = () => {
  const { connected, contract, account, isCorrectNetwork, connectWallet } = useWeb3();
  const [tokens, setTokens] = useState<NFTToken[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTokens = async () => {
    if (!connected || !contract || !account || !isCorrectNetwork) {
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      // Get token balance for current address
      const balance = await contract.balanceOf(account);
      const totalBalance = Number(balance);
      
      if (totalBalance === 0) {
        setTokens([]);
        setLoading(false);
        return;
      }
      
      const fetchedTokens: NFTToken[] = [];
      
      // This is a simplified approach - in a real app, you might need 
      // an indexing service or subgraph to efficiently get all tokens for an owner
      // For demo purposes, we'll iterate through token IDs
      const totalSupply = await contract.tokenCounter();
      
      for (let i = 1; i < Number(totalSupply); i++) {
        try {
          const tokenOwner = await contract.ownerOf(i);
          
          if (tokenOwner.toLowerCase() === account.toLowerCase()) {
            const dnaHash = await contract.getDNAHash(i);
            const tokenURI = await contract.tokenURI(i);
            
            // Try to parse metadata if it's JSON
            let metadata;
            try {
              metadata = JSON.parse(tokenURI);
            } catch {
              // If not JSON, it might be a URL - in a real app, you'd fetch this
              // For simplicity, we'll just create minimal metadata
              metadata = {
                name: `DNA Identity #${i}`,
                description: 'DNA Identity NFT',
                image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
                attributes: []
              };
            }
            
            fetchedTokens.push({
              id: i,
              owner: tokenOwner,
              dnaHash,
              tokenURI,
              metadata
            });
          }
        } catch (err) {
          // Skip non-existent tokens
          console.warn(`Error fetching token ${i}:`, err);
        }
      }
      
      setTokens(fetchedTokens);
    } catch (err) {
      console.error('Error fetching tokens:', err);
      setError('Failed to load your NFTs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, [connected, contract, account, isCorrectNetwork]);

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Dna className="h-16 w-16 text-teal-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          Please connect your wallet to view your DNA Identity NFTs.
        </p>
        <button onClick={connectWallet} className="btn-primary">
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <>
      <NetworkBanner />
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My DNA NFTs</h1>
            <p className="text-slate-400 mt-2">
              View and manage your DNA Identity tokens
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-4">
            <button 
              onClick={fetchTokens} 
              className="btn-outline flex items-center"
              disabled={loading}
            >
              {loading ? 
                <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div> : 
                <ArrowRight className="h-4 w-4 mr-2" />
              }
              Refresh
            </button>
            <Link to="/mint" className="btn-primary flex items-center">
              <Dna className="h-4 w-4 mr-2" />
              Mint New
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
            <p className="text-slate-400">Loading your NFTs...</p>
          </div>
        ) : error ? (
          <div className="card p-6 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button onClick={fetchTokens} className="btn-outline">
              Try Again
            </button>
          </div>
        ) : tokens.length === 0 ? (
          <div className="card p-8 text-center py-16">
            <Dna className="h-16 w-16 text-teal-500 mx-auto mb-6 opacity-50" />
            <h2 className="text-2xl font-bold mb-3">No NFTs Found</h2>
            <p className="text-slate-400 mb-8 max-w-md mx-auto">
              You don't have any DNA Identity NFTs yet. Mint your first one to get started!
            </p>
            <Link to="/mint" className="btn-primary inline-flex items-center">
              <Dna className="h-4 w-4 mr-2" />
              Mint Your First DNA NFT
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tokens.map((token) => (
              <DNACard key={token.id} token={token} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;