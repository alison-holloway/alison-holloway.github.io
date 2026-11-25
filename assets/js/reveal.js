/*
 * Scroll reveals: block-level content fades and rises into place as it
 * scrolls into view. Loaded on every page by _layouts/default.html.
 *
 * - Only content that starts below the fold animates; anything visible on
 *   load is left alone, so nothing above the fold flickers or arrives late.
 * - Elements entering together are staggered slightly (in document order).
 * - No JS, no IntersectionObserver, or prefers-reduced-motion: content just
 *   shows. The hidden state is only ever added by this script.
 */
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var SELECTOR = [
    '.page-intro',
    '.track-card',
    '.rd-teaser',
    '.page-end-cta',
    '.portfolio-section-title',
    '.portfolio-card',
    '.education-item',
    '.demo-callout',
    '.journey-explorer',
    '.aud',
    '.ax',
    '.rd-controls',
    '.rd-panel',
    '.portfolio-details',
    '.about-content > h2',
    '.portfolio-content > h2',
    '.portfolio-content > table'
  ].join(', ');

  var STAGGER = 80;   // ms between elements entering together
  var MAX_DELAY = 400;

  var targets = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
  var fold = window.innerHeight;

  var observer = new IntersectionObserver(function (entries) {
    var entering = entries.filter(function (e) { return e.isIntersecting; })
      .map(function (e) { return e.target; })
      .sort(function (a, b) {
        return a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
      });

    entering.forEach(function (el, i) {
      observer.unobserve(el);
      el.style.animationDelay = Math.min(i * STAGGER, MAX_DELAY) + 'ms';
      el.classList.add('is-revealed');
      el.addEventListener('animationend', function done(ev) {
        if (ev.target !== el) return;
        el.removeEventListener('animationend', done);
        el.classList.remove('reveal', 'is-revealed');
        el.style.animationDelay = '';
      });
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.1 });

  targets.forEach(function (el) {
    if (el.getBoundingClientRect().top < fold) return; // already on screen
    el.classList.add('reveal');
    observer.observe(el);
  });
})();
