import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Dna, FlaskRound as Flask, Key, Lock, Shield } from 'lucide-react';
import DNAHelix from '../components/dna/DNAHelix';
import NetworkBanner from '../components/web3/NetworkBanner';

const Home: React.FC = () => {
  return (
    <>
      <NetworkBanner />
      
      {/* Hero Section */}
      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your DNA, <span className="text-teal-400">Your Identity</span>, 
                <br />Secured on the Blockchain
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-lg">
                Create a unique and tamper-proof digital representation of your DNA identity, secured by blockchain technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/mint" className="btn-primary text-center">
                  Mint Your DNA NFT
                </Link>
                <Link to="/verify" className="btn-outline text-center">
                  Verify DNA Record
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <DNAHelix size={300} className="relative z-10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why DNA Identity NFTs?
            </h2>
            <p className="text-lg text-slate-300">
              Revolutionizing identity verification and genetic ownership through blockchain technology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 hover:translate-y-[-5px] transition-transform">
              <div className="bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Lock className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Secure Ownership</h3>
              <p className="text-slate-300">
                Your genetic data remains private while proving ownership through cryptographic hashes.
              </p>
            </div>

            <div className="card p-6 hover:translate-y-[-5px] transition-transform">
              <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Tamper-Proof</h3>
              <p className="text-slate-300">
                Blockchain verification ensures your DNA identity cannot be altered or falsified.
              </p>
            </div>

            <div className="card p-6 hover:translate-y-[-5px] transition-transform">
              <div className="bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Key className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Identity Verification</h3>
              <p className="text-slate-300">
                Instantly verify your identity using your blockchain-secured DNA record.
              </p>
            </div>

            <div className="card p-6 hover:translate-y-[-5px] transition-transform">
              <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Flask className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Medical Research</h3>
              <p className="text-slate-300">
                Securely participate in research by verifying your DNA without revealing sensitive genetic data.
              </p>
            </div>

            <div className="card p-6 hover:translate-y-[-5px] transition-transform">
              <div className="bg-teal-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <Dna className="h-6 w-6 text-teal-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Genetic Provenance</h3>
              <p className="text-slate-300">
                Establish an immutable record of your genetic heritage for future generations.
              </p>
            </div>

            <div className="card p-6 hover:translate-y-[-5px] transition-transform">
              <div className="bg-purple-900/30 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Decentralized Control</h3>
              <p className="text-slate-300">
                Maintain complete ownership of your genetic identity without reliance on centralized systems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              How It Works
            </h2>
            <p className="text-lg text-slate-300">
              Our process is designed to be simple, secure, and transparent
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="card p-6 h-full">
                <div className="bg-teal-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-teal-400 text-xl">
                  1
                </div>
                <h3 className="text-xl font-bold mb-3">Hash Your DNA</h3>
                <p className="text-slate-300">
                  Generate a cryptographic hash of your DNA sequence data using our secure tools, ensuring your raw genetic data never leaves your control.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#0D9488" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="relative">
              <div className="card p-6 h-full">
                <div className="bg-purple-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-purple-400 text-xl">
                  2
                </div>
                <h3 className="text-xl font-bold mb-3">Mint Your NFT</h3>
                <p className="text-slate-300">
                  Create your DNA Identity NFT by securely minting the hash on the blockchain, establishing an immutable record of your genetic identity.
                </p>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2 -translate-y-1/2 z-10">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#7E22CE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div className="card p-6 h-full">
              <div className="bg-teal-900/20 w-12 h-12 rounded-full flex items-center justify-center mb-6 font-bold text-teal-400 text-xl">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Verify Anytime</h3>
              <p className="text-slate-300">
                Use your DNA Identity NFT for secure verification without revealing your genetic data, enabling private and secure identity confirmation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto card overflow-hidden">
            <div className="relative p-8 md:p-12">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-900/30 to-purple-900/30"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Secure Your DNA Identity?
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto">
                  Take control of your genetic identity today with our revolutionary DNA NFT technology.
                </p>
                <Link to="/mint" className="btn-primary inline-block">
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;