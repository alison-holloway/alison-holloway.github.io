/*
 * Annotated excerpt: "Inside the Guide" on portfolio item pages.
 *
 * The excerpt and notes are rendered by Jekyll (_includes/annotated-excerpt.html)
 * and read fine without JS: numbered highlights in the text, numbered notes
 * beside or below it. This script adds:
 *
 * - Wide screens: each note sits in the margin level with its highlight, like
 *   review comments, pushed down only when notes would overlap.
 * - Hovering, focusing, or tapping a highlight lights up its note (and the
 *   other way round).
 * - Narrow screens: tapping a highlight opens its note just below the
 *   paragraph, so readers don't lose their place.
 * - Highlights sweep in once, the first time the excerpt scrolls into view
 *   (not under reduced motion).
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-annotated-excerpt]');
  if (!root) return;

  var doc = root.querySelector('.ax-doc');
  var list = root.querySelector('.ax-notes');
  var marks = Array.prototype.slice.call(doc.querySelectorAll('mark[data-n]'));
  var notes = Array.prototype.slice.call(list.querySelectorAll('.ax-n'));
  var wide = window.matchMedia('(min-width: 900px)');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var GAP = 12;
  var pinned = null;
  var pop = null;

  function noteFor(n) { return document.getElementById('ax-n' + n); }
  function marksFor(n) { return marks.filter(function (m) { return m.getAttribute('data-n') === n; }); }

  /* ---------- pairing ---------- */

  function activate(n) {
    root.classList.toggle('has-active', !!n);
    marks.forEach(function (m) { m.classList.toggle('is-active', m.getAttribute('data-n') === n); });
    notes.forEach(function (li) { li.classList.toggle('is-active', li.getAttribute('data-n') === n); });
  }

  function release() { activate(pinned); }

  marks.forEach(function (m) {
    var n = m.getAttribute('data-n');
    m.tabIndex = 0;
    m.setAttribute('role', 'button');
    m.setAttribute('aria-describedby', 'ax-n' + n);
    m.setAttribute('aria-expanded', 'false');
    m.addEventListener('mouseenter', function () { activate(n); });
    m.addEventListener('mouseleave', release);
    m.addEventListener('focus', function () { activate(n); });
    m.addEventListener('blur', release);
    m.addEventListener('click', function () { toggle(n, m); });
    m.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(n, m); }
      if (e.key === 'Escape') { toggle(null); }
    });
  });

  notes.forEach(function (li) {
    var n = li.getAttribute('data-n');
    li.addEventListener('mouseenter', function () { activate(n); });
    li.addEventListener('mouseleave', release);
  });

  // Click pins a note on; clicking it again (or Escape) unpins.
  function toggle(n, mark) {
    pinned = n && pinned !== n ? n : null;
    marks.forEach(function (m) { m.setAttribute('aria-expanded', String(m.getAttribute('data-n') === pinned)); });
    activate(pinned);
    showPop(pinned ? mark : null);
  }

  /* ---------- narrow screens: inline note ---------- */

  function showPop(mark) {
    if (pop) { pop.remove(); pop = null; }
    if (!mark || wide.matches) return;
    var n = mark.getAttribute('data-n');
    var block = mark.closest('p, li, div.ax-admon, h4') || mark;
    pop = document.createElement('div');
    pop.className = 'ax-pop';
    pop.setAttribute('role', 'note');
    pop.innerHTML = noteFor(n).querySelector('.ax-n-body').innerHTML;
    var num = document.createElement('span');
    num.className = 'ax-n-num';
    num.setAttribute('aria-hidden', 'true');
    num.textContent = n;
    pop.insertBefore(num, pop.firstChild);
    block.parentNode.insertBefore(pop, block.nextSibling);
  }

  /* ---------- wide screens: notes level with their highlights ---------- */

  function layout() {
    if (!wide.matches) {
      root.classList.remove('is-aligned');
      list.style.height = '';
      notes.forEach(function (li) { li.style.top = ''; });
      return;
    }
    if (pop) { pop.remove(); pop = null; }
    root.classList.add('is-aligned');
    var base = list.getBoundingClientRect().top;
    var floor = 0;
    notes.forEach(function (li) {
      var first = marksFor(li.getAttribute('data-n'))[0];
      var want = first ? first.getBoundingClientRect().top - base - 4 : floor;
      var top = Math.max(want, floor);
      li.style.top = top + 'px';
      floor = top + li.offsetHeight + GAP;
    });
    list.style.height = Math.max(floor - GAP, 0) + 'px';
  }

  var raf = null;
  function schedule() {
    if (raf) return;
    raf = requestAnimationFrame(function () { raf = null; layout(); });
  }

  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(doc);
  window.addEventListener('resize', schedule);
  if (wide.addEventListener) wide.addEventListener('change', schedule);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(schedule);
  root.classList.add('is-enhanced');
  layout();

  /* ---------- sweep the highlights in once ---------- */

  if (reduceMotion || !('IntersectionObserver' in window)) return;
  root.classList.add('will-sweep');
  marks.forEach(function (m, i) { m.style.setProperty('--ax-i', i); });
  // Trigger on any overlap with the upper three-quarters of the viewport, not
  // a fraction of the excerpt: a tall excerpt (a figure plus a long list) can
  // never be 35% visible on a short screen, which left the badges hidden.
  var seen = new IntersectionObserver(function (entries) {
    if (!entries[0].isIntersecting) return;
    seen.disconnect();
    root.classList.add('is-swept');
  }, { threshold: 0, rootMargin: '0px 0px -25% 0px' });
  seen.observe(doc);
})();
