document.addEventListener('DOMContentLoaded', () => {
    // Retrieve  HTML elements
    const cartButton = document.getElementById('cart-button');
    const cartDetails = document.getElementById('cart-details');
    const checkoutButton = document.getElementById('checkout-button');
    const cartItemsList = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');

    // Check if all necessary elements are present
    if (!cartButton || !cartDetails || !checkoutButton || !cartItemsList || !cartTotalElement) {
        console.error("One or more elements are missing in the HTML.");
        return;
    }

    // Initialize cart from local storage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to update the cart display
    function updateCartDisplay() {
        cartItemsList.innerHTML = ''; // Clear current cart items
        let total = 0;

        // Loop through cart items to display them
        cart.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item.name} - $${item.price} x ${item.quantity}
                            <button class="remove-item" data-id="${item.id}">Remove</button>`;
            cartItemsList.appendChild(li);
            total += item.price * item.quantity;
        });

        // Update total and cart button display
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        cartButton.textContent = `Cart (${cart.length})`;
    }

    cartButton.addEventListener('click', () => {
        cartDetails.classList.toggle('visible');
    });

    checkoutButton.addEventListener('click', (event) => {
        event.preventDefault();
        window.location.href = 'checkout.html';
    });

    // Close cart details if clicking outside of cart
    document.addEventListener('click', (event) => {
        if (!cartButton.contains(event.target) && !cartDetails.contains(event.target)) {
            cartDetails.classList.remove('visible');
        }
    });

    // Handle item removal from cart
    cartItemsList.addEventListener('click', (event) => {
        if (event.target.classList.contains('remove-item')) {
            const itemId = event.target.getAttribute('data-id');
            cart = cart.filter(item => item.id.toString() !== itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartDisplay();
        }
    });

    // Handle adding items to cart
    document.querySelectorAll('.add-to-cart-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            if (!productElement) return;

            const productId = productElement.getAttribute('data-id');
            const productName = productElement.getAttribute('data-name');
            const productPrice = parseFloat(productElement.getAttribute('data-price'));

            if (!productId || isNaN(productPrice)) {
                console.error('Product data is missing or invalid.');
                return;
            }

            const product = {
                id: productId,
                name: productName,
                price: productPrice
            };

            addToCart(product);
        });
    });

    // Function to add a product to the cart
    function addToCart(product) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingItem = cart.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    }

    // Initial cart display update
    updateCartDisplay();
});
