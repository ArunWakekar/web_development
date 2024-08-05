document.getElementById('signupForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent default form submission

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    // Basic client-side validation
    if (password !== confirmPassword) {
        message.textContent = 'Passwords do not match.';
        return;
    }

    try {
        // Send data to the server
        const response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                email: email,
                password: password
            }),
        });

        // Check if the request was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response from the server
        const result = await response.json();

        // Handle success
        message.textContent = result.message;
        message.style.color = 'green';
    } catch (error) {
        // Handle errors
        message.textContent = `Error: ${error.message}`;
        message.style.color = 'red';
    }
});
