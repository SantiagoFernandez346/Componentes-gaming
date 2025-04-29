import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Motherboards from './pages/Motherboards';
import Processors from './pages/Processors';
import VideoCards from './pages/VideoCards';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { CartProvider } from './context/CartContext';
import './App.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/motherboards" element={<Motherboards />} />
            <Route path="/processors" element={<Processors />} />
            <Route path="/videocards" element={<VideoCards />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;
