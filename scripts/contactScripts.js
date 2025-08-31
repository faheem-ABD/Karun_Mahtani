document.addEventListener("DOMContentLoaded", () => {
  // --- Country dropdown fetch ---
 const countrySelect = document.getElementById('country');
if (countrySelect) {
  fetch('https://restcountries.com/v3.1/independent')
    .then(response => response.json())
    .then(data => {
      const countries = data
        .map(country => country.name.common)
        .sort((a, b) => a.localeCompare(b));

      countrySelect.innerHTML = '<option value="">Select country</option>';

      countries.forEach(name => {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        countrySelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching country list:', error);
      countrySelect.innerHTML = '<option value="">Could not load countries</option>';
    });
}


  // --- Contact page menu ---
  const contacthamburgerContainer = document.getElementById('contacthamburgerContainer');
  const contacthamburger = document.getElementById('contacthamburger');
  const contactmenuText = document.getElementById('contactmenuText');

  function showcontactHamburger() {
    if (!contacthamburger || !contactmenuText) return;

    // Reset hamburger bars
    contacthamburger.querySelectorAll("span").forEach(span => {
      span.classList.remove("bg-red-500");
      span.classList.add("bg-black");
    });

    contactmenuText.textContent = 'MENU';
    contactmenuText.classList.remove('text-red-500');
    contactmenuText.classList.add('text-black');

    contacthamburgerContainer.onclick = () => {
      window.location.href = 'main.html';
    };
  }

  if (contacthamburgerContainer && contacthamburger && contactmenuText) {
    contacthamburgerContainer.addEventListener('mouseenter', () => {
      contacthamburger.querySelectorAll('span').forEach(span => {
        span.classList.add('bg-red-500');
      });
      contactmenuText.classList.add('text-red-500');
    });

    contacthamburgerContainer.addEventListener('mouseleave', () => {
      contacthamburger.querySelectorAll('span').forEach(span => {
        span.classList.remove('bg-red-500');
      });
      contactmenuText.classList.remove('text-red-500');
    });
  }

  // --- Terms and Conditions modal (FADE VERSION) ---
  const openBtn = document.getElementById('openTermsModal');
  const closeBtn = document.getElementById('closeTermsModal');
  const modal = document.getElementById('termsModal');
  
  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      modal.classList.add('opacity-100');
      document.body.style.overflow = 'hidden';
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('opacity-0', 'pointer-events-none');
      modal.classList.remove('opacity-100');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        modal.classList.remove('opacity-100');
        document.body.style.overflow = '';
      }
    });
  }

  // --- INIT ---
  showcontactHamburger();
});
