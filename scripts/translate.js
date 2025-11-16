// ------------------------------
// GOOGLE TRANSLATE INITIALIZATION
// ------------------------------
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

// ------------------------------
// LANGUAGE DETECTION + TRANSLATION
// ------------------------------

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

function getBrowserLanguage() {
  return (navigator.language || navigator.userLanguage).toLowerCase();
}

function getMatchingLanguageCode() {
  const browserLang = getBrowserLanguage();

  // Exact match (e.g. "fr", "zh-CN")
  if (supportedLangs[browserLang]) return browserLang;

  // General language (e.g. "fr-CA" → "fr")
  const short = browserLang.split("-")[0];

  // Handle Chinese special case
  if (short === "zh") {
    return browserLang.includes("tw") ? "zh-TW" : "zh-CN";
  }

  if (supportedLangs[short]) return short;

  return null;
}

// Called by the button
function toggleLanguage() {
  const lang = getMatchingLanguageCode();

  if (!lang) {
    alert("Your browser language is not supported.");
    return;
  }

  const select = document.querySelector(".goog-te-combo");
  if (!select) {
    alert("Translation is still loading. Try again in a moment.");
    return;
  }

  select.value = lang;
  select.dispatchEvent(new Event("change"));
}
