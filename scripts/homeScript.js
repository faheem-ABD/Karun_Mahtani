const menuIcon = document.getElementById('menuIcon');
const menuOverlay = document.getElementById('menuOverlay');

if(menuIcon && menuOverlay) {
  menuIcon.addEventListener('click', () => {
    const isHidden = menuOverlay.classList.contains('hidden');
    if (isHidden) {
      menuOverlay.classList.remove('hidden');
      setTimeout(() => {
        menuOverlay.classList.remove('opacity-0');
      }, 10);
    } else {
      menuOverlay.classList.add('opacity-0');
      menuOverlay.addEventListener('transitionend', () => {
        menuOverlay.classList.add('hidden');
      }, { once: true });
    }
  });

  // Navigate to pages when menu items are clicked
  menuOverlay.querySelectorAll('li').forEach(item => {
    item.addEventListener('click', () => {
      const targetPage = item.getAttribute('data-target');
      if (targetPage) {
        window.location.href = targetPage;
      }
    });
  });
}
