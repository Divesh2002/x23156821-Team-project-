document.addEventListener('DOMContentLoaded', () => {
    // Select the signup form from the DOM
    const signupForm = document.getElementById('signup-form');

    // Add an event listener to handle form submission
    signupForm.addEventListener('submit', async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        
        // Create a FormData object from the signup form
        const formData = new FormData(signupForm);
        
        try {
            // Send the form data to the server using fetch
            const response = await fetch('signup_processor.php', {
                method: 'POST',
                body: formData
            });

            // Parse the JSON response from the server
            const result = await response.json();
            
            // Select the element where the response message will be displayed
            const responseMessage = document.getElementById('response-message');

            // Check if the signup was successful
            if (result.success) {
                // Show a success message
                responseMessage.textContent = 'Sign up successful!';
                responseMessage.style.color = 'green';
                
                // Redirect the user to the login page after a short delay
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000); // Delay of 1 second before redirecting
            } else {
                // Show an error message
                responseMessage.textContent = 'Error: ' + result.error;
                responseMessage.style.color = 'red';
            }
        } catch (error) {
            // Handle any errors that occurred during the fetch request
            console.error('Error during signup:', error);
            const responseMessage = document.getElementById('response-message');
            responseMessage.textContent = 'Error: Unable to process the request';
            responseMessage.style.color = 'red';
        }
    });
});
