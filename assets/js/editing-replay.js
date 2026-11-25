/*
 * Editing replay: "Watch a Draft Become Documentation".
 *
 * A made-up engineering draft is edited, one change at a time, into a
 * procedure. Each edit shows as tracked changes (deletions struck through,
 * insertions typed in) with a margin note explaining why. The facts and the
 * command come from the Oracle Cloud Native Environment Release 2 Kubernetes
 * Clusters guide (Backing Up a Cluster); the draft itself is invented.
 *
 * Block types: h (heading), s (draft sentence, shown inline with neighbours),
 * p (paragraph), note, step, code.
 * Edit ops: { set: id, type?, text? }, { remove: id }, { add: block, after: id }
 */
(function () {
  'use strict';

  var DRAFT = {
    title: 'The draft',
    why: 'A plausible first pass from an engineer: accurate, but hard to follow and easy to get wrong.',
    blocks: [
      { id: 'title', type: 'h', text: 'Backups' },
      { id: 's1', type: 's', text: 'You should probably back things up regularly.' },
      { id: 's2', type: 's', text: 'To do this you can use the backup command which will save the etcd stuff to a file, e.g. ocne cluster backup --out mybackup.db.' },
      { id: 's3', type: 's', text: 'The cluster doesn\'t need to be stopped.' },
      { id: 's4', type: 's', text: 'Note that this doesn\'t do apps.' },
      { id: 's5', type: 's', text: 'Also there\'s no restore command so you\'ll need to look at the upstream docs for that.' }
    ]
  };

  var EDITS = [
    {
      title: 'Name the task',
      why: 'Readers scan headings for what they want to do. “Backups” names a topic, not a task.',
      ops: [{ set: 'title', text: 'Backing Up a Cluster' }]
    },
    {
      title: 'Lead with what and when',
      why: 'Open with what the task does and whether it’s safe to run now, so readers know they’re in the right place.',
      ops: [
        { set: 's1', type: 'p', text: 'Back up the etcd database of a cluster. You don\'t need to stop the cluster to do this.' },
        { remove: 's3' }
      ]
    },
    {
      title: 'Say what’s included, and what isn’t',
      why: '“This doesn’t do apps” is a warning buried mid-paragraph. Make the scope explicit, before readers start.',
      ops: [{ set: 's4', type: 'note', text: 'The backup contains the etcd database for the control plane nodes. Application containers aren\'t backed up.' }]
    },
    {
      title: 'One action per step',
      why: 'The command was hidden after “e.g.” in a long sentence. Give the action its own numbered step, with the command on its own line to copy.',
      ops: [
        { remove: 's2' },
        { add: { id: 'step1', type: 'step', text: 'Back up the cluster to a file:' }, after: 's4' },
        { add: { id: 'code1', type: 'code', text: 'ocne cluster backup --out mybackup.db' }, after: 'step1' }
      ]
    },
    {
      title: 'Show how to check it worked',
      why: 'A quick check turns “I think it worked” into “it worked”.',
      ops: [
        { add: { id: 'step2', type: 'step', text: 'Confirm that the backup file was created:' }, after: 'code1' },
        { add: { id: 'code2', type: 'code', text: 'ls -l mybackup.db' }, after: 'step2' }
      ]
    },
    {
      title: 'Don’t leave readers stranded',
      why: '“Look at the upstream docs” isn’t a next step. Say exactly what’s missing and where to go.',
      ops: [{ set: 's5', type: 'p', text: 'The CLI doesn\'t provide a restore command. To restore a cluster from a backup, see the upstream Kubernetes documentation for etcd.' }]
    }
  ];

  var STEP_MS = 4200;

  var root = document.querySelector('[data-editing-replay]');
  if (!root) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var docEl = root.querySelector('.er-doc');
  var noteEl = root.querySelector('.er-note');
  var slider = root.querySelector('.er-slider');
  var playBtn = root.querySelector('.er-play');
  var prevBtn = root.querySelector('.er-prev');
  var nextBtn = root.querySelector('.er-next');
  var changesToggle = root.querySelector('.er-changes');

  /* ---------- build the states ---------- */

  function clone(blocks) {
    return blocks.map(function (b) { return { id: b.id, type: b.type, text: b.text }; });
  }

  var states = [clone(DRAFT.blocks)];
  EDITS.forEach(function (edit) {
    var blocks = clone(states[states.length - 1]);
    edit.ops.forEach(function (op) {
      if (op.set) {
        var b = blocks.filter(function (x) { return x.id === op.set; })[0];
        if (op.type) b.type = op.type;
        if (op.text != null) b.text = op.text;
      } else if (op.remove) {
        blocks = blocks.filter(function (x) { return x.id !== op.remove; });
      } else if (op.add) {
        var at = blocks.map(function (x) { return x.id; }).indexOf(op.after);
        blocks.splice(at + 1, 0, { id: op.add.id, type: op.add.type, text: op.add.text });
      }
    });
    states.push(blocks);
  });

  /* ---------- word diff ---------- */

  function tokens(text) { return text.match(/\s+|[^\s]+/g) || []; }

  // Returns [{ op: 'same'|'del'|'ins', text }] using an LCS over tokens.
  function diff(a, b) {
    var x = tokens(a), y = tokens(b), n = x.length, m = y.length;
    var dp = [];
    for (var i = 0; i <= n; i++) { dp.push(new Array(m + 1).fill(0)); }
    for (i = n - 1; i >= 0; i--) {
      for (var j = m - 1; j >= 0; j--) {
        dp[i][j] = x[i] === y[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
    var out = [];
    i = 0; j = 0;
    function push(op, t) {
      var last = out[out.length - 1];
      if (last && last.op === op) last.text += t; else out.push({ op: op, text: t });
    }
    while (i < n && j < m) {
      if (x[i] === y[j]) { push('same', x[i]); i++; j++; }
      else if (dp[i + 1][j] >= dp[i][j + 1]) { push('del', x[i]); i++; }
      else { push('ins', y[j]); j++; }
    }
    while (i < n) { push('del', x[i++]); }
    while (j < m) { push('ins', y[j++]); }
    return out;
  }

  /* ---------- rendering ---------- */

  var insCount = 0;

  function make(tag, cls, text) {
    var el = document.createElement(tag);
    if (cls) el.className = cls;
    if (text != null) el.textContent = text;
    return el;
  }

  function insWords(parent, text) {
    var ins = make('ins');
    tokens(text).forEach(function (t) {
      var span = make('span', null, t);
      if (/\S/.test(t)) span.style.setProperty('--i', insCount++);
      ins.appendChild(span);
    });
    parent.appendChild(ins);
  }

  function fillText(el, item) {
    if (item.status === 'removed') { el.appendChild(make('del', null, item.block.text)); return; }
    if (item.status === 'added') { insWords(el, item.block.text); return; }
    if (item.status === 'changed') {
      var parts = diff(item.prevText, item.block.text);
      // A wholesale rewrite reads better as one deletion and one insertion
      // than as word-by-word confetti, so fall back when under half survives.
      var words = function (t) { return (t.match(/\S+/g) || []).length; };
      var kept = parts.reduce(function (n, part) { return n + (part.op === 'same' ? words(part.text) : 0); }, 0);
      if (kept < 0.5 * Math.min(words(item.prevText), words(item.block.text))) {
        el.appendChild(make('del', null, item.prevText));
        el.appendChild(document.createTextNode(' '));
        insWords(el, item.block.text);
        return;
      }
      parts.forEach(function (part) {
        if (part.op === 'same') el.appendChild(document.createTextNode(part.text));
        else if (part.op === 'del') el.appendChild(make('del', null, part.text));
        else insWords(el, part.text);
      });
      return;
    }
    el.appendChild(document.createTextNode(item.block.text));
  }

  // Merge two states into one list, keeping removed blocks where they were.
  function merge(prev, next, tracked) {
    if (!tracked || !prev) {
      return next.map(function (b) { return { block: b, status: 'same' }; });
    }
    var nextIds = next.map(function (b) { return b.id; });
    var prevById = {};
    prev.forEach(function (b) { prevById[b.id] = b; });

    var removedAfter = { '': [] };
    var anchor = '';
    prev.forEach(function (b) {
      if (nextIds.indexOf(b.id) >= 0) { anchor = b.id; return; }
      (removedAfter[anchor] = removedAfter[anchor] || []).push({ block: b, status: 'removed' });
    });

    var out = removedAfter[''].slice();
    next.forEach(function (b) {
      var p = prevById[b.id];
      var status = !p ? 'added' : (p.text !== b.text || p.type !== b.type) ? 'changed' : 'same';
      out.push({ block: b, status: status, prevText: p ? p.text : '' });
      (removedAfter[b.id] || []).forEach(function (r) { out.push(r); });
    });
    return out;
  }

  function render(index, animate) {
    insCount = 0;
    var tracked = changesToggle.checked;
    var items = merge(states[index - 1], states[index], tracked && index > 0);
    docEl.textContent = '';
    docEl.classList.toggle('is-animating', !!animate && !reduceMotion);

    var para = null;
    var stepNo = 0;
    items.forEach(function (item) {
      var b = item.block;
      if (b.type !== 's') para = null;
      var el;
      if (b.type === 's') {
        if (!para) { para = make('p', 'er-p er-draft'); docEl.appendChild(para); }
        el = make('span', 'er-s');
        para.appendChild(el);
        fillText(el, item);
        para.appendChild(document.createTextNode(' '));
        return;
      }
      if (b.type === 'h') el = make('h4', 'er-h');
      else if (b.type === 'p') el = make('p', 'er-p');
      else if (b.type === 'note') {
        el = make('div', 'er-note-block');
        el.appendChild(make('span', 'er-note-label', 'Note'));
      } else if (b.type === 'step') {
        el = make('div', 'er-step');
        if (item.status !== 'removed') stepNo++;
        el.appendChild(make('span', 'er-step-num', String(stepNo)));
      } else if (b.type === 'code') el = make('pre', 'er-code');
      var body = b.type === 'note' || b.type === 'step' ? make('span', 'er-body') : el;
      if (body !== el) el.appendChild(body);
      fillText(body, item);
      if (item.status === 'added') el.classList.add('is-added');
      if (item.status === 'removed') el.classList.add('is-removed');
      docEl.appendChild(el);
    });

    var info = index === 0 ? DRAFT : EDITS[index - 1];
    noteEl.textContent = '';
    noteEl.appendChild(make('p', 'er-note-step', index === 0 ? 'Start' : 'Edit ' + index + ' of ' + EDITS.length));
    noteEl.appendChild(make('p', 'er-note-title', info.title));
    noteEl.appendChild(make('p', 'er-note-why', info.why));

    slider.value = String(index);
    slider.setAttribute('aria-valuetext', (index === 0 ? 'Draft' : 'Edit ' + index + ': ' + info.title));
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === EDITS.length;
  }

  /* ---------- playback ---------- */

  var current = 0;
  var timer = null;

  function go(index, animate) {
    current = Math.max(0, Math.min(EDITS.length, index));
    render(current, animate);
  }

  function setPlaying(on) {
    clearTimeout(timer);
    timer = null;
    playBtn.setAttribute('aria-pressed', String(on));
    playBtn.setAttribute('aria-label', on ? 'Pause' : 'Play');
    root.classList.toggle('is-playing', on);
    if (on) tick();
  }

  function tick() {
    timer = setTimeout(function () {
      if (current >= EDITS.length) { setPlaying(false); return; }
      go(current + 1, true);
      if (current >= EDITS.length) setPlaying(false); else tick();
    }, current === 0 ? 1200 : STEP_MS);
  }

  playBtn.addEventListener('click', function () {
    var playing = playBtn.getAttribute('aria-pressed') === 'true';
    if (!playing && current >= EDITS.length) go(0, false);
    setPlaying(!playing);
  });
  prevBtn.addEventListener('click', function () { setPlaying(false); go(current - 1, false); });
  nextBtn.addEventListener('click', function () { setPlaying(false); go(current + 1, true); });
  slider.addEventListener('input', function () { setPlaying(false); go(Number(slider.value), false); });
  changesToggle.addEventListener('change', function () { render(current, false); });

  slider.max = String(EDITS.length);
  root.hidden = false;
  var fallback = document.querySelector('.er-noscript');
  if (fallback) fallback.hidden = true;
  go(0, false);

  // Play once, the first time the replay scrolls into view.
  if (!reduceMotion && 'IntersectionObserver' in window) {
    var seen = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      seen.disconnect();
      if (current === 0) setPlaying(true);
    }, { threshold: 0.5 });
    seen.observe(root);
  }
})();
