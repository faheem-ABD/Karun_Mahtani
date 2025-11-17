/* ============================================================
   SUPPORTED LANGUAGES
   ============================================================ */
const supportedLangs = {
  "es":"Spanish","pt":"Portuguese","fr":"French","de":"German",
  "sv":"Swedish","ar":"Arabic","nl":"Dutch","cs":"Czech",
  "hu":"Hungarian","sr":"Serbian","sk":"Slovak","ru":"Russian",
  "hi":"Hindi","it":"Italian","el":"Greek","th":"Thai",
  "tr":"Turkish","zh-CN":"Chinese Simplified","zh-TW":"Chinese Traditional",
  "ja":"Japanese","ko":"Korean","fi":"Finnish"
};

/* ============================================================
   LOAD GOOGLE SCRIPT ONLY WHEN NEEDED
   ============================================================ */
function loadGoogle(callback) {
  if (window.google && window.google.translate) {
    callback();
    return;
  }
  
  const s = document.createElement("script");
  s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
  s.async = true;
  document.body.appendChild(s);

  window.translateInitCallback = callback;
}

/* ============================================================
   GOOGLE TRANSLATE INIT
   ============================================================ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement({
    pageLanguage: "en",
    includedLanguages: Object.keys(supportedLangs).join(','),
    autoDisplay: false
  }, 'google_translate_element');

  if (window.translateInitCallback) {
    window.translateInitCallback();
  }
}

/* ============================================================
   APPLY TRANSLATION
   ============================================================ */
function applyTranslation(lang) {
  const timer = setInterval(() => {
    const combo = document.querySelector(".goog-te-combo");
    if (!combo) return;

    clearInterval(timer);
    combo.value = lang;
    combo.dispatchEvent(new Event("change"));

    // hide banner and widget
    setTimeout(() => {
      const banner = document.querySelector("iframe.goog-te-banner-frame");
      if (banner) banner.style.display = "none";
      const widget = document.querySelector("#google_translate_element");
      if (widget) widget.style.display = "none";
    }, 300);
  }, 100);
}

/* ============================================================
   BUTTON CLICK — ENABLE TRANSLATION
   ============================================================ */
function toggleLanguage() {
  // Already active this session → do nothing
  if (sessionStorage.getItem("translate") === "1") return;

  // Detect browser language
  let lang = (navigator.language || "en").toLowerCase();
  if (!supportedLangs[lang]) {
    const short = lang.split("-")[0];
    lang = supportedLangs[short] ? short : "en";
  }

  // Save session translation state
  sessionStorage.setItem("translate", "1");
  sessionStorage.setItem("translateLang", lang);

  loadGoogle(() => {
    applyTranslation(lang);
  });
}

/* ============================================================
   APPLY TRANSLATION ON PAGE LOAD ONLY IF SESSION ACTIVE
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const active = sessionStorage.getItem("translate");
  const lang = sessionStorage.getItem("translateLang");

  if (!active || !lang) return;   // default English on refresh

  loadGoogle(() => {
    applyTranslation(lang);
  });
});
