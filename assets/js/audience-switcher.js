/*
 * Audience switcher: "One idea, four readers" on the What I do page.
 *
 * The panels are plain HTML in services.md, each quoting how one guide in the
 * Oracle Cloud Native Environment doc set explains the OCK image to its
 * reader. Without JS they show as a stacked list. This script turns them into
 * tabs (WAI-ARIA tabs pattern: arrow keys, Home/End, roving tabindex) and
 * crossfades between panels. Nothing plays by itself.
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-audience-switcher]');
  if (!root) return;

  var tablist = root.querySelector('[role="tablist"]');
  var tabs = Array.prototype.slice.call(root.querySelectorAll('[role="tab"]'));
  var panels = tabs.map(function (t) { return document.getElementById(t.getAttribute('aria-controls')); });
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var current = -1;

  function select(index, focus) {
    if (index === current) { if (focus) tabs[index].focus(); return; }
    tabs.forEach(function (tab, i) {
      var on = i === index;
      tab.setAttribute('aria-selected', String(on));
      tab.tabIndex = on ? 0 : -1;
      panels[i].hidden = !on;
      panels[i].classList.toggle('is-entering', on && current !== -1 && !reduceMotion);
    });
    current = index;
    if (focus) tabs[index].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener('click', function () { select(i, false); });
    tab.addEventListener('keydown', function (e) {
      var next = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      select(next, true);
    });
  });

  panels.forEach(function (p) {
    p.tabIndex = 0;
    p.addEventListener('animationend', function () { p.classList.remove('is-entering'); });
  });

  root.classList.add('is-tabbed');
  tablist.hidden = false;
  select(0, false);
})();
