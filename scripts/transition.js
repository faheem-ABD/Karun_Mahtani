document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('button2');
  btn.addEventListener('click', () => {
    // Add fade-out class to body for smooth transition
    document.body.classList.add('fade-out');

    // Wait for the CSS transition to finish then navigate
    setTimeout(() => {
      window.location.href = 'main.html';
    }, 100); // 500ms matches CSS transition duration
  });
});
