document.addEventListener("DOMContentLoaded", () => {
  // --- Dates page menu ---
  const dateshamburgerContainer = document.getElementById('dateshamburgerContainer');
  const dateshamburger = document.getElementById('dateshamburger');
  const datesmenuText = document.getElementById('datesmenuText');

  function showdatesHamburger() {
    if (!dateshamburger || !datesmenuText) return;

    // Reset hamburger bars
    dateshamburger.querySelectorAll("span").forEach(span => {
      span.classList.remove("bg-red-500");
      span.classList.add("bg-black");
    });

    datesmenuText.textContent = 'MENU';
    datesmenuText.classList.remove('text-red-500');
    datesmenuText.classList.add('text-black');

    // Correct event binding
    if (dateshamburgerContainer) {
      dateshamburgerContainer.addEventListener('click', () => {
        window.location.href = 'main.html';
      });
    }
  }

  if (dateshamburgerContainer && dateshamburger && datesmenuText) {
    dateshamburgerContainer.addEventListener('mouseenter', () => {
      dateshamburger.querySelectorAll('span').forEach(span => {
        span.classList.add('bg-red-500');
      });
      datesmenuText.classList.add('text-red-500');
    });

    dateshamburgerContainer.addEventListener('mouseleave', () => {
      dateshamburger.querySelectorAll('span').forEach(span => {
        span.classList.remove('bg-red-500');
      });
      datesmenuText.classList.remove('text-red-500');
    });
  }

  // --- INIT ---
  showdatesHamburger();
});
