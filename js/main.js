// Keep the selected language between visits.
let currentLang = 'ar';
try {
  currentLang = localStorage.getItem('lang') || 'ar';
} catch {
  // The site still works when browser storage is unavailable.
}

function applyLanguage(lang) {
  const isArabic = lang === 'ar';
  document.documentElement.lang = lang;
  document.documentElement.dir = isArabic ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-ar]').forEach((element) => {
    const translatedText = element.getAttribute(`data-${lang}`);
    if (translatedText !== null) element.textContent = translatedText;
  });

  document.querySelectorAll('[data-ar-label]').forEach((element) => {
    const translatedLabel = element.getAttribute(`data-${lang}-label`);
    if (translatedLabel) element.setAttribute('aria-label', translatedLabel);
  });

  document.querySelectorAll('[data-ar-alt]').forEach((element) => {
    const translatedAlt = element.getAttribute(`data-${lang}-alt`);
    if (translatedAlt) element.setAttribute('alt', translatedAlt);
  });

  const button = document.getElementById('langBtn');
  if (button) {
    button.textContent = isArabic ? 'EN' : 'ع';
    button.setAttribute('aria-label', isArabic ? 'Switch language to English' : 'تغيير اللغة إلى العربية');
    button.setAttribute('lang', isArabic ? 'en' : 'ar');
  }

  document.querySelectorAll('.current-year').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  try {
    localStorage.setItem('lang', lang);
  } catch {
    // Language switching remains available for the current page session.
  }
  currentLang = lang;
}

document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  document.getElementById('langBtn')?.addEventListener('click', () => {
    applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
  });
});
