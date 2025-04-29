import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleClearCart = () => {
    clearCart();
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p>El carrito está vacío.</p>;
  }

  return (
    <div className="cart-container">
      <h2 className="cart-header">Carrito de Compras</h2>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <h5>{item.name}</h5>
              <p>
                ${item.price.toFixed(2)} x
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                {item.quantity}
                <button className="quantity-btn" onClick={() => updateQuantity(item.id, 'increase')}>+</button>
              </p>
            </div>
            <button className="cart-item-remove-btn" onClick={() => removeFromCart(item.id)} title="Eliminar">
              🗑️
            </button>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h4>Total: ${total.toFixed(2)}</h4>
        <button className="cart-clear-btn" onClick={handleClearCart}>Vaciar Carrito</button>
      </div>
    </div>
  );
};

export default Cart;
