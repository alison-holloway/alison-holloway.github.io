/*
 * "How AI Reads Your Docs" demo.
 *
 * Ranks documentation chunks against a question with BM25 (real keyword
 * retrieval, computed live in the browser), shows which chunks would be sent
 * to a language model as context, and checks whether the answer made it in.
 * Data: assets/js/retrieval-demo-data.js
 */
(function (global) {
  'use strict';

  /* ================= engine (pure, testable in Node) ================= */

  var STOP = (
    'a an and are as at be before after by can do does for from how i if in ' +
    'is it its my of on or so that the then this to up what when why with ' +
    'you your'
  ).split(' ').reduce(function (s, w) { s[w] = true; return s; }, {});

  function stem(w) {
    if (w.length > 5) w = w.replace(/(ing|ed)$/, '');
    if (w.length > 3 && /s$/.test(w) && !/ss$/.test(w)) w = w.slice(0, -1);
    if (w.length > 3 && /e$/.test(w)) w = w.slice(0, -1);
    return w;
  }

  // Returns [{ word, term }] for every non-stopword in the text.
  function analyze(text) {
    return text.toLowerCase().split(/[^a-z0-9]+/).filter(function (w) {
      return w.length > 1 && !STOP[w];
    }).map(function (w) { return { word: w, term: stem(w) }; });
  }

  function chunkBySize(source, text, size) {
    var words = text.split(/\s+/);
    var chunks = [];
    for (var i = 0; i < words.length; i += size) {
      chunks.push({
        source: source,
        heading: source + ' › chunk ' + (chunks.length + 1),
        text: words.slice(i, i + size).join(' '),
        cut: i + size < words.length
      });
    }
    return chunks;
  }

  function buildChunks(data, mode) {
    if (mode === 'structured') {
      return data.structured.map(function (c) {
        return { source: c.source, heading: c.heading, text: c.text, indexText: c.heading + '. ' + c.text };
      });
    }
    return data.unstructured.reduce(function (all, page) {
      return all.concat(chunkBySize(page.source, page.text, data.chunkWords));
    }, []).map(function (c) { c.indexText = c.text; return c; });
  }

  function bm25(chunks, query) {
    var k1 = 1.2, b = 0.75;
    var docs = chunks.map(function (c) { return analyze(c.indexText).map(function (t) { return t.term; }); });
    var avgdl = docs.reduce(function (s, d) { return s + d.length; }, 0) / docs.length;
    var df = {};
    docs.forEach(function (d) {
      var seen = {};
      d.forEach(function (t) { if (!seen[t]) { seen[t] = true; df[t] = (df[t] || 0) + 1; } });
    });
    var qTerms = [];
    analyze(query).forEach(function (t) { if (qTerms.indexOf(t.term) < 0) qTerms.push(t.term); });

    return chunks.map(function (c, i) {
      var d = docs[i];
      var score = 0;
      var matched = [];
      qTerms.forEach(function (q) {
        var tf = d.filter(function (t) { return t === q; }).length;
        if (!tf) return;
        matched.push(q);
        var idf = Math.log(1 + (docs.length - df[q] + 0.5) / (df[q] + 0.5));
        score += idf * (tf * (k1 + 1)) / (tf + k1 * (1 - b + b * d.length / avgdl));
      });
      return { index: i, chunk: c, score: score, matched: matched };
    });
  }

  function run(data, mode, question) {
    var chunks = buildChunks(data, mode);
    var scored = bm25(chunks, question.text);
    var ranked = scored.slice().sort(function (a, b) { return b.score - a.score || a.index - b.index; });
    var context = ranked.slice(0, data.topK).filter(function (r) { return r.score > 0; });
    var contextText = context.map(function (r) { return r.chunk.text; }).join(' ').toLowerCase();
    var missing = question.needs.filter(function (n) { return contextText.indexOf(n.toLowerCase()) < 0; });

    // "Close" = an answer-bearing chunk only just beat the first chunk left out.
    var close = false, answerRank = 0;
    var next = ranked[data.topK];
    context.forEach(function (r, i) {
      var text = r.chunk.text.toLowerCase();
      var carries = question.needs.some(function (n) { return text.indexOf(n.toLowerCase()) >= 0; });
      if (carries && next && r.score - next.score < 0.05 * r.score) {
        close = true;
        answerRank = i + 1;
      }
    });

    return {
      close: missing.length === 0 && close,
      answerRank: answerRank,
      query: analyze(question.text),
      scored: scored,
      ranked: ranked,
      context: context,
      missing: missing,
      complete: missing.length === 0
    };
  }

  var engine = { analyze: analyze, stem: stem, buildChunks: buildChunks, run: run };
  if (typeof module !== 'undefined' && module.exports) module.exports = engine;
  if (typeof document === 'undefined') return;

  var data = global.RETRIEVAL_DEMO;
  if (!data) return;

  /* ================= home page teaser ================= */

  // Fills [data-rd-teaser] with live results for one question, so the teaser
  // never drifts from the demo. The static HTML is the no-JS fallback.
  var teaser = document.querySelector('[data-rd-teaser]');
  if (teaser) {
    var tq = data.questions.filter(function (q) { return q.id === teaser.getAttribute('data-rd-teaser'); })[0];
    if (tq) {
      teaser.querySelector('[data-slot="question"]').textContent = '“' + tq.text + '”';
      ['structured', 'unstructured'].forEach(function (mode) {
        var r = run(data, mode, tq);
        var row = teaser.querySelector('[data-mode="' + mode + '"]');
        var kind = !r.complete ? 'fail' : r.close ? 'close' : 'pass';
        row.className = 'rd-teaser-row is-' + kind;
        row.querySelector('[data-slot="mark"]').textContent = { pass: '✓', close: '!', fail: '✗' }[kind];
        var detail = row.querySelector('[data-slot="detail"]');
        if (kind === 'fail') {
          detail.textContent = 'Missing from the model’s context: ' + r.missing.join(', ');
        } else if (kind === 'close') {
          detail.textContent = 'Only just: the answer scraped in at #' + r.answerRank;
        } else {
          detail.textContent = 'Top result: ' + r.ranked[0].chunk.heading.split(' › ').pop();
        }
      });
    }
  }

  /* ================= UI ================= */

  var root = document.querySelector('[data-retrieval-demo]');
  if (!root) return;

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var el = function (sel) { return root.querySelector(sel); };
  var qWrap = el('.rd-questions');
  var modeWrap = el('.rd-modes');
  var queryOut = el('.rd-query');
  var indexOut = el('.rd-index');
  var contextOut = el('.rd-context');
  var verdictOut = el('.rd-verdict');
  var indexLabel = el('.rd-index-label');

  var state = { question: data.questions[0], mode: 'structured' };
  var timers = [];
  var runId = 0;

  function make(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function later(fn, ms) {
    if (reduceMotion || !ms) return fn();
    timers.push(setTimeout(fn, ms));
  }

  // Wrap matched words in <mark> (matching by stem, like the ranker).
  function highlight(text, terms) {
    var frag = document.createDocumentFragment();
    text.split(/([A-Za-z0-9]+)/).forEach(function (part) {
      if (/^[A-Za-z0-9]+$/.test(part) && terms.indexOf(stem(part.toLowerCase())) >= 0) {
        frag.appendChild(make('mark', null, part));
      } else if (part) {
        frag.appendChild(document.createTextNode(part));
      }
    });
    return frag;
  }

  function buttons(wrap, items, isActive, onPick) {
    wrap.textContent = '';
    items.forEach(function (item) {
      var b = make('button', 'rd-chip', item.label);
      b.type = 'button';
      b.setAttribute('aria-pressed', String(isActive(item)));
      b.addEventListener('click', function () { onPick(item); });
      wrap.appendChild(b);
    });
  }

  function renderControls() {
    buttons(qWrap, data.questions.map(function (q) { return { label: q.text, q: q }; }),
      function (i) { return i.q === state.question; },
      function (i) { state.question = i.q; render(); });
    buttons(modeWrap, [
      { label: 'Structured for retrieval', mode: 'structured' },
      { label: 'One long page', mode: 'unstructured' }
    ], function (i) { return i.mode === state.mode; },
      function (i) { state.mode = i.mode; render(); });
  }

  function render() {
    timers.forEach(clearTimeout);
    timers = [];
    var id = ++runId;
    renderControls();

    var result = run(data, state.mode, state.question);
    var terms = result.query.map(function (t) { return t.term; });
    var top = result.ranked[0] ? result.ranked[0].score : 0;
    var rankOf = {};
    result.context.forEach(function (r, i) { rankOf[r.index] = i + 1; });

    root.classList.remove('is-scored', 'is-done');

    // 1. Query terms
    queryOut.textContent = '';
    result.query.forEach(function (t, i) {
      var chip = make('span', 'rd-term', t.word);
      chip.style.setProperty('--i', i);
      queryOut.appendChild(chip);
    });

    // 2. Index of chunks
    indexLabel.textContent = result.scored.length + ' chunks in the index';
    indexOut.textContent = '';
    result.scored.forEach(function (r) {
      var card = make('li', 'rd-chunk');
      var head = make('div', 'rd-chunk-head');
      head.appendChild(make('span', 'rd-chunk-title', r.chunk.heading));
      var rank = make('span', 'rd-rank', rankOf[r.index] ? '#' + rankOf[r.index] : '');
      head.appendChild(rank);
      card.appendChild(head);
      var body = make('p', 'rd-chunk-text');
      body.appendChild(highlight(r.chunk.text, terms));
      if (r.chunk.cut) body.appendChild(make('span', 'rd-cut', ' …✂'));
      card.appendChild(body);
      var bar = make('div', 'rd-bar');
      var fill = make('span', 'rd-bar-fill');
      fill.style.setProperty('--w', top ? (r.score / top * 100).toFixed(1) + '%' : '0%');
      bar.appendChild(fill);
      var score = make('span', 'rd-score', r.score.toFixed(2));
      card.appendChild(bar);
      card.appendChild(score);
      if (rankOf[r.index]) card.classList.add('is-picked');
      indexOut.appendChild(card);
    });

    // 3. Context sent to the model, and verdict
    contextOut.textContent = '';
    verdictOut.textContent = '';
    verdictOut.className = 'rd-verdict';

    later(function () {
      if (id !== runId) return;
      root.classList.add('is-scored');
    }, 600);

    later(function () {
      if (id !== runId) return;
      root.classList.add('is-done');
      result.context.forEach(function (r, i) {
        var item = make('li', 'rd-context-item');
        item.style.setProperty('--i', i);
        var meta = make('div', 'rd-context-meta');
        meta.appendChild(make('span', 'rd-rank', '#' + (i + 1)));
        meta.appendChild(make('span', 'rd-chunk-title', r.chunk.heading));
        item.appendChild(meta);
        item.appendChild(make('p', 'rd-context-text', r.chunk.text));
        contextOut.appendChild(item);
      });
      if (!result.context.length) {
        contextOut.appendChild(make('li', 'rd-context-item', 'No chunk matched the question.'));
      }

      var kind = !result.complete ? 'fail' : result.close ? 'close' : 'pass';
      verdictOut.classList.add('is-' + kind);
      verdictOut.appendChild(make('span', 'rd-verdict-mark', { pass: '✓', close: '!', fail: '✗' }[kind]));
      var msg = make('span', 'rd-verdict-text');
      if (kind === 'close') {
        msg.appendChild(document.createTextNode('Only just. The answer reached the model at #' + result.answerRank +
          ', with almost the same score as a chunk that was left out. A small change to the docs could drop it: '));
      } else if (result.complete) {
        msg.appendChild(document.createTextNode('Everything needed to answer reached the model: '));
      } else {
        msg.appendChild(document.createTextNode('The model never sees part of the answer. Missing from its context: '));
      }
      var list = result.complete ? state.question.needs : result.missing;
      list.forEach(function (n, i) {
        if (i) msg.appendChild(document.createTextNode(', '));
        msg.appendChild(make('code', null, n));
      });
      verdictOut.appendChild(msg);
    }, 1900);
  }

  root.hidden = false;
  var fallback = document.querySelector('.rd-noscript');
  if (fallback) fallback.hidden = true;
  render();
})(typeof window !== 'undefined' ? window : globalThis);
