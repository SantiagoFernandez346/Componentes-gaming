const CartStorage = (function() {
  function getCart() {
    return JSON.parse(localStorage.getItem('cart')) || [];
  }

  function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  return {
    getCart,
    saveCart
  };
})();
