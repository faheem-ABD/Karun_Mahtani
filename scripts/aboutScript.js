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

