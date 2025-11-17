/* ============================================================
   SUPPORTED LANGUAGES
   ============================================================ */
const supportedLangs = {
  "es":"Spanish","pt":"Portuguese","fr":"French","de":"German",
  "sv":"Swedish","ar":"Arabic","nl":"Dutch","cs":"Czech",
  "hu":"Hungarian","sr":"Serbian","sk":"Slovak","ru":"Russian",
  "hi":"Hindi","it":"Italian","el":"Greek","th":"Thai",
  "tr":"Turkish","zh-CN":"Chinese Simplified","zh-TW":"Chinese Traditional",
  "ja":"Japanese","ko":"Korean"
};

/* ============================================================
   INITIALIZE GOOGLE TRANSLATE ON DEMAND
   ============================================================ */
function googleTranslateElementInit() {
  if (document.getElementById('google_translate_element').children.length > 0) return;

  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false,
    includedLanguages: Object.keys(supportedLangs).join(',')
  }, 'google_translate_element');
}

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

    // Hide Google Translate banner & combo box
    setTimeout(() => {
      const gtFrame = document.querySelector('iframe.goog-te-banner-frame');
      if (gtFrame) gtFrame.style.display = 'none';

      const gtWidget = document.querySelector('#google_translate_element');
      if (gtWidget) gtWidget.style.display = 'none';
    }, 500);
  }, 100);
}

/* ============================================================
   BUTTON CLICK: Toggle Translation
   ============================================================ */
function toggleLanguage() {
  const currentLang = sessionStorage.getItem("userLanguage");

  // If already translated, reset to English
  if (currentLang && currentLang !== "en") {
    sessionStorage.removeItem("userLanguage");
    applyTranslation("en");
    return;
  }

  // Otherwise, detect browser language or default to English
  let lang = (navigator.language || navigator.userLanguage).toLowerCase();
  if (!supportedLangs[lang]) {
    const short = lang.split("-")[0];
    lang = supportedLangs[short] ? short : "en";
  }

  sessionStorage.setItem("userLanguage", lang);
  applyTranslation(lang);
}

/* ============================================================
   AUTO-APPLY TRANSLATION ON PAGE LOAD
   ============================================================ */
window.addEventListener('load', () => {
  const lang = sessionStorage.getItem("userLanguage");
  if (!lang || lang === "en") return; // nothing chosen or English, stay default

  // Initialize Google Translate and apply stored language
  googleTranslateElementInit();
  applyTranslation(lang);
});
