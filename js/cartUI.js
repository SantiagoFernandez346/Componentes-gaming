const CartUI = (function() {
  function renderCart() {
    const cart = CartStorage.getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElem = document.getElementById('cart-total');
    if (!cartItemsContainer || !cartTotalElem) return;
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p>El carrito está vacío.</p>';
      cartTotalElem.textContent = '0.00';
      return;
    }

    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;

      const itemElem = document.createElement('div');
      itemElem.className = 'col-12 d-flex align-items-center border rounded p-2';

      itemElem.innerHTML = 
        '<img src="' + item.image + '" alt="' + item.name + '" style="width: 80px; height: auto; object-fit: contain; margin-right: 15px;">' +
        '<div class="flex-grow-1">' +
          '<h5>' + item.name + '</h5>' +
          '<p>$' + item.price.toFixed(2) + ' x ' +
            '<button class="btn btn-sm btn-outline-secondary quantity-btn" data-id="' + item.id + '" data-action="decrease">-</button>' +
            item.quantity +
            '<button class="btn btn-sm btn-outline-secondary quantity-btn" data-id="' + item.id + '" data-action="increase">+</button>' +
          '</p>' +
        '</div>' +
        '<button class="btn btn-sm btn-danger remove-item" data-id="' + item.id + '"><i class="fas fa-trash-alt"></i></button>';

      cartItemsContainer.appendChild(itemElem);
    });

    cartTotalElem.textContent = total.toFixed(2);

    // Add event listeners to remove buttons
    const removeButtons = document.querySelectorAll('.remove-item');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        CartEvents.removeFromCart(id);
      });
    });

    // Add event listeners to quantity buttons
    const quantityButtons = document.querySelectorAll('.quantity-btn');
    quantityButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-id');
        const action = e.currentTarget.getAttribute('data-action');
        CartEvents.updateQuantity(id, action);
      });
    });
  }

  return {
    renderCart
  };
})();
