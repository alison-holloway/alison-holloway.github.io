/*
 * Excalidraw diagram enhancements for portfolio pages.
 *
 * 1. Draw-on: every <img> pointing at /assets/excalidraw/*.svg is swapped for
 *    the same SVG inline. When it scrolls into view, strokes draw in document
 *    order and fills and labels fade in. Without JS the <img> simply stays.
 *
 * 2. Journey explorer: a [data-journey-explorer] wrapper around a diagram gets
 *    persona buttons. Choosing one dims the other cards and lights up the
 *    journey's cards in order with numbered badges. Journey data lives in the
 *    buttons' data attributes in the Markdown:
 *      data-steps="Book A|Book B|Book A"   ordered card labels (repeats allowed)
 *      data-hub="Book"                     optional hub card (steps are spokes)
 *      data-caption="..."  data-target="#heading-id"
 *
 * prefers-reduced-motion: no draw-on; the explorer still works, without motion.
 */
(function () {
  'use strict';

  var SVG_NS = 'http://www.w3.org/2000/svg';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var images = Array.prototype.slice.call(
    document.querySelectorAll('img[src*="/assets/excalidraw/"][src$=".svg"]')
  );
  if (!images.length) return;

  /* ---------- inline an <img> as <svg> ---------- */

  function inline(img) {
    return fetch(img.getAttribute('src'))
      .then(function (r) {
        if (!r.ok) throw new Error(r.status);
        return r.text();
      })
      .then(function (text) {
        var doc = new DOMParser().parseFromString(text, 'image/svg+xml');
        var svg = doc.documentElement;
        if (svg.nodeName !== 'svg') throw new Error('not an svg');
        svg = document.importNode(svg, true);

        var width = svg.getAttribute('width');
        svg.removeAttribute('height');
        svg.setAttribute('style', (img.getAttribute('style') || '') +
          ';width:' + width + 'px;height:auto;display:block;');
        svg.setAttribute('class', 'excalidraw-diagram');
        svg.setAttribute('role', 'img');
        var alt = img.getAttribute('alt') || '';
        svg.setAttribute('aria-label', alt);
        var title = document.createElementNS(SVG_NS, 'title');
        title.textContent = alt;
        svg.insertBefore(title, svg.firstChild);

        img.replaceWith(svg);
        return svg;
      });
  }

  /* ---------- draw-on animation ---------- */

  function prepareDraw(svg) {
    var groups = Array.prototype.filter.call(svg.children, function (el) {
      return el.nodeName === 'g';
    });
    // Whole diagram takes about 1.8s however many elements it has.
    var step = Math.min(70, 1800 / Math.max(groups.length, 1));

    groups.forEach(function (g, i) {
      g.style.setProperty('--draw-delay', Math.round(i * step) + 'ms');
      Array.prototype.forEach.call(g.querySelectorAll('path'), function (p) {
        var stroke = p.getAttribute('stroke');
        var drawable = stroke && stroke !== 'none' && !p.hasAttribute('stroke-dasharray');
        if (drawable) {
          var len = Math.ceil(p.getTotalLength());
          p.style.strokeDasharray = len;
          p.style.strokeDashoffset = len;
          p.classList.add('draw-stroke');
        } else {
          p.classList.add('draw-fade');
        }
      });
      Array.prototype.forEach.call(g.querySelectorAll('text'), function (t) {
        t.classList.add('draw-fade');
      });
    });
    svg.classList.add('draw-ready');
  }

  function runDraw(svg) {
    svg.classList.add('is-drawn');
    Array.prototype.forEach.call(svg.querySelectorAll('.draw-stroke'), function (p) {
      p.style.strokeDashoffset = '0';
    });
    // Tidy up once finished so later highlight styles aren't fighting dashes.
    setTimeout(function () {
      Array.prototype.forEach.call(svg.querySelectorAll('.draw-stroke'), function (p) {
        p.style.strokeDasharray = '';
        p.style.strokeDashoffset = '';
      });
      svg.classList.remove('draw-ready');
    }, 3200);
  }

  var observer = !reduceMotion && 'IntersectionObserver' in window
    ? new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (!e.isIntersecting) return;
          observer.unobserve(e.target);
          // Let the hidden state paint before starting the transition.
          requestAnimationFrame(function () {
            requestAnimationFrame(function () { runDraw(e.target); });
          });
        });
      }, { threshold: 0.3 })
    : null;

  /* ---------- journey explorer ---------- */

  function setupExplorer(root, svg) {
    var buttons = Array.prototype.slice.call(root.querySelectorAll('[data-steps]'));
    var caption = root.querySelector('.journey-caption');
    var defaultCaption = caption ? caption.innerHTML : '';
    var tabs = root.querySelector('.journey-tabs');
    if (tabs) tabs.hidden = false;

    // Map card label -> { card group, label group, box }.
    var cards = {};
    Array.prototype.forEach.call(svg.querySelectorAll('text'), function (t) {
      var labelGroup = t.parentNode;
      var card = labelGroup.previousElementSibling;
      if (!card || card.nodeName !== 'g') return;
      // Cards are the white-filled shapes; category containers are cream.
      var fill = card.querySelector('path[stroke="none"]');
      if (!fill || !/^#fff(fff)?$/i.test(fill.getAttribute('fill') || '')) return;
      card.classList.add('journey-card');
      labelGroup.classList.add('journey-label');
      var box = card.getBBox();
      var m = card.transform.baseVal.consolidate();
      var dx = m ? m.matrix.e : 0;
      var dy = m ? m.matrix.f : 0;
      cards[t.textContent.trim()] = {
        card: card,
        label: labelGroup,
        x: box.x + dx,
        y: box.y + dy
      };
    });

    var badgeLayer = document.createElementNS(SVG_NS, 'g');
    badgeLayer.setAttribute('class', 'journey-badges');
    svg.appendChild(badgeLayer);

    var timers = [];

    function clear() {
      timers.forEach(clearTimeout);
      timers = [];
      svg.classList.remove('journey-active');
      Object.keys(cards).forEach(function (k) {
        cards[k].card.classList.remove('is-step', 'is-hub');
        cards[k].label.classList.remove('is-step');
      });
      badgeLayer.textContent = '';
    }

    function badge(c, text) {
      // Outer group positions; inner group animates (CSS transform would
      // otherwise replace the translate attribute).
      var outer = document.createElementNS(SVG_NS, 'g');
      var w = Math.max(24, 10 + text.length * 8);
      outer.setAttribute('transform', 'translate(' + (c.x - 6) + ' ' + (c.y - 10) + ')');
      var g = document.createElementNS(SVG_NS, 'g');
      g.setAttribute('class', 'journey-badge');
      outer.appendChild(g);
      var r = document.createElementNS(SVG_NS, 'rect');
      r.setAttribute('width', w);
      r.setAttribute('height', 24);
      r.setAttribute('rx', 12);
      var t = document.createElementNS(SVG_NS, 'text');
      t.setAttribute('x', w / 2);
      t.setAttribute('y', 16.5);
      t.setAttribute('text-anchor', 'middle');
      t.textContent = text;
      g.appendChild(r);
      g.appendChild(t);
      badgeLayer.appendChild(outer);
    }

    function light(name, text, hub) {
      var c = cards[name];
      if (!c) return;
      c.card.classList.add('is-step');
      if (hub) c.card.classList.add('is-hub');
      c.label.classList.add('is-step');
      if (text) badge(c, text);
    }

    function show(btn) {
      clear();
      svg.classList.add('journey-active');

      var steps = btn.getAttribute('data-steps').split('|').map(function (s) { return s.trim(); });
      var hub = btn.getAttribute('data-hub');
      var sequence = [];

      if (hub) {
        sequence.push({ name: hub, text: 'Hub', hub: true });
        steps.forEach(function (s) { sequence.push({ name: s, text: '' }); });
      } else {
        // Collect step numbers per card so repeats read "2, 4".
        var numbers = {};
        steps.forEach(function (s, i) { (numbers[s] = numbers[s] || []).push(i + 1); });
        steps.forEach(function (s, i) {
          var first = numbers[s][0] === i + 1;
          if (first) sequence.push({ name: s, text: numbers[s].join(', ') });
        });
      }

      var gap = reduceMotion ? 0 : 380;
      sequence.forEach(function (item, i) {
        if (!gap) return light(item.name, item.text, item.hub);
        timers.push(setTimeout(function () { light(item.name, item.text, item.hub); }, i * gap));
      });

      if (caption) {
        caption.textContent = '';
        var strong = document.createElement('strong');
        strong.textContent = btn.textContent.trim() + ': ';
        caption.appendChild(strong);
        caption.appendChild(document.createTextNode(btn.getAttribute('data-caption') + ' '));
        var target = btn.getAttribute('data-target');
        if (target) {
          var a = document.createElement('a');
          a.href = target;
          a.textContent = 'Read the journey ↓';
          caption.appendChild(a);
        }
      }
    }

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var wasPressed = btn.getAttribute('aria-pressed') === 'true';
        buttons.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        if (wasPressed) {
          clear();
          if (caption) caption.innerHTML = defaultCaption;
        } else {
          btn.setAttribute('aria-pressed', 'true');
          show(btn);
        }
      });
    });
  }

  /* ---------- wire up ---------- */

  images.forEach(function (img) {
    var explorer = img.closest('[data-journey-explorer]');
    if (reduceMotion && !explorer) return; // plain image is fine

    inline(img).then(function (svg) {
      if (explorer) setupExplorer(explorer, svg);
      if (observer) {
        prepareDraw(svg);
        observer.observe(svg);
      }
    }).catch(function () { /* keep the <img> */ });
  });
})();
