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
  "es": "Spanish","pt": "Portuguese","fr": "French","de": "German",
  "sv": "Swedish","ar": "Arabic","nl": "Dutch","cs": "Czech",
  "hu": "Hungarian","sr": "Serbian","sk": "Slovak","ru": "Russian",
  "hi": "Hindi","it": "Italian","el": "Greek","th": "Thai",
  "tr": "Turkish","zh-CN": "Chinese Simplified","zh-TW": "Chinese Traditional",
  "ja": "Japanese","ko": "Korean"
};

/* ============================================================
   BROWSER LANGUAGE DETECTION
   ============================================================ */
function getBrowserLanguage() {
  return (navigator.language || navigator.userLanguage).toLowerCase();
}

function getMatchingLanguageCode() {
  const browserLang = getBrowserLanguage();
  if (supportedLangs[browserLang]) return browserLang;
  const short = browserLang.split("-")[0];
  if (short === "zh") return browserLang.includes("tw") ? "zh-TW" : "zh-CN";
  if (supportedLangs[short]) return short;
  return null;
}

/* ============================================================
   COOKIE FUNCTIONS
   ============================================================ */
function setLanguageCookie(lang) {
  const d = new Date();
  d.setTime(d.getTime() + 30*24*60*60*1000);
  document.cookie = `userLanguage=${lang};expires=${d.toUTCString()};path=/`;
}

function getLanguageCookie() {
  const match = document.cookie.match(/(^| )userLanguage=([^;]+)/);
  return match ? match[2] : null;
}

/* ============================================================
   HIDE GOOGLE TRANSLATE BANNER
   ============================================================ */
function hideGoogleTranslateBanner() {
  const gtFrame = document.querySelector('iframe.goog-te-banner-frame');
  if (gtFrame) gtFrame.style.display = 'none';
}

/* ============================================================
   PRE-SELECT LANGUAGE WITHOUT TRANSLATING
   ============================================================ */
function applyPersistentLanguage() {
  const lang = getLanguageCookie() || getMatchingLanguageCode();
  if (!lang) return;
  const select = document.querySelector(".goog-te-combo");
  if (!select) return;
  // Only pre-select, do NOT dispatch change event
  select.value = lang;
}

/* ============================================================
   TRANSLATE PAGE ON DEMAND
   ============================================================ */
function toggleLanguage(lang = null) {
  const select = document.querySelector(".goog-te-combo");
  if (!select) {
    alert("Translation engine is still loading. Try again in a moment.");
    return;
  }
  if (!lang) lang = getMatchingLanguageCode();
  if (!lang) {
    alert("Your browser language is not supported for translation.");
    return;
  }
  select.value = lang;
  select.dispatchEvent(new Event("change"));
  setLanguageCookie(lang);
  setTimeout(hideGoogleTranslateBanner, 500);
}

/* ============================================================
   WAIT FOR GOOGLE TRANSLATE TO LOAD
   ============================================================ */
window.addEventListener('load', () => {
  setTimeout(applyPersistentLanguage, 1000);
});
