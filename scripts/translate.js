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
   APPLY TRANSLATION WHEN BUTTON IS CLICKED
   ============================================================ */
function toggleLanguage(lang = null) {
  // Initialize Google Translate only once
  googleTranslateElementInit();

  // Wait until dropdown exists
  const interval = setInterval(() => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return;

    clearInterval(interval);

    // Auto-detect if no language provided
    if (!lang) {
      lang = (navigator.language || navigator.userLanguage).toLowerCase();
      if (!supportedLangs[lang]) {
        const short = lang.split("-")[0];
        lang = supportedLangs[short] ? short : "en";
      }
    }

    select.value = lang;
    select.dispatchEvent(new Event("change"));

    // Hide Google Translate banner
    setTimeout(() => {
      const gtFrame = document.querySelector('iframe.goog-te-banner-frame');
      if (gtFrame) gtFrame.style.display = 'none';
    }, 500);

  }, 100); // poll every 100ms
}

/* ============================================================
   OPTIONAL: Reset translation on page load
   ============================================================ */
window.addEventListener('load', () => {
  // Ensure page loads in English
  const gtFrame = document.querySelector('iframe.goog-te-banner-frame');
  if (gtFrame) gtFrame.style.display = 'none';
});
