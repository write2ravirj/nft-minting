import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { ArrowLeft, User, Key, Calendar, FileText, Tag } from 'lucide-react';
import NetworkBanner from '../components/web3/NetworkBanner';
import { NFTToken } from '../utils/types';

const TokenDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { connected, contract, isCorrectNetwork, connectWallet } = useWeb3();
  
  const [token, setToken] = useState<NFTToken | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTokenDetails = async () => {
      if (!connected || !contract || !isCorrectNetwork || !id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const tokenId = parseInt(id);
        
        // Get token owner
        const owner = await contract.ownerOf(tokenId);
        
        // Get DNA hash
        const dnaHash = await contract.getDNAHash(tokenId);
        
        // Get token URI/metadata
        const tokenURI = await contract.tokenURI(tokenId);
        
        // Parse metadata if it's JSON
        let metadata;
        try {
          metadata = JSON.parse(tokenURI);
        } catch {
          // If not JSON, it might be a URL - in a real app, you'd fetch this
          metadata = {
            name: `DNA Identity #${tokenId}`,
            description: 'DNA Identity NFT',
            image: 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
            attributes: []
          };
        }
        
        setToken({
          id: tokenId,
          owner,
          dnaHash,
          tokenURI,
          metadata
        });
      } catch (err) {
        console.error('Error fetching token details:', err);
        setError('Failed to load NFT details. Please check the token ID and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTokenDetails();
  }, [connected, contract, id, isCorrectNetwork]);

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          Please connect your wallet to view this DNA Identity NFT.
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link to="/gallery" className="flex items-center text-slate-400 hover:text-teal-400 transition-colors">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Gallery
            </Link>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500 mb-4"></div>
              <p className="text-slate-400">Loading NFT details...</p>
            </div>
          ) : error ? (
            <div className="card p-6 text-center">
              <p className="text-red-400 mb-4">{error}</p>
              <Link to="/gallery" className="btn-outline">
                Return to Gallery
              </Link>
            </div>
          ) : token ? (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-2">
                <div className="card overflow-hidden">
                  <div className="relative" style={{ height: '300px' }}>
                    <img 
                      src={token.metadata?.image || 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'} 
                      alt={token.metadata?.name || `DNA NFT #${token.id}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="p-6">
                    <h1 className="text-2xl font-bold mb-1">
                      {token.metadata?.name || `DNA NFT #${token.id}`}
                    </h1>
                    <p className="text-slate-400 text-sm mb-4">
                      Token ID: {token.id}
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <p className="flex items-center text-slate-300 mb-1">
                          <User className="h-4 w-4 mr-2 text-teal-500" />
                          Owner
                        </p>
                        <p className="text-xs font-mono bg-slate-800 p-2 rounded break-all">
                          {token.owner}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-3 space-y-6">
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-5 w-5 text-teal-500 mr-2" />
                    <h2 className="text-xl font-bold">Description</h2>
                  </div>
                  <p className="text-slate-300">
                    {token.metadata?.description || 'No description available for this DNA Identity NFT.'}
                  </p>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <Key className="h-5 w-5 text-teal-500 mr-2" />
                    <h2 className="text-xl font-bold">DNA Hash</h2>
                  </div>
                  <p className="text-xs font-mono bg-slate-800 p-3 rounded break-all">
                    {token.dnaHash}
                  </p>
                </div>
                
                {token.metadata?.attributes && token.metadata.attributes.length > 0 && (
                  <div className="card p-6">
                    <div className="flex items-center mb-4">
                      <Tag className="h-5 w-5 text-teal-500 mr-2" />
                      <h2 className="text-xl font-bold">Attributes</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {token.metadata.attributes.map((attr, index) => (
                        <div key={index} className="bg-slate-800 p-3 rounded">
                          <p className="text-xs text-teal-400 mb-1">{attr.trait_type}</p>
                          <p className="font-medium">{attr.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 text-teal-500 mr-2" />
                    <h2 className="text-xl font-bold">Verify DNA</h2>
                  </div>
                  <p className="text-slate-300 mb-4">
                    Need to verify a DNA hash against this token? Use our verification tool.
                  </p>
                  <Link 
                    to={`/verify?tokenId=${token.id}`} 
                    className="btn-outline inline-block"
                  >
                    Go to Verification
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-6 text-center">
              <p className="text-slate-400 mb-4">NFT not found. The token may not exist or may have been transferred.</p>
              <Link to="/gallery" className="btn-outline">
                Return to Gallery
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TokenDetails;