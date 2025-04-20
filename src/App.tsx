import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Mint from './pages/Mint';
import Gallery from './pages/Gallery';
import Verify from './pages/Verify';
import TokenDetails from './pages/TokenDetails';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col dna-helix-bg">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mint" element={<Mint />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/token/:id" element={<TokenDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;