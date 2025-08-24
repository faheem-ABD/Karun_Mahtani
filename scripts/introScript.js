document.addEventListener("DOMContentLoaded", () => {
  // Fade in page
  document.body.classList.remove("opacity-0");
  document.body.classList.add("opacity-100");

  // -----------------------------
  // Intro page logic (only if #VinylDisc exists)
  // -----------------------------
  const disc = document.getElementById('VinylDisc');
  const audio = document.getElementById('introMusic');

  if (disc && audio) {
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
      audio.muted = false;
      audio.volume = 1;
      audio.play();
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

    async function autoSpinAndFadeAudio(duration = 3000) {
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
          audio.volume = Math.max(0, 1 - progress * progress);
          if (progress < 1) requestAnimationFrame(animate);
          else { audio.pause(); resolve(); }
        }
        animate();
      });
    }

    async function fadeOutAndGo() {
      await autoSpinAndFadeAudio(3000);
      document.body.classList.add('fade-out');
      setTimeout(() => window.location.href = 'main.html', 700);
    }
  }

  // -----------------------------
  // Hamburger + MENU logic
  // -----------------------------
  const hamburgerContainer = document.getElementById('hamburgerContainer');
  const hamburger = document.getElementById('hamburger');
  const menuText = document.getElementById('menuText');

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

  // -----------------------------
  // Help & Service logic
  // -----------------------------
  const helpContact = document.getElementById('helpContact');

  if (helpContact) {
    const circle = helpContact.querySelector('div'); // the ? circle
    const text = helpContact.querySelector('span');  // Help & Service text

    helpContact.addEventListener('mouseenter', () => {
      helpContact.classList.add('bg-black');        // rectangle bg
      circle.classList.add('bg-black', 'border-yellow-400', 'text-yellow-400'); // circle bg + border + text
      circle.classList.remove('border-black'); // remove original border
      text.classList.add('text-yellow-400');   // text
    });

    helpContact.addEventListener('mouseleave', () => {
      helpContact.classList.remove('bg-black'); 
      circle.classList.remove('bg-black', 'border-yellow-400', 'text-yellow-400');
      circle.classList.add('border-black');   // restore original border
      text.classList.remove('text-yellow-400');
    });

    helpContact.addEventListener('click', () => {
      window.location.href = 'terms.html';
    });
  }


});
