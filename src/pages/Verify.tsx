import React, { useState } from 'react';
import { useWeb3 } from '../contexts/Web3Context';
import { CheckCircle, XCircle, Search, Dna } from 'lucide-react';
import NetworkBanner from '../components/web3/NetworkBanner';

const Verify: React.FC = () => {
  const { connected, contract, isCorrectNetwork, connectWallet } = useWeb3();
  
  const [tokenId, setTokenId] = useState('');
  const [dnaHashToVerify, setDnaHashToVerify] = useState('');
  const [verificationResult, setVerificationResult] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [tokenInfo, setTokenInfo] = useState<{
    owner: string;
    storedHash: string;
  } | null>(null);

  const verifyDNA = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!connected || !contract || !isCorrectNetwork) {
      return;
    }
    
    if (!tokenId || !dnaHashToVerify) {
      setError('Please provide both token ID and DNA hash to verify');
      return;
    }
    
    setLoading(true);
    setError(null);
    setVerificationResult(null);
    setTokenInfo(null);
    
    try {
      // First, check if the token exists
      const tokenIdNumber = parseInt(tokenId);
      
      // Get token owner and stored hash for display
      const owner = await contract.ownerOf(tokenIdNumber);
      const storedHash = await contract.getDNAHash(tokenIdNumber);
      
      setTokenInfo({
        owner,
        storedHash
      });
      
      // Verify the DNA hash
      const result = await contract.verifyDNA(tokenIdNumber, dnaHashToVerify);
      setVerificationResult(result);
    } catch (err) {
      console.error('Error verifying DNA:', err);
      setError((err as Error).message || 'Error verifying DNA. Please check the token ID and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Dna className="h-16 w-16 text-teal-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          Please connect your wallet to verify DNA Identity NFTs.
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
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">Verify DNA</h1>
              <p className="text-slate-400 mt-2">
                Verify the authenticity of a DNA identity record
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Search className="h-12 w-12 text-teal-500" />
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <form onSubmit={verifyDNA} className="space-y-6">
              <div>
                <label htmlFor="token-id" className="label">
                  Token ID <span className="text-red-400">*</span>
                </label>
                <input
                  id="token-id"
                  type="number"
                  placeholder="Enter the NFT token ID"
                  value={tokenId}
                  onChange={(e) => setTokenId(e.target.value)}
                  className="input"
                  required
                  min="1"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Enter the token ID of the DNA Identity NFT you want to verify.
                </p>
              </div>

              <div>
                <label htmlFor="dna-hash" className="label">
                  DNA Hash to Verify <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="dna-hash"
                  placeholder="Enter the DNA hash you want to verify"
                  value={dnaHashToVerify}
                  onChange={(e) => setDnaHashToVerify(e.target.value)}
                  rows={3}
                  className="input"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  Enter the DNA hash you want to verify against the token.
                </p>
              </div>

              {error && (
                <div className="p-4 bg-red-900/20 border border-red-800 rounded-lg">
                  <p className="text-red-400">{error}</p>
                </div>
              )}

              {verificationResult !== null && !error && (
                <div className={`p-4 ${verificationResult ? 'bg-green-900/20 border border-green-800' : 'bg-red-900/20 border border-red-800'} rounded-lg`}>
                  <div className="flex items-center mb-2">
                    {verificationResult ? (
                      <>
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <h3 className="font-bold text-green-400">Verification Successful</h3>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        <h3 className="font-bold text-red-400">Verification Failed</h3>
                      </>
                    )}
                  </div>
                  <p className={verificationResult ? 'text-green-400' : 'text-red-400'}>
                    {verificationResult 
                      ? 'The provided DNA hash matches the hash stored in the NFT.' 
                      : 'The provided DNA hash does not match the hash stored in the NFT.'}
                  </p>
                </div>
              )}

              {tokenInfo && (
                <div className="p-4 bg-slate-800/50 rounded-lg">
                  <h3 className="font-medium text-slate-300 mb-2">Token Information</h3>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-slate-400">Owner</p>
                      <p className="text-xs font-mono bg-slate-900 p-2 rounded break-all">
                        {tokenInfo.owner}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-400">Stored DNA Hash</p>
                      <p className="text-xs font-mono bg-slate-900 p-2 rounded break-all">
                        {tokenInfo.storedHash}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!connected || !isCorrectNetwork || loading || !tokenId || !dnaHashToVerify}
                  className="btn-primary flex items-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                      Verifying...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Verify DNA
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Verify;