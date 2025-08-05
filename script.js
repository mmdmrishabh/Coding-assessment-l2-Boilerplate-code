console.log('====================================');
console.log("Connected");
console.log('====================================');
// script.js

// Function to change the main product image
function changeImage(src) {
    document.getElementById('mainImage').src = src;
}

// Function to calculate the percentage off and update the UI
function updatePercentageOff() {
    const price = parseFloat(document.getElementById('price').textContent.replace('$', ''));
    const compareAtPrice = parseFloat(document.getElementById('compareAtPrice').textContent.replace('$', ''));
    const percentageOff = Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
    document.getElementById('percentageOff').textContent = `${percentageOff}% off`;
}

// Call the function to update the percentage off on page load
window.onload = updatePercentageOff;

// Function to handle the "Add to Cart" button click
document.getElementById('addToCartButton').addEventListener('click', () => {
    const color = document.getElementById('color').value;
    const size = document.getElementById('size').value;
    const quantity = document.getElementById('quantity').value;

    const message = `
        Product added to cart:
        - Color: ${color}
        - Size: ${size}
        - Quantity: ${quantity}
    `;

    document.getElementById('addToCartMessage').textContent = message;
});
