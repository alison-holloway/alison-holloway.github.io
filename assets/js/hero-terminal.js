/*
 * Hero terminal: types out short documented procedures, shows their output,
 * and ends each one with a "verified" line. Loops through the scenarios.
 *
 * - Respects prefers-reduced-motion (renders the first scenario statically).
 * - Pauses when off screen, when the tab is hidden, or when the visitor
 *   presses the pause button (WCAG 2.2.2).
 */
(function () {
  'use strict';

  var root = document.querySelector('[data-hero-terminal]');
  if (!root) return;

  var screen = root.querySelector('.terminal-screen');
  var titleEl = root.querySelector('.terminal-title');
  var toggle = root.querySelector('.terminal-toggle');

  // Step types: cmd (typed after a prompt), out (printed), ok (verified line).
  // Keep lines to 46 characters or fewer so they fit on a phone.
  var scenarios = [
    {
      title: 'ocne-quick-start.md',
      steps: [
        { cmd: 'ocne cluster start' },
        { out: 'INFO  Starting cluster ocne: ok', dim: true },
        { out: 'INFO  Waiting for control plane: ok', dim: true },
        { out: 'INFO  Installing application catalog: ok', dim: true },
        { cmd: 'kubectl get nodes' },
        { out: 'NAME                   STATUS  ROLES' },
        { out: 'ocne-control-plane-1   Ready   control-plane' },
        { out: 'ocne-worker-1          Ready   <none>' },
        { ok: 'Output matches the documented result' }
      ]
    },
    {
      title: 'podman-kube.md',
      steps: [
        { cmd: 'podman kube play web-pod.yaml' },
        { out: 'Pod:', dim: true },
        { out: '3f9c2a1e8b7d4f05a6c1', dim: true },
        { out: 'Container:', dim: true },
        { out: 'a81d4c0f2e693b7e1d28', dim: true },
        { cmd: 'podman pod ps' },
        { out: 'POD ID        NAME     STATUS   CONTAINERS' },
        { out: '3f9c2a1e8b7d  web-pod  Running  2' },
        { ok: 'Procedure runs clean on Oracle Linux 9' }
      ]
    },
    {
      title: 'rag-cli',
      steps: [
        { cmd: 'rag-cli query "How do I upgrade a cluster?"' },
        { out: 'Retrieving top 3 chunks...', dim: true },
        { out: '  0.82  upgrade.md   Upgrading nodes', dim: true },
        { out: '  0.79  upgrade.md   Before you begin', dim: true },
        { out: '  0.61  concepts.md  Cluster lifecycle', dim: true },
        { out: 'Back up the cluster, then upgrade control' },
        { out: 'plane nodes before worker nodes.' },
        { out: 'Source: upgrade.md > Upgrading nodes', dim: true },
        { ok: 'Answer is grounded in the cited source' }
      ]
    }
  ];

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- rendering helpers ---------- */

  function line(cls) {
    var el = document.createElement('div');
    el.className = 'terminal-line' + (cls ? ' ' + cls : '');
    screen.appendChild(el);
    return el;
  }

  function promptLine(text) {
    var el = line('is-cmd');
    var prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.textContent = '$ ';
    var cmd = document.createElement('span');
    cmd.textContent = text || '';
    el.appendChild(prompt);
    el.appendChild(cmd);
    return cmd;
  }

  function okLine(text) {
    var el = line('is-ok');
    var mark = document.createElement('span');
    mark.className = 'terminal-check';
    mark.textContent = '✓ ';
    el.appendChild(mark);
    el.appendChild(document.createTextNode(text));
  }

  function renderStatic(scenario) {
    screen.textContent = '';
    titleEl.textContent = scenario.title;
    scenario.steps.forEach(function (s) {
      if (s.cmd) promptLine(s.cmd);
      else if (s.out) line(s.dim ? 'is-dim' : '').textContent = s.out;
      else if (s.ok) okLine(s.ok);
    });
  }

  if (reduceMotion) {
    renderStatic(scenarios[0]);
    toggle.hidden = true;
    return;
  }

  /* ---------- pause handling ---------- */

  var userPaused = false;
  var onScreen = true;

  function running() {
    return !userPaused && onScreen && !document.hidden;
  }

  // Sleep that only counts down while the animation is running.
  function wait(ms) {
    var TICK = 30;
    return new Promise(function (resolve) {
      var left = ms;
      (function step() {
        if (left <= 0) return resolve();
        setTimeout(function () {
          if (running()) left -= TICK;
          step();
        }, TICK);
      })();
    });
  }

  toggle.addEventListener('click', function () {
    userPaused = !userPaused;
    toggle.setAttribute('aria-pressed', String(userPaused));
    toggle.setAttribute('aria-label', userPaused ? 'Play animation' : 'Pause animation');
    root.classList.toggle('is-paused', userPaused);
  });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      onScreen = entries[0].isIntersecting;
    }).observe(root);
  }

  /* ---------- animation ---------- */

  var cursor = document.createElement('span');
  cursor.className = 'terminal-cursor';

  async function typeCommand(text) {
    var target = promptLine('');
    target.parentNode.appendChild(cursor);
    await wait(450);
    for (var i = 0; i < text.length; i++) {
      target.textContent += text[i];
      // Slight jitter so the typing feels human.
      await wait(38 + Math.random() * 45);
    }
    await wait(380);
    cursor.remove();
  }

  async function play(scenario) {
    screen.textContent = '';
    titleEl.textContent = scenario.title;
    for (var i = 0; i < scenario.steps.length; i++) {
      var s = scenario.steps[i];
      if (s.cmd) {
        await typeCommand(s.cmd);
      } else if (s.out) {
        line(s.dim ? 'is-dim' : '').textContent = s.out;
        await wait(s.dim ? 260 : 110);
      } else if (s.ok) {
        await wait(500);
        okLine(s.ok);
      }
    }
    // Leave an idle prompt with a blinking cursor while the result sits.
    promptLine('').parentNode.appendChild(cursor);
    await wait(3200);
    cursor.remove();
  }

  (async function loop() {
    var i = 0;
    for (;;) {
      await play(scenarios[i]);
      i = (i + 1) % scenarios.length;
    }
  })();
})();
