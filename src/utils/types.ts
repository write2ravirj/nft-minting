export interface TokenMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string;
  }[];
}

export interface NFTToken {
  id: number;
  owner: string;
  dnaHash: string;
  tokenURI: string;
  metadata?: TokenMetadata;
}

export interface TransactionStatus {
  status: 'none' | 'pending' | 'success' | 'error';
  hash?: string;
  error?: string;
}