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
import ProductDetail from './pages/ProductDetail';
import ProductDetail_part2 from './pages/ProductDetail_part2';
import SearchResults from './pages/SearchResults';
import LoginRegister from './pages/LoginRegister';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext.jsx';
import Users from './pages/Users.jsx';
import './App.css';
import Profile from './pages/Profile';


function App() {
  return (
    <UserProvider>
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
              <Route path="/product/:productId" element={<ProductDetail />} />
              <Route path="/product-part2/:productId" element={<ProductDetail_part2 />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/login" element={<LoginRegister />} />
              <Route path="/users" element={<Users />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </main>
          <Footer />
        </Router>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
