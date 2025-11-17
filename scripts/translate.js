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
   BUTTON CLICK: Translate Page
   ============================================================ */
function toggleLanguage(lang = null) {
  // Initialize Google Translate if not already
  googleTranslateElementInit();

  // Auto-detect language if none provided
  if (!lang) {
    lang = (navigator.language || navigator.userLanguage).toLowerCase();
    if (!supportedLangs[lang]) {
      const short = lang.split("-")[0];
      lang = supportedLangs[short] ? short : "en";
    }
  }

  // Save language in sessionStorage for other pages
  sessionStorage.setItem("userLanguage", lang);

  // Apply translation seamlessly
  applyTranslation(lang);
}

/* ============================================================
   AUTO-APPLY TRANSLATION ON PAGE LOAD
   ============================================================ */
window.addEventListener('load', () => {
  const lang = sessionStorage.getItem("userLanguage");
  if (!lang) return; // nothing chosen yet, stay in English

  // Initialize Google Translate and auto-apply stored language
  googleTranslateElementInit();
  applyTranslation(lang);
});
