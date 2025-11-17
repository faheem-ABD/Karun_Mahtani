/* ============================================================
   GOOGLE TRANSLATE INITIALIZATION
   ============================================================ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: 'en',
    autoDisplay: false,
    includedLanguages: 'es,pt,fr,de,sv,ar,nl,cs,hu,sr,sk,ru,hi,it,el,th,tr,zh-CN,zh-TW,ja,ko'
  }, 'google_translate_element');
}

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
   APPLY TRANSLATION
   ============================================================ */
function toggleLanguage(lang = null) {
  const select = document.querySelector(".goog-te-combo");
  if (!select) {
    alert("Translation engine is still loading. Try again in a moment.");
    return;
  }

  // Use provided language or detect browser language
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

  // Save language for this session
  sessionStorage.setItem("userLanguage", lang);
}

/* ============================================================
   APPLY SESSION LANGUAGE ON PAGE LOAD
   ============================================================ */
window.addEventListener('load', () => {
  const lang = sessionStorage.getItem("userLanguage");
  if (!lang) return;

  const select = document.querySelector(".goog-te-combo");
  if (!select) return;

  select.value = lang;
  select.dispatchEvent(new Event("change"));

  // Hide banner
  setTimeout(() => {
    const gtFrame = document.querySelector('iframe.goog-te-banner-frame');
    if (gtFrame) gtFrame.style.display = 'none';
  }, 500);
});
