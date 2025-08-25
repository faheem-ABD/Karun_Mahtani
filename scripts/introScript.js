document.addEventListener("DOMContentLoaded", () => {
  // Fade in page
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");

  // Only if VinylDisc exists
  const disc = document.getElementById('VinylDisc');
  if (disc) {
    let isDragging = false;
    let lastAngle = 0;
    let currentRotation = 0;
    let centerX = 0;
    let centerY = 0;
    let hasSpun = false;

    disc.addEventListener('mouseenter', () => {
      const instructionText = document.getElementById('instructionText');
      instructionText.classList.remove('hidden');
      setTimeout(() => instructionText.classList.add('hidden'), 1500);
    });

    disc.addEventListener("mousedown", handleStart); 
    disc.addEventListener("touchstart", handleStart, { passive: false });
    disc.addEventListener("mouseup", handleEnd);
    disc.addEventListener("touchend", handleEnd);
    disc.addEventListener("mousemove", handleMove);
    disc.addEventListener("touchmove", handleMove);

    function handleStart(event) {
      if (hasSpun) return;
      isDragging = true;
      const rect = disc.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
      let x = event.touches ? event.touches[0].clientX : event.clientX;
      let y = event.touches ? event.touches[0].clientY : event.clientY;
      lastAngle = Math.atan2(y - centerY, x - centerX);
    }

    function handleMove(event) {
      if (!isDragging || hasSpun) return;
      let x = event.touches ? event.touches[0].clientX : event.clientX;
      let y = event.touches ? event.touches[0].clientY : event.clientY;
      const angle = Math.atan2(y - centerY, x - centerX);
      const delta = angle - lastAngle;
      const degrees = delta * (180 / Math.PI);
      currentRotation += degrees;
      disc.style.transform = `rotate(${currentRotation}deg)`;
      lastAngle = angle;
    }

    function handleEnd() {
      if (hasSpun) return;
      isDragging = false;
      hasSpun = true;
      fadeOutAndGo();
    }

    async function autoSpinAndFade(duration = 3000) {
      return new Promise(resolve => {
        let maxSpeed = 3;
        const minSpeed = 0.05;
        const startTime = Date.now();
        function animate() {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easedSpeed = maxSpeed * (1 - progress * progress);
          const currentSpeed = Math.max(minSpeed, easedSpeed);
          currentRotation += currentSpeed;
          disc.style.transform = `rotate(${currentRotation}deg)`;
          if (progress < 1) requestAnimationFrame(animate);
          else resolve();
        }
        animate();
      });
    }

    async function fadeOutAndGo() {
      await autoSpinAndFade(3000);
      document.body.classList.add('fade-out');
      setTimeout(() => window.location.href = 'main.html', 700);
    }
  }
});
