const toggleBtn = document.getElementById("bioToggle");
const fullBio = document.getElementById("fullBio");
const fadeBio = document.getElementById("fadeBio");
const bioPreview = document.getElementById("bioPreview");

toggleBtn.addEventListener("click", () => {
  const isHidden = fullBio.classList.contains("hidden");

  if (isHidden) {
    fullBio.classList.remove("hidden");
    fadeBio.classList.add("hidden");
    bioPreview.classList.remove("max-h-36", "overflow-hidden");
    toggleBtn.textContent = "Read Less";
  } else {
    fullBio.classList.add("hidden");
    fadeBio.classList.remove("hidden");
    bioPreview.classList.add("max-h-36", "overflow-hidden");
    toggleBtn.textContent = "Read More";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  
  const abouthamburgerContainer = document.getElementById('abouthamburgerContainer');
  const abouthamburger = document.getElementById('abouthamburger');
  const aboutmenuText = document.getElementById('aboutmenuText');

  function showaboutHamburger() {
    if (!abouthamburger || !aboutmenuText) return;

    // Reset hamburger bars
    abouthamburger.querySelectorAll("span").forEach(span => {
      span.classList.remove("bg-red-500");
      span.classList.add("bg-black");
    });

    aboutmenuText.textContent = 'MENU';
    aboutmenuText.classList.remove('text-red-500');
    aboutmenuText.classList.add('text-black');

    // Correct event binding
    if (abouthamburgerContainer) {
      abouthamburgerContainer.addEventListener('click', () => {
        window.location.href = 'main.html';
      });
    }
  }

  if (abouthamburgerContainer && abouthamburger && aboutmenuText) {
    abouthamburgerContainer.addEventListener('mouseenter', () => {
      abouthamburger.querySelectorAll('span').forEach(span => {
        span.classList.add('bg-red-500');
      });
      aboutmenuText.classList.add('text-red-500');
    });

    abouthamburgerContainer.addEventListener('mouseleave', () => {
      abouthamburger.querySelectorAll('span').forEach(span => {
        span.classList.remove('bg-red-500');
      });
      aboutmenuText.classList.remove('text-red-500');
    });
  }

  // --- INIT ---
  showaboutHamburger();
});
