// حفظ اللغة المختارة في المتصفح
let currentLang = localStorage.getItem('lang') || 'ar';

function applyLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  // تبديل النصوص العادية
  document.querySelectorAll('[data-ar]').forEach(el => {
    const text = el.getAttribute('data-' + lang);
    if (text) {
      // إذا كان العنصر يحتوي على HTML (مثل صفحة الخصوصية)
      if (text.includes('<')) {
        el.innerHTML = text;
      } else {
        el.textContent = text;
      }
    }
  });

  // تبديل زر اللغة
  const btn = document.getElementById('langBtn');
  if (btn) btn.textContent = lang === 'ar' ? 'EN' : 'ع';

  localStorage.setItem('lang', lang);
  currentLang = lang;
}

// زر التبديل
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);

  const btn = document.getElementById('langBtn');
  if (btn) {
    btn.addEventListener('click', () => {
      applyLanguage(currentLang === 'ar' ? 'en' : 'ar');
    });
  }
});
