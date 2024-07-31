document.addEventListener('DOMContentLoaded', () => {
    // Define an array of products with id, name, price, and image attributes
    const products = [
        { id: 1, name: 'White', price: 9.99, image: 'tshirt1.jpg' },
        { id: 2, name: 'Black', price: 9.99, image: 'tshirt2.jpg' },
        { id: 3, name: 'Rick', price: 22.99, image: 'tshirt3.jpg' },
        { id: 4, name: '80', price: 18.99, image: 'tshirt4.jpg' },
        { id: 5, name: 'summer', price: 20.99, image: 'tshirt5.jpg' },
        { id: 6, name: 'trump', price: 25.99, image: 'tshirt6.jpg' },
        { id: 7, name: 'Jon snow', price: 23.99, image: 'tshirt7.jpg' },
        { id: 8, name: 'God of war', price: 17.99, image: 'tshirt8.jpg' },
        { id: 9, name: 'razer', price: 26.99, image: 'tshirt9.jpg' },
        { id: 10, name: 'Corn', price: 99.99, image: 'tshirt10.jpg' },
        { id: 11, name: 'Beer', price: 22.99, image: 'tshirt11.jpg' },
        { id: 12, name: 'NCI', price: 21.99, image: 'tshirt12.jpg' }
    ];

    // Set the number of products to show per page
    const productsPerPage = 6;
    let currentPage = 1; // Track the current page

    // Function to render products for a specific page
    function renderProducts(page) {
        const startIndex = (page - 1) * productsPerPage; // Calculate start index
        const endIndex = startIndex + productsPerPage; // Calculate end index
        const productsToShow = products.slice(startIndex, endIndex); // Get the products for the current page

        const container = document.getElementById('product-container'); // Get the product container element
        container.innerHTML = ''; // Clear current products

        // Loop through products to be displayed and create HTML for each
        productsToShow.forEach(product => {
            const div = document.createElement('div'); // Create a new product container
            div.className = 'product'; // Set class for styling
            div.dataset.id = product.id; // Set data attributes
            div.dataset.name = product.name;
            div.dataset.price = product.price;

            // Set the inner HTML of the product container
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-button">Add to Cart</button>
            `;
            container.appendChild(div); // Add the new product to the container
        });

        updatePagination(); // Update pagination controls
    }

    // Function to update pagination controls
    function updatePagination() {
        const totalPages = Math.ceil(products.length / productsPerPage); // Calculate total number of pages
        const prevButton = document.getElementById('prev-page'); // Get previous page button
        const nextButton = document.getElementById('next-page'); // Get next page button

        // Enable/disable buttons based on current page
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Event listener for previous page button
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--; // Decrement page number
            renderProducts(currentPage); // Render products for the new page
        }
    });

    // Event listener for next page button
    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(products.length / productsPerPage); // Calculate total number of pages
        if (currentPage < totalPages) {
            currentPage++; // Increment page number
            renderProducts(currentPage); // Render products for the new page
        }
    });

    renderProducts(currentPage); // Initial rendering of products
});
