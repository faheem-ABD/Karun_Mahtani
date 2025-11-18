let translationActive = false;

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        autoDisplay: false
    }, 'google_translate_element');
}

function toggleLanguage() {
    const combo = document.querySelector('.goog-te-combo');

    if (!combo) {
        loadGoogleTranslate(() => {
            setTimeout(toggleLanguage, 300); 
        });
        return;
    }

    if (!translationActive) {
        const userLang = navigator.language.split('-')[0] || 'es';
        combo.value = userLang;
        combo.dispatchEvent(new Event('change'));
        translationActive = true;
    } else {
        combo.value = 'en';
        combo.dispatchEvent(new Event('change'));
        translationActive = false;
    }
}

function loadGoogleTranslate(callback) {
    if (document.getElementById('google-translate-script')) {
        callback();
        return;
    }

    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.onload = callback;
    document.body.appendChild(script);
}
