/* ============================================================
   APPLY TRANSLATION SEAMLESSLY
   ============================================================ */
function applyTranslation(lang) {
  const interval = setInterval(() => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return;
    clearInterval(interval);

    select.value = lang;
    select.dispatchEvent(new Event("change"));

    // Hide Google Translate UI
    setTimeout(() => {
      const gtFrame = document.querySelector('iframe.goog-te-banner-frame');
      if (gtFrame) gtFrame.style.display = 'none';

      const gtWidget = document.querySelector('#google_translate_element');
      if (gtWidget) gtWidget.style.display = 'none';
    }, 500);
  }, 100);
}

/* ============================================================
   BUTTON CLICK: Translate Page
   ============================================================ */
function toggleLanguage() {
  const currentLang = sessionStorage.getItem("userLanguage");

  if (currentLang && currentLang !== "en") {
    // If already translated, revert to English
    sessionStorage.removeItem("userLanguage");
    applyTranslation("en");
    return;
  }

  // Translate to detected language (or fallback English)
  let lang = (navigator.language || navigator.userLanguage).toLowerCase();
  const shortLang = lang.split("-")[0];
  lang = supportedLangs[lang] ? lang : supportedLangs[shortLang] ? shortLang : "en";

  sessionStorage.setItem("userLanguage", lang);
  applyTranslation(lang);
}

/* ============================================================
   AUTO-APPLY TRANSLATION ON PAGE LOAD
   ============================================================ */
window.addEventListener('load', () => {
  googleTranslateElementInit();

  // Only apply translation if user clicked translate in this tab
  const lang = sessionStorage.getItem("userLanguage");
  if (lang && lang !== "en") {
    applyTranslation(lang);
  }
});
