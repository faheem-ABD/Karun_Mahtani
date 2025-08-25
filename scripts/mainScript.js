document.addEventListener("DOMContentLoaded", () => {
const helpContact = document.getElementById('helpContact');
const hamburgerContainer = document.getElementById('hamburgerContainer');
const hamburger = document.getElementById('hamburger');
const menuText = document.getElementById('menuText');

if (helpContact) {
  const circle = helpContact.querySelector('div');
  const text = helpContact.querySelector('span');

  helpContact.addEventListener('mouseenter', () => {
    helpContact.classList.add('bg-black');
    circle.classList.add('bg-black', 'border-yellow-400', 'text-yellow-400');
    circle.classList.remove('border-black');
    text.classList.add('text-yellow-400');
  });

  helpContact.addEventListener('mouseleave', () => {
    helpContact.classList.remove('bg-black');
    circle.classList.remove('bg-black', 'border-yellow-400', 'text-yellow-400');
    circle.classList.add('border-black');
    text.classList.remove('text-yellow-400');
  });

  helpContact.addEventListener('click', () => {
    window.location.href = 'terms.html';
  });
}

if (hamburgerContainer && hamburger && menuText) {
  hamburgerContainer.addEventListener('mouseenter', () => {
    hamburger.querySelectorAll('span').forEach(s => s.classList.add('bg-red-500'));
    menuText.classList.add('text-red-500');
  });
  hamburgerContainer.addEventListener('mouseleave', () => {
    hamburger.querySelectorAll('span').forEach(s => s.classList.remove('bg-red-500'));
    menuText.classList.remove('text-red-500');
  });
  hamburgerContainer.addEventListener('click', () => {
    console.log("Hamburger clicked! Dropdown coming soon.");
  });
}

const header = document.getElementById('mainPageHeader');

function positionDropdown() {
  const headerHeight = header.offsetHeight;
  dropdownMenu.style.top = `${headerHeight}px`;
}

// Run on load + resize
window.addEventListener('load', positionDropdown);
window.addEventListener('resize', positionDropdown);


const dropdownMenu = document.getElementById('dropdownMenu');

hamburgerContainer.addEventListener('click', () => {
  if (dropdownMenu.classList.contains('max-h-0')) {
    // Open dropdown
    dropdownMenu.classList.remove('max-h-0');
    dropdownMenu.classList.add('max-h-[1000px]'); // taller for more spacing

    // Change hamburger → X CLOSE
    hamburger.innerHTML = `
      <span class="block text-black header-font font-thin text-base sm:text-lg transition-colors duration-200">✕</span>
    `;
    menuText.textContent = 'CLOSE';
    menuText.classList.add('text-black'); // default state
    menuText.classList.remove('text-red-500');

    // Hover effect for X + CLOSE
    hamburgerContainer.addEventListener('mouseenter', () => {
      hamburger.querySelector('span').classList.add('text-red-500');
      menuText.classList.add('text-red-500');
    });
    hamburgerContainer.addEventListener('mouseleave', () => {
      hamburger.querySelector('span').classList.remove('text-red-500');
      menuText.classList.remove('text-red-500');
    });

  } else {
    // Close dropdown
    dropdownMenu.classList.add('max-h-0');
    dropdownMenu.classList.remove('max-h-[1000px]');

    // Restore hamburger → MENU
    hamburger.innerHTML = `
      <span class="block h-0.5 w-3 sm:w-4 bg-black transition-colors duration-200"></span>
      <span class="block h-0.5 w-3 sm:w-4 bg-black transition-colors duration-200"></span>
      <span class="block h-0.5 w-3 sm:w-4 bg-black transition-colors duration-200"></span>
    `;
    menuText.textContent = 'MENU';
    menuText.classList.remove('text-red-500');
    menuText.classList.add('text-black');
  }
});
});