/* ============================================================
   GOOGLE TRANSLATE INITIALIZATION
   ============================================================ */
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    {
      pageLanguage: 'en',
      autoDisplay: false,
      includedLanguages:
        'es,pt,fr,de,sv,ar,nl,cs,hu,sr,sk,ru,hi,it,el,th,tr,zh-CN,zh-TW,ja,ko'
    },
    'google_translate_element'
  );
}

/* ============================================================
   SUPPORTED LANGUAGES
   ============================================================ */
const supportedLangs = {
  "es": "Spanish",
  "pt": "Portuguese",
  "fr": "French",
  "de": "German",
  "sv": "Swedish",
  "ar": "Arabic",
  "nl": "Dutch",
  "cs": "Czech",
  "hu": "Hungarian",
  "sr": "Serbian",
  "sk": "Slovak",
  "ru": "Russian",
  "hi": "Hindi",
  "it": "Italian",
  "el": "Greek",
  "th": "Thai",
  "tr": "Turkish",
  "zh-CN": "Chinese Simplified",
  "zh-TW": "Chinese Traditional",
  "ja": "Japanese",
  "ko": "Korean"
};

/* ============================================================
   BROWSER LANGUAGE DETECTION
   ============================================================ */
function getBrowserLanguage() {
  return (navigator.language || navigator.userLanguage).toLowerCase();
}

function getMatchingLanguageCode() {
  const browserLang = getBrowserLanguage();

  // Exact match (e.g., fr, zh-CN)
  if (supportedLangs[browserLang]) return browserLang;

  // Short code match (e.g., fr-CA → fr)
  const short = browserLang.split("-")[0];

  // Chinese special case
  if (short === "zh") {
    return browserLang.includes("tw") ? "zh-TW" : "zh-CN";
  }

  if (supportedLangs[short]) return short;

  return null; // unsupported
}

/* ============================================================
   COOKIE FUNCTIONS
   ============================================================ */
function setLanguageCookie(lang) {
  const d = new Date();
  d.setTime(d.getTime() + 30*24*60*60*1000);
  const expires = "expires=" + d.toUTCString();
  document.cookie = "userLanguage=" + lang + ";" + expires + ";path=/";
}

function getLanguageCookie() {
  const match = document.cookie.match(new RegExp('(^| )userLanguage=([^;]+)'));
  return match ? match[2] : null;
}

/* ============================================================
   HIDE GOOGLE TRANSLATE BANNER
   ============================================================ */
function hideGoogleTranslateBanner() {
  const gtFrame = document.querySelector('iframe.goog-te-banner-frame');
  if (gtFrame) {
    gtFrame.style.display = 'none';
  }
}

/* ============================================================
   TRANSLATE PAGE ON DEMAND
   ============================================================ */
function toggleLanguage(lang = null) {
  const select = document.querySelector(".goog-te-combo");

  if (!select) {
    alert("Translation engine is still loading. Please try again in a moment.");
    return;
  }

  // Use provided lang or detect browser language
  if (!lang) {
    lang = getMatchingLanguageCode();
    if (!lang) {
      alert("Your browser language is not supported for translation.");
      return;
    }
  }

  select.value = lang;
  select.dispatchEvent(new Event("change"));

  setLanguageCookie(lang);
  setTimeout(hideGoogleTranslateBanner, 500);
}

/* ============================================================
   PRE-SELECT LANGUAGE WITHOUT TRANSLATING
   ============================================================ */
function applyPersistentLanguage() {
  const lang = getLanguageCookie() || getMatchingLanguageCode();
  if (!lang) return;

  const select = document.querySelector(".goog-te-combo");
  if (!select) return;

  // Pre-select in dropdown but DO NOT trigger translation
  select.value = lang;
}

// Run on page load
window.addEventListener('load', () => {
  // Delay to ensure Google Translate is loaded
  setTimeout(applyPersistentLanguage, 1000);
});
