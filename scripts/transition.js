document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('contactMenuButton');
  btn.addEventListener('click', () => {
    // Add fade-out class to body for smooth transition
    document.body.classList.add('fade-out');

    // Wait for the CSS transition to finish then navigate
    setTimeout(() => {
      window.location.href = 'main.html';
    }, 500); // 500ms matches CSS transition duration
  });
});
