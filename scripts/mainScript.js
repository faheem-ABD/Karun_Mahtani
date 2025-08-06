document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    document.body.classList.remove('opacity-0');
    document.body.classList.add('opacity-100');
  }, 50); // tiny delay for smoothness
});
