let isDragging = false;
    let lastAngle = 0;
    let currentRotation = 0;
    let spinStartTime = null;
    let centerX = 0;
    let centerY = 0;
    let canSpin = true;

    const audio = document.getElementById('introMusic');
    const element = document.getElementById('VinylDisc')
    const instructionText = document.getElementById('instructionText');
    
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
      if(event.touches) {
        pointerX = event.touches[0].clientX;
        pointerY = event.touches[0].clientY;
      }
      else {
        pointerX = event.clientX;
        pointerY = event.clientY;
      }

      const deltaX = pointerX-centerX;
      const deltaY = pointerY-centerY;
      lastAngle = Math.atan2(deltaY, deltaX);

      instructionText.classList.remove("hidden");
      setTimeout(() => {
        instructionText.classList.add("hidden");
      }, 1000);

    }

    function handleMove(event) {
      if(!isDragging || !canSpin) return;
      if (event.cancelable) event.preventDefault();
      
      let pointerX, pointerY;
      if(event.touches) {
        pointerX = event.touches[0].clientX;
        pointerY = event.touches[0].clientY;
      }
      else {
        pointerX = event.clientX;
        pointerY = event.clientY;
      }

      const deltaX = pointerX-centerX;
      const deltaY = pointerY-centerY;

      const currentAngle = Math.atan2(deltaY, deltaX);
      const deltaAngle = currentAngle - lastAngle;

      const deltaDegrees = deltaAngle * (180 / Math.PI);
      currentRotation += deltaDegrees;
      element.style.transform = `rotate(${currentRotation}deg)`;
      lastAngle = currentAngle;
    }

    let autoSpinAnimationID = null;
   
    function autoSpin(){
      const spinSpeed = 1.5;
      const elapsed = Date.now() - spinStartTime;
  
      if (elapsed > 5000) {
          cancelAnimationFrame(autoSpinAnimationID);

          const introSection = document.getElementById("intro-vinyl");
          const header = document.querySelector("header");
          const overlay = document.getElementById("transitionOverlay");
          const mainPage = document.getElementById("mainPage");


          // 1. Fade out vinyl and logo with motion
          introSection.classList.add("opacity-0", "scale-90", "translate-y-10", "transition-all", "duration-700");
          header.classList.add("opacity-0", "transition-opacity", "duration-700");
          // 2. Fade in black overlay
          overlay.classList.add("opacity-100");

          // After fade out, hide vinyl and show mainPage
          setTimeout(() => {
            introSection.classList.add("hidden");
            header.classList.add("hidden");
            mainPage.classList.remove("hidden");
            mainPage.classList.add("opacity-100"); // fade in

            fadeOutAudio(audio)

            overlay.classList.remove("opacity-100"); // fade out overlay
            overlay.classList.add("opacity-0"); // transition will apply
           }, 800);

          return;
        }

        currentRotation += spinSpeed;
        element.style.transform = `rotate(${currentRotation}deg)`;
        autoSpinAnimationID = requestAnimationFrame(autoSpin);
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
          audio.volume = 1.0; // Reset volume for next playback
        }
      }, 100); // fade interval in milliseconds
    }

    function handleEnd() {
      if (!canSpin) return;
      isDragging = false;
      canSpin = false;
      audio.muted = false;
      audio.currentTime = 0;
      audio.play();
      autoSpin();
      }