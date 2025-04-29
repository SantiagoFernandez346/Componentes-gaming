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
    <div>
      <h2>Carrito de Compras</h2>
      <div className="row g-3">
        {cart.map(item => (
          <div key={item.id} className="col-12 d-flex align-items-center border rounded p-2">
            <img src={item.image} alt={item.name} style={{ width: '80px', height: 'auto', objectFit: 'contain', marginRight: '15px' }} />
            <div className="flex-grow-1">
              <h5>{item.name}</h5>
              <p>
                ${item.price.toFixed(2)} x
                <button className="btn btn-sm btn-outline-secondary quantity-btn" onClick={() => updateQuantity(item.id, 'decrease')}>-</button>
                {item.quantity}
                <button className="btn btn-sm btn-outline-secondary quantity-btn" onClick={() => updateQuantity(item.id, 'increase')}>+</button>
              </p>
            </div>
            <button className="btn btn-sm btn-danger" onClick={() => removeFromCart(item.id)}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 text-end">
        <h4>Total: ${total.toFixed(2)}</h4>
        <button className="btn btn-danger" onClick={handleClearCart}>Vaciar Carrito</button>
      </div>
    </div>
  );
};

export default Cart;
