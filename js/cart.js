/**
 * Cart rendering and management code extracted from carrito.html
 */

// Render cart items from localStorage
function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const cartTotalElem = document.getElementById('cart-total');
  if (!cartItemsContainer || !cartTotalElem) return; // If cart UI not present, do nothing
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
      removeFromCart(id);
    });
  });

  // Add event listeners to quantity buttons
  const quantityButtons = document.querySelectorAll('.quantity-btn');
  quantityButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const id = e.currentTarget.getAttribute('data-id');
      const action = e.currentTarget.getAttribute('data-action');
      updateQuantity(id, action);
    });
  });
}

// Remove item from cart
function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Update quantity of item in cart
function updateQuantity(id, action) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  localStorage.removeItem('cart');
  renderCart();
}

// Add item to cart
function addToCart(product) {
  console.log('addToCart called for product id:', product.id);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push(Object.assign({}, product, { quantity: 1 }));
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function attachAddToCartListeners() {
  if (window.addToCartListenersAttached) {
    console.log('Add to cart listeners already attached, skipping.');
    return;
  }
  console.log('attachAddToCartListeners called');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.log('add-to-cart button clicked');
      const card = button.closest('.card');
      const product = {
        id: card.getAttribute('data-id'),
        name: card.getAttribute('data-name'),
        price: parseFloat(card.getAttribute('data-price')),
        image: card.getAttribute('data-image')
      };
      addToCart(product);
    });
  });
  window.addToCartListenersAttached = true;
}

// Initialize cart and attach event listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderCart();
  attachAddToCartListeners();
  const clearCartBtn = document.getElementById('clear-cart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
});
