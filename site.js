// ============================================================
//  LiveAura – إعدادات الموقع (عدّل هذي القيم بس)
// ============================================================
const SITE = {
  price: '7.72',                 // سعر الاشتراك الشهري بالدولار
  trialDays: 3,                  // أيام التجربة المجانية
  email: 'liveaura0@gmail.com',                     // إيميل الدعم، مثال: 'support@gmail.com'
  handle: '@J_lmbh',             // حسابك (يظهر للتواصل وفي الحقوق)
  checkoutUrl: '',               // رابط صفحة الدفع من Lemon Squeezy (حطه بعد ما تسوي المنتج)
  chromeStoreUrl: '',            // رابط الإضافة في متجر كروم (بعد النشر)
  updated: '2026-11-04',         // تاريخ آخر تحديث للسياسات
};

// ---------- اللغة ----------
(function () {
  let lang = null;
  try { lang = localStorage.getItem('la-lang'); } catch {}
  const q = new URLSearchParams(location.search).get('lang');
  if (q === 'ar' || q === 'en') lang = q;
  if (!lang) lang = (navigator.language || '').toLowerCase().startsWith('ar') ? 'ar' : 'en';
  setLang(lang);
  window.setLang = setLang;

  function setLang(l) {
    document.documentElement.lang = l;
    document.documentElement.dir = l === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('la-lang', l); } catch {}
    document.querySelectorAll('[data-lang-btn]').forEach(b => b.classList.toggle('on', b.dataset.langBtn === l));
    const t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
  }
})();

// ---------- تعبئة القيم ----------
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang-btn]').forEach(b => b.addEventListener('click', () => setLang(b.dataset.langBtn)));
  const set = (sel, fn) => document.querySelectorAll(sel).forEach(fn);
  set('[data-price]', el => el.textContent = '$' + SITE.price);
  set('[data-trial]', el => el.textContent = SITE.trialDays);
  set('[data-email]', el => {
    if (SITE.email) { el.textContent = SITE.email; if (el.tagName === 'A') el.href = 'mailto:' + SITE.email; }
    else { el.textContent = SITE.handle; el.removeAttribute('href'); }
  });
  set('[data-handle]', el => el.textContent = SITE.handle);
  set('[data-updated]', el => el.textContent = SITE.updated);
  set('[data-year]', el => el.textContent = new Date().getFullYear());
  set('[data-cta]', el => {
    if (SITE.checkoutUrl) { el.href = SITE.checkoutUrl; el.target = '_blank'; el.rel = 'noopener'; }
    else if (SITE.chromeStoreUrl) { el.href = SITE.chromeStoreUrl; el.target = '_blank'; el.rel = 'noopener'; }
  });
  set('[data-install]', el => {
    if (SITE.chromeStoreUrl) { el.href = SITE.chromeStoreUrl; el.target = '_blank'; el.rel = 'noopener'; }
  });

  // FAQ
  set('.faq details', d => d.addEventListener('toggle', () => {
    if (d.open) document.querySelectorAll('.faq details').forEach(o => { if (o !== d) o.open = false; });
  }));
});
