import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { NFTToken } from '../../utils/types';
import { ArrowRight, Eye } from 'lucide-react';

interface DNACardProps {
  token: NFTToken;
}

const defaultImage = 'https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

const DNACard: React.FC<DNACardProps> = ({ token }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(defaultImage);

  useEffect(() => {
    if (token.metadata?.image) {
      const img = new Image();
      img.onload = () => {
        setImageSrc(token.metadata.image);
        setImageLoaded(true);
      };
      img.onerror = () => {
        // If the image fails to load, use the default image
        setImageSrc(defaultImage);
        setImageLoaded(true);
      };
      img.src = token.metadata.image;
    } else {
      setImageLoaded(true);
    }
  }, [token.metadata]);

  return (
    <div className="card group">
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-800">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        <img 
          src={imageSrc}
          alt={token.metadata?.name || `DNA NFT #${token.id}`}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent opacity-60"></div>
        <div className="absolute bottom-0 left-0 p-4">
          <h3 className="text-lg font-bold text-white">
            {token.metadata?.name || `DNA NFT #${token.id}`}
          </h3>
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div>
          <p className="text-sm text-slate-400">DNA Hash</p>
          <p className="text-xs font-mono break-all bg-slate-800 p-2 rounded mt-1">
            {token.dnaHash.length > 40 ? token.dnaHash.substring(0, 40) + '...' : token.dnaHash}
          </p>
        </div>
        
        <div className="flex justify-between items-center pt-2">
          <Link
            to={`/token/${token.id}`}
            className="flex items-center text-sm text-teal-400 hover:text-teal-300 transition-colors"
          >
            <Eye className="h-4 w-4 mr-1" />
            View Details
          </Link>
          
          <Link
            to={`/token/${token.id}`}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-teal-900/30 hover:bg-teal-800/50 transition-colors"
          >
            <ArrowRight className="h-4 w-4 text-teal-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DNACard;