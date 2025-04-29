import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cart');
      return storedCart ? JSON.parse(storedCart) : [];
    } catch {
      return [];
    }
  });

  const [cartKey, setCartKey] = useState(Date.now());

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        const newProduct = JSON.parse(JSON.stringify(product));
        newProduct.quantity = 1;
        return [...prevCart, newProduct];
      }
    });
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    setCartKey(Date.now()); // Update key to force re-render
  };

  const removeFromCart = (id) => {
    if (id === null) {
      clearCart();
    } else {
      setCart((prevCart) => prevCart.filter(item => item.id !== id));
    }
  };

  const updateQuantity = (id, action) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc, item) => {
        if (item.id === id) {
          let newQuantity = item.quantity;
          if (action === 'increase') newQuantity += 1;
          else if (action === 'decrease') newQuantity -= 1;

          if (newQuantity > 0) {
            acc.push({ ...item, quantity: newQuantity });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, []);
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartKey }}>
      {children}
    </CartContext.Provider>
  );
};
