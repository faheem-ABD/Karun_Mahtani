const devMode = true; // Change to false when deploying

const audio = document.getElementById('introMusic');
const element = document.getElementById('VinylDisc');
const instructionText = document.getElementById('instructionText');

const introVinylSection = document.getElementById('intro-vinyl-section');
const introHeader = document.getElementById('introHeader');
const mainHeader = document.getElementById('mainPageHeader');
const mainPage = document.getElementById('mainPage');
const overlay = document.getElementById('transitionOverlay');

let isDragging = false;
let lastAngle = 0;
let currentRotation = 0;
let spinStartTime = null;
let centerX = 0;
let centerY = 0;
let canSpin = true;

element.addEventListener("mousedown", handleStart);
element.addEventListener("touchstart", handleStart, { passive: false });
element.addEventListener("mouseup", handleEnd);
element.addEventListener("touchend", handleEnd);
element.addEventListener("mousemove", handleMove);
element.addEventListener("touchmove", handleMove);

function handleStart(event) {
  if (!canSpin) return;
  isDragging = true;
  spinStartTime = Date.now();

  const rect = element.getBoundingClientRect();
  centerX = rect.left + rect.width / 2;
  centerY = rect.top + rect.height / 2;

  if (event.cancelable) event.preventDefault();

  let pointerX, pointerY;
  if (event.touches) {
    pointerX = event.touches[0].clientX;
    pointerY = event.touches[0].clientY;
  } else {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }

  const deltaX = pointerX - centerX;
  const deltaY = pointerY - centerY;
  lastAngle = Math.atan2(deltaY, deltaX);

  instructionText.classList.remove("hidden");
  setTimeout(() => instructionText.classList.add("hidden"), 1000);
}

function handleMove(event) {
  if (!isDragging || !canSpin) return;
  if (event.cancelable) event.preventDefault();

  let pointerX, pointerY;
  if (event.touches) {
    pointerX = event.touches[0].clientX;
    pointerY = event.touches[0].clientY;
  } else {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }

  const deltaX = pointerX - centerX;
  const deltaY = pointerY - centerY;

  const currentAngle = Math.atan2(deltaY, deltaX);
  const deltaAngle = currentAngle - lastAngle;

  const deltaDegrees = deltaAngle * (180 / Math.PI);
  currentRotation += deltaDegrees;
  element.style.transform = `rotate(${currentRotation}deg)`;
  lastAngle = currentAngle;
}

function handleEnd() {
  if (!canSpin) return;
  isDragging = false;
  canSpin = false;

  audio.muted = false;
  audio.currentTime = 0;
  audio.volume = 1;
  audio.play();

  if (!devMode) {
    autoSpin();
  } else {
    // Dev mode skips intro and directly shows main page
    showMainPage();
  }
}

let autoSpinAnimationID = null;

function autoSpin() {
  const spinSpeed = 1.5;
  const elapsed = Date.now() - spinStartTime;

  if (elapsed > 3000) {
    cancelAnimationFrame(autoSpinAnimationID);
    startTransitionToMain();
    return;
  }

  currentRotation += spinSpeed;
  element.style.transform = `rotate(${currentRotation}deg)`;
  autoSpinAnimationID = requestAnimationFrame(autoSpin);
}

function startTransitionToMain() {
  const vinylSection = document.getElementById("intro-vinyl");
  const introHeader = document.getElementById("introHeader");
  const mainHeader = document.getElementById("mainPageHeader");
  const overlay = document.getElementById("transitionOverlay");
  const mainPage = document.getElementById("mainPage");

  // Animate fading out the intro elements
  vinylSection.classList.add("opacity-0", "scale-90", "translate-y-10", "transition-all", "duration-700", "ease-in-out");
  introHeader.classList.add("opacity-0", "transition-opacity", "duration-700");

  // Fade in black overlay after 400ms
  setTimeout(() => {
    overlay.classList.add("opacity-100");
  }, 400);

  // After 1200ms, hide intro and show main page content
  setTimeout(() => {
    vinylSection.classList.add("hidden");
    introHeader.classList.add("hidden");

    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0");

    mainHeader.classList.remove("hidden");
    mainHeader.classList.add("opacity-100");

    mainPage.classList.remove("hidden");
    mainPage.classList.add("opacity-100", "scale-100");

    document.body.classList.remove("overflow-hidden");
    document.body.style.height = "auto";
    document.body.style.overflow = "auto";

    fadeOutAudio(audio);
  }, 1200);
}

function fadeOutAudio(audio) {
  let volume = audio.volume;
  const fade = setInterval(() => {
    if (volume > 0.05) {
      volume -= 0.05;
      audio.volume = volume;
    } else {
      clearInterval(fade);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = 1.0;
    }
  }, 100);
}


function showMainPage() {
  // Fade out intro section and fade in main content

  // Add fade-out classes
  introVinylSection.classList.add('opacity-0', 'pointer-events-none');
  introHeader.classList.add('opacity-0', 'pointer-events-none');

  // Show main header and main page
  mainHeader.classList.remove('hidden');
  mainPage.classList.remove('hidden');

  // Trigger fade-in with delay
  setTimeout(() => {
    mainHeader.classList.remove('opacity-0');
    mainPage.classList.remove('opacity-0');
    mainPage.classList.remove('scale-95');
  }, 50);

  // Optionally, remove intro section from DOM after animation
  setTimeout(() => {
    introVinylSection.style.display = 'none';
    introHeader.style.display = 'none';
  }, 1100);
}

// If devMode is true, skip intro on DOM load
document.addEventListener("DOMContentLoaded", () => {
  if (devMode) {
    console.log("Dev mode enabled: skipping intro animation.");
    showMainPage();
  }
});
