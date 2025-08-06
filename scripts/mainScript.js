document.addEventListener('DOMContentLoaded', () => {
  // Fade in the page on load
  setTimeout(() => {
    document.body.classList.remove('opacity-0');
    document.body.classList.add('opacity-100');
  }, 50);

  // menuIcon1 click: fade out + go to main.html
  const menuIcon1 = document.getElementById('menuIcon1');
  if (menuIcon1) {
    menuIcon1.addEventListener('click', () => {
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = 'main.html';
      }, 250); // match your fade-out transition duration
    });
  }

  // menuIcon and overlayMenu toggle behavior
  const menuIcon = document.getElementById('menuIcon');
  const overlayMenu = document.getElementById('overlayMenu');

  if (menuIcon && overlayMenu) {
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

    // Links inside overlay: fade out then navigate
    const overlayLinks = overlayMenu.querySelectorAll('a');
    overlayLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // prevent immediate navigation
        const href = link.getAttribute('href');

        // Fade out page
        document.body.classList.add('fade-out');

        // After fade out, navigate
        setTimeout(() => {
          window.location.href = href;
        }, 300); // same duration as fade-out
      });
    });
  }
});
