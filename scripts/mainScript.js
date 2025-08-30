document.addEventListener("DOMContentLoaded", () => {
  const helpContact = document.getElementById('helpContact');
  const hamburgerContainer = document.getElementById('hamburgerContainer');
  const hamburger = document.getElementById('hamburger');
  const menuText = document.getElementById('menuText');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const header = document.getElementById('mainPageHeader');

  // --- HELP & SERVICE ---
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

  // --- DROPDOWN POSITION ---
  function positionDropdown() {
    dropdownMenu.style.top = `${header.offsetHeight}px`; // flush below header
  }
  window.addEventListener('load', positionDropdown);
  window.addEventListener('resize', positionDropdown);

  // --- STATE FUNCTIONS ---
  function showHamburger() {
    hamburger.innerHTML = `
      <span class="block h-0.5 w-3 sm:w-4 bg-black transition-colors duration-200"></span>
      <span class="block h-0.5 w-3 sm:w-4 bg-black transition-colors duration-200"></span>
      <span class="block h-0.5 w-3 sm:w-4 bg-black transition-colors duration-200"></span>
    `;
    menuText.textContent = 'MENU';
    menuText.classList.remove('text-red-500');
    menuText.classList.add('text-black');
  }

  function showClose() {
    hamburger.innerHTML = `<span class="header-font font-thin text-black text-sm sm:text-base transition-colors duration-200">✕</span>`;
    menuText.textContent = 'CLOSE';
    menuText.classList.remove('text-red-500');
    menuText.classList.add('text-black');
  }

  // --- SINGLE HOVER LISTENER ---
  hamburgerContainer.addEventListener('mouseenter', () => {
    hamburger.querySelectorAll('span').forEach(span => {
      if (span.classList.contains('bg-black')) span.classList.add('bg-red-500'); // bars
      else span.classList.add('text-red-500'); // X
    });
    menuText.classList.add('text-red-500');
  });

  hamburgerContainer.addEventListener('mouseleave', () => {
    hamburger.querySelectorAll('span').forEach(span => {
      if (span.classList.contains('bg-black')) span.classList.remove('bg-red-500');
      else span.classList.remove('text-red-500');
    });
    menuText.classList.remove('text-red-500');
  });

  // --- DROPDOWN TOGGLE ---
  hamburgerContainer.addEventListener('click', () => {
    const isClosed = dropdownMenu.classList.contains('max-h-0');

    if (isClosed) {
      dropdownMenu.classList.remove('max-h-0');

      // --- MOBILE SCROLL FIX ---
      const maxHeight = Math.min(dropdownMenu.scrollHeight, window.innerHeight * 0.9);
      dropdownMenu.style.maxHeight = maxHeight + "px";

      showClose();
    } else {
      dropdownMenu.style.maxHeight = "0px";
      dropdownMenu.classList.add('max-h-0');
      showHamburger();
    }
  });

  // --- INITIALIZE ---
  showHamburger();
  dropdownMenu.style.maxHeight = "0px";
});