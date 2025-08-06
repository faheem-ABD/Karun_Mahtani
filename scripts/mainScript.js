document.addEventListener('DOMContentLoaded', () => {
  // Fade in the page
  setTimeout(() => {
    document.body.classList.remove('opacity-0');
    document.body.classList.add('opacity-100');
  }, 50);

  // Menu toggle logic
  const menuIcon = document.getElementById('menuIcon');
  const overlayMenu = document.getElementById('overlayMenu');

  let menuOpen = false;

  const toggleMenu = () => {
    menuOpen = !menuOpen;

    if (menuOpen) {
      overlayMenu.classList.remove('opacity-0', 'pointer-events-none');
      overlayMenu.classList.add('opacity-100');

    } else {
      overlayMenu.classList.remove('opacity-100');
      overlayMenu.classList.add('opacity-0', 'pointer-events-none');
    }
  };

  menuIcon.addEventListener('click', toggleMenu);
});
