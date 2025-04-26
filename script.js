// Shopping cart functionality

// Initialize cart from localStorage or empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to cart
function addToCart(item) {
  // Check if item already in cart
  const existingItem = cart.find(i => i.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    item.quantity = 1;
    cart.push(item);
  }
  saveCart();
  alert(`Agregado al carrito: ${item.name}`);
}

// Event listener for add-to-cart buttons
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.add-to-cart');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const card = e.target.closest('.card');
      const item = {
        id: card.getAttribute('data-id'),
        name: card.getAttribute('data-name'),
        price: parseFloat(card.getAttribute('data-price')),
        image: card.getAttribute('data-image')
      };
      addToCart(item);
    });
  });
});
