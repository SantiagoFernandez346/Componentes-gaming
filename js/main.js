document.addEventListener('DOMContentLoaded', () => {
  CartUI.renderCart();

  // Create toast container
  let toastContainer = document.createElement('div');
  toastContainer.id = 'toast-container';
  toastContainer.style.position = 'fixed';
  toastContainer.style.top = '20px';
  toastContainer.style.right = '20px';
  toastContainer.style.zIndex = '1100';
  document.body.appendChild(toastContainer);

  // Function to show toast notification
  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.textContent = message;
    toast.style.background = '#3b82f6';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.marginTop = '10px';
    toast.style.borderRadius = '6px';
    toast.style.boxShadow = '0 4px 8px rgba(59, 130, 246, 0.6)';
    toast.style.opacity = '1';
    toast.style.transition = 'opacity 0.5s ease';

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => {
        toastContainer.removeChild(toast);
      }, 500);
    }, 3000);
  }

  document.body.addEventListener('click', function(event) {
    if (event.target.closest('.add-to-cart')) {
      event.preventDefault();
      event.stopPropagation();
      const button = event.target.closest('.add-to-cart');
      const card = button.closest('.card');
      const product = {
        id: card.getAttribute('data-id'),
        name: card.getAttribute('data-name'),
        price: parseFloat(card.getAttribute('data-price')),
        image: card.getAttribute('data-image')
      };
      CartEvents.addToCart(product);
      showToast(`Agregado al carrito: ${product.name}`);
    }
  });

  const clearCartBtn = document.getElementById('clear-cart');
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', () => {
      CartStorage.saveCart([]);
      CartUI.renderCart();
      showToast('Carrito vaciado');
    });
  }

  // Search/filter functionality
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const filter = searchInput.value.toLowerCase();
      const productCards = document.querySelectorAll('.card');
      productCards.forEach(card => {
        const name = card.getAttribute('data-name').toLowerCase();
        if (name.includes(filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});
