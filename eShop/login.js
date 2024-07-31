document.addEventListener('DOMContentLoaded', () => {
    // Select the login form from the DOM
    const loginForm = document.getElementById('login-form');

    // Add an event listener to handle form submission
    loginForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Create a FormData object from the login form
        const formData = new FormData(loginForm);
        
        try {
            // Send the form data to the server using fetch
            const response = await fetch('login_processor.php', {
                method: 'POST',
                body: formData
            });

            // Parse the JSON response from the server
            const result = await response.json();
            
            // Select the element where the response message will be displayed
            const responseMessage = document.getElementById('response-message');

            // Check if the login was successful
            if (result.success) {
                // Show a success message
                responseMessage.textContent = 'Login successful!';
                responseMessage.style.color = 'green';
                
                // Redirect the user to the home page after a short delay
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000); // Delay of 1 second before redirecting
            } else {
                // Show an error message
                responseMessage.textContent = 'Error: Invalid username or password';
                responseMessage.style.color = 'red';
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch request
            console.error('Error during login:', error);
            const responseMessage = document.getElementById('response-message');
            responseMessage.textContent = 'Error: Unable to process the request';
            responseMessage.style.color = 'red';
        }
    });
});
