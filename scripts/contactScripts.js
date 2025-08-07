document.addEventListener("DOMContentLoaded", () => {
  // Country dropdown fetch
  const countrySelect = document.getElementById('country');

  fetch('https://restcountries.com/v3.1/independent?status=true')
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

  // Terms and Conditions modal logic
  const openBtn = document.getElementById('openTermsModal');
  const closeBtn = document.getElementById('closeTermsModal');
  const modal = document.getElementById('termsModal');

  if (openBtn && closeBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // prevent background scroll
    });

    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  }
});
