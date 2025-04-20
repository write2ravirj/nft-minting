import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWeb3 } from '../contexts/Web3Context';
import { Dna, UploadCloud, AlertCircle, CheckCircle } from 'lucide-react';
import NetworkBanner from '../components/web3/NetworkBanner';
import { TransactionStatus } from '../utils/types';

const Mint: React.FC = () => {
  const { connected, contract, isCorrectNetwork, connectWallet } = useWeb3();
  const navigate = useNavigate();

  const [dnaHash, setDnaHash] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [attributes, setAttributes] = useState<{trait_type: string, value: string}[]>([
    { trait_type: 'Source', value: '' },
    { trait_type: 'Type', value: '' }
  ]);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>({
    status: 'none'
  });

  const handleAttributeChange = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  const addAttribute = () => {
    setAttributes([...attributes, { trait_type: '', value: '' }]);
  };

  const removeAttribute = (index: number) => {
    if (attributes.length > 1) {
      const newAttributes = [...attributes];
      newAttributes.splice(index, 1);
      setAttributes(newAttributes);
    }
  };

  const generateTokenURI = () => {
    // Filter out empty attributes
    const filteredAttributes = attributes.filter(
      attr => attr.trait_type.trim() !== '' && attr.value.trim() !== ''
    );

    const metadata = {
      name: name.trim() !== '' ? name : `DNA Identity #${Date.now()}`,
      description: description.trim() !== '' ? description : 'A DNA Identity NFT secured on the blockchain',
      image: imageUrl.trim() !== '' ? imageUrl : 'https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      attributes: filteredAttributes,
      dna_hash: dnaHash // Including the DNA hash in the metadata for reference
    };

    return JSON.stringify(metadata);
  };

  const mintNFT = async () => {
    if (!connected || !contract || !isCorrectNetwork) {
      return;
    }

    if (!dnaHash.trim()) {
      alert('Please enter a DNA hash');
      return;
    }

    try {
      setTransactionStatus({ status: 'pending' });
      
      const tokenMetadata = generateTokenURI();
      const tx = await contract.mintDNAIdentity(dnaHash, tokenMetadata);
      
      setTransactionStatus({ 
        status: 'pending', 
        hash: tx.hash 
      });
      
      // Wait for transaction to be mined
      const receipt = await tx.wait();
      
      // Get the token ID from the event logs
      let tokenId;
      for (const event of receipt.logs) {
        try {
          const parsedLog = contract.interface.parseLog(event);
          if (parsedLog && parsedLog.name === 'Transfer') {
            tokenId = parsedLog.args.tokenId;
            break;
          }
        } catch (e) {
          // Not a Transfer event, continue
          continue;
        }
      }
      
      setTransactionStatus({ 
        status: 'success', 
        hash: tx.hash 
      });
      
      // Redirect to the token details page after a short delay
      setTimeout(() => {
        if (tokenId) {
          navigate(`/token/${tokenId}`);
        } else {
          navigate('/gallery');
        }
      }, 3000);
      
    } catch (error) {
      console.error('Error minting NFT:', error);
      setTransactionStatus({ 
        status: 'error', 
        error: (error as Error).message 
      });
    }
  };

  const renderTransactionStatus = () => {
    switch (transactionStatus.status) {
      case 'pending':
        return (
          <div className="mt-6 p-4 bg-blue-900/20 border border-blue-800 rounded-lg flex items-center">
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-blue-500 mr-3"></div>
            <div>
              <p className="text-blue-400">Transaction pending...</p>
              {transactionStatus.hash && (
                <a 
                  href={`https://sepolia.etherscan.io/tx/${transactionStatus.hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-blue-500 hover:underline"
                >
                  View on Etherscan
                </a>
              )}
            </div>
          </div>
        );
      case 'success':
        return (
          <div className="mt-6 p-4 bg-green-900/20 border border-green-800 rounded-lg flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
            <div>
              <p className="text-green-400">NFT minted successfully!</p>
              {transactionStatus.hash && (
                <a 
                  href={`https://sepolia.etherscan.io/tx/${transactionStatus.hash}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-green-500 hover:underline"
                >
                  View on Etherscan
                </a>
              )}
            </div>
          </div>
        );
      case 'error':
        return (
          <div className="mt-6 p-4 bg-red-900/20 border border-red-800 rounded-lg flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <div>
              <p className="text-red-400">Error: {transactionStatus.error}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (!connected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <Dna className="h-16 w-16 text-teal-500 mb-4" />
        <h1 className="text-3xl font-bold mb-4">Connect Your Wallet</h1>
        <p className="text-slate-400 mb-8 text-center max-w-md">
          Please connect your wallet to mint a DNA Identity NFT.
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
              <h1 className="text-3xl font-bold">Mint DNA Identity NFT</h1>
              <p className="text-slate-400 mt-2">
                Create a unique NFT representing your DNA identity
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <Dna className="h-12 w-12 text-teal-500" />
            </div>
          </div>

          <div className="card p-6 md:p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="dna-hash" className="label">
                  DNA Hash <span className="text-red-400">*</span>
                </label>
                <textarea
                  id="dna-hash"
                  placeholder="Enter the cryptographic hash of your DNA sequence"
                  value={dnaHash}
                  onChange={(e) => setDnaHash(e.target.value)}
                  rows={3}
                  className="input"
                  required
                />
                <p className="text-xs text-slate-500 mt-1">
                  For privacy, we recommend using a secure one-way hash function on your DNA data.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-lg font-medium mb-4">NFT Metadata (Optional)</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="label">Name</label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Give your NFT a name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="description" className="label">Description</label>
                    <textarea
                      id="description"
                      placeholder="Add a description for your DNA NFT"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      className="input"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="image-url" className="label">Image URL</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1">
                        <input
                          id="image-url"
                          type="url"
                          placeholder="https://example.com/image.jpg"
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="input"
                        />
                      </div>
                      <div className="flex-shrink-0">
                        <button className="btn-outline" disabled>
                          <UploadCloud className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Provide a URL to an image representing your DNA NFT.
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="label mb-0">Attributes</label>
                      <button
                        type="button"
                        onClick={addAttribute}
                        className="text-xs text-teal-400 hover:text-teal-300"
                      >
                        + Add Attribute
                      </button>
                    </div>
                    
                    <div className="space-y-3">
                      {attributes.map((attr, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            placeholder="Trait Type"
                            value={attr.trait_type}
                            onChange={(e) => handleAttributeChange(index, 'trait_type', e.target.value)}
                            className="input"
                          />
                          <input
                            type="text"
                            placeholder="Value"
                            value={attr.value}
                            onChange={(e) => handleAttributeChange(index, 'value', e.target.value)}
                            className="input"
                          />
                          <button
                            type="button"
                            onClick={() => removeAttribute(index)}
                            className="text-slate-400 hover:text-red-400"
                            disabled={attributes.length <= 1}
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      Add descriptive traits for your DNA NFT.
                    </p>
                  </div>
                </div>
              </div>
              
              {renderTransactionStatus()}
              
              <div className="flex justify-end mt-8">
                <button
                  onClick={mintNFT}
                  disabled={!connected || !isCorrectNetwork || transactionStatus.status === 'pending' || !dnaHash.trim()}
                  className="btn-primary flex items-center"
                >
                  {transactionStatus.status === 'pending' ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mr-2"></div>
                      Minting...
                    </>
                  ) : (
                    <>
                      <Dna className="h-4 w-4 mr-2" />
                      Mint DNA NFT
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mint;