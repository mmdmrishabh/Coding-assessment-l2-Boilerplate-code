// JavaScript code for Shopping Cart functionality

// Fetch cart data and render items
async function fetchCartData() {
  try {
    const response = await fetch('https://api.example.com/cart'); // Replace with your JSON API endpoint
    const cartData = await response.json();

    renderCartItems(cartData.items);
    calculateTotal(cartData.items);
  } catch (error) {
    console.error("Error fetching cart data:", error);
  }
}

// Render cart items dynamically
function renderCartItems(items) {
  const cartItemsContainer = document.querySelector('.cart-items');
  cartItemsContainer.innerHTML = ""; // Clear existing items

  items.forEach((item, index) => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="item-details">
        <h3>${item.title}</h3>
        <p>Price: ₹${item.price.toFixed(2)}</p>
        <input type="number" value="${item.quantity}" min="1" data-index="${index}" class="quantity-input">
        <p class="subtotal">Subtotal: ₹${(item.price * item.quantity).toFixed(2)}</p>
        <button class="remove-btn" data-index="${index}">🗑️ Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  addEventListeners(items);
}

// Add event listeners for quantity change and item removal
function addEventListeners(items) {
  const quantityInputs = document.querySelectorAll('.quantity-input');
  const removeButtons = document.querySelectorAll('.remove-btn');

  quantityInputs.forEach(input => {
    input.addEventListener('change', (e) => updateQuantity(e, items));
  });

  removeButtons.forEach(button => {
    button.addEventListener('click', (e) => removeItem(e, items));
  });
}

// Update quantity and subtotal
function updateQuantity(event, items) {
  const index = event.target.dataset.index;
  const newQuantity = parseInt(event.target.value, 10);

  if (newQuantity > 0) {
    items[index].quantity = newQuantity;

    const updatedSubtotal = items[index].price * newQuantity;
    const subtotalElement = event.target.nextElementSibling;
    subtotalElement.textContent = `Subtotal: ₹${updatedSubtotal.toFixed(2)}`;

    calculateTotal(items);
  }
}

// Remove an item from the cart
function removeItem(event, items) {
  const index = event.target.dataset.index;

  // Confirm item removal
  if (confirm("Are you sure you want to remove this item?")) {
    items.splice(index, 1); // Remove item from array
    renderCartItems(items); // Re-render cart items
    calculateTotal(items); // Update totals
  }
}

// Calculate and display the total price
function calculateTotal(items) {
  const totalElement = document.querySelector('.cart-totals p:nth-child(2)');
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  totalElement.textContent = `Total: ₹${subtotal.toFixed(2)}`;
}

// Initialize checkout button functionality
document.querySelector('.checkout-button').addEventListener('click', () => {
  alert("Proceeding to checkout...");
  // Add further checkout functionality here
});

// Load cart data on page load
document.addEventListener('DOMContentLoaded', fetchCartData);

