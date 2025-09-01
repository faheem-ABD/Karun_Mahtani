window.addEventListener('load', () => {
  const slides = document.querySelectorAll('.slide');
  let current = 0;

  function nextSlide() {
    // Fade out current slide
    slides[current].classList.remove('opacity-100');
    slides[current].classList.add('opacity-0');

    // Move to next slide
    current = (current + 1) % slides.length;

    // Fade in next slide
    slides[current].classList.remove('opacity-0');
    slides[current].classList.add('opacity-100');
  }

  // Change slide every 5 seconds
  setInterval(nextSlide, 6000);
});
