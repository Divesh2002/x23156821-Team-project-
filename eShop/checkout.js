document.addEventListener('DOMContentLoaded', () => {
    // Function to load cart data and update the checkout page
    function loadCart() {
        // Retrieve cart data from localStorage
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const cartItemsList = document.getElementById('checkout-cart-items');
        const cartTotalElement = document.getElementById('checkout-cart-total');
        const cartDataInput = document.getElementById('cart-data');
        
        // Check if essential elements are present
        if (!cartItemsList || !cartTotalElement || !cartDataInput) {
            console.error("Cart elements are missing.");
            return;
        }

        // Clear the cart items list
        cartItemsList.innerHTML = '';
        let total = 0;

        // Populate the cart items and calculate the total
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - $${item.price.toFixed(2)} x ${item.quantity}`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        // Update total and hidden input with cart data
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        cartDataInput.value = JSON.stringify(cart); // Set the cart data in hidden input
    }

    // Initial load of cart data
    loadCart();

    // Handle form submission with additional checks or actions
    const form = document.getElementById('checkout-form');
    if (form) {
        form.addEventListener('submit', (event) => {
            // Example of handling form submission
            // You can add additional validation or processing here
            console.log('Form submitted with cart data:', document.getElementById('cart-data').value);
            // Optionally prevent form submission for debugging purposes
            // event.preventDefault();
        });
    }
});
