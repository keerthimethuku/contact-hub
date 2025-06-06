document.getElementById('contactForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const responseMessage = document.getElementById('responseMessage');

    if (!name || !email || !message) {
        responseMessage.textContent = 'Please fill in all fields.';
        responseMessage.style.color = 'red';
        return;
    }

    try {
        const response = await fetch('/submit-form', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
        });

        const result = await response.json();

        if (result.success) {
            responseMessage.textContent = result.message;
            responseMessage.style.color = 'green';
            document.getElementById('contactForm').reset();
        } else {
            responseMessage.textContent = result.message;
            responseMessage.style.color = 'red';
        }

    } catch (error) {
        responseMessage.textContent = 'Something went wrong. Please try again.';
        responseMessage.style.color = 'red';
        console.error('Error:', error);
    }
});