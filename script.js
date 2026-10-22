'use strict';

// Progressive enhancement: content is visible until an entrance starts.
// Native radio controls keep the gallery functional without JavaScript.
(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!('IntersectionObserver' in window) || preference.matches) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-entering');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('[data-reveal]').forEach((element) => {
    observer.observe(element);
    element.addEventListener('animationend', () => {
      element.classList.remove('is-entering');
    }, { once: true });
  });

  preference.addEventListener('change', (event) => {
    if (!event.matches) return;
    observer.disconnect();
    document.querySelectorAll('.is-entering').forEach((element) => {
      element.classList.remove('is-entering');
    });
  });
})();
