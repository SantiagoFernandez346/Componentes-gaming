const CartEvents = (function() {
  function removeFromCart(id) {
    let cart = CartStorage.getCart();
    if (id === null) {
      // Clear all items
      cart = [];
    } else {
      cart = cart.filter(item => item.id !== id);
    }
    CartStorage.saveCart(cart);
    CartUI.renderCart();
    if (typeof showToast === 'function') {
      if (id === null) {
        showToast('Carrito vaciado');
      } else {
        showToast('Producto eliminado del carrito');
      }
    }
  }

  function updateQuantity(id, action) {
    let cart = CartStorage.getCart();
    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (action === 'increase') {
      item.quantity += 1;
    } else if (action === 'decrease') {
      item.quantity -= 1;
      if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
      }
    }
    CartStorage.saveCart(cart);
    CartUI.renderCart();
  }

  function addToCart(product) {
    let cart = CartStorage.getCart();
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push(Object.assign({}, product, { quantity: 1 }));
    }
    CartStorage.saveCart(cart);
    CartUI.renderCart();
    if (typeof showToast === 'function') {
      showToast(`Agregado al carrito: ${product.name}`);
    }
  }

  return {
    removeFromCart,
    updateQuantity,
    addToCart
  };
})();
