document.querySelectorAll('.dropdown-content a').forEach(item => {
  item.addEventListener('click', async (e) => {
    e.preventDefault();

    const subject = item.getAttribute('data-subject');
    const className = item.getAttribute('data-class');
    const userMessage = prompt(`What do you want to learn in ${subject}?`);

    if (!userMessage) return;

    const responseContainer = document.getElementById('content');
    responseContainer.innerHTML = `<p>Loading response for <strong>${subject}</strong>...</p>`;

    try {
      const res = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage, subject: subject, className: className })
      });

      const data = await res.json();
      responseContainer.innerHTML = `
        <h2>Subject: ${subject.charAt(0).toUpperCase() + subject.slice(1)}</h2>
        <p><strong>Q:</strong> ${userMessage}</p>
        <p><strong>AI:</strong> ${data.message}</p>
      `;
    } catch (err) {
      responseContainer.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    }
  });
});
