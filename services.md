---
layout: default
title: What I do
permalink: /what-i-do/
---

<h1 class="page-title">What I do</h1>

<div class="page-intro">
  <p class="lead">I'm a senior technical writer for developer and platform-engineering audiences. AI is woven into how I work today. Here's what I do.</p>
</div>

<div class="about-content" markdown="1">

---

## Technical Writing and Documentation

I write documentation for complex enterprise software. For 12 years I was the sole
documentation owner for Oracle Cloud Native Environment, an enterprise Kubernetes
platform, across 14 major releases. More recently, I've worked with two major
Australian banks to uplift internal documentation for software upgrades and
platform migrations, and for use by AI assistants.

I help technology companies with:

- Documentation strategy and information architecture
- Installation guides, administration guides, CLI references, release notes, upgrade guides
- Content design for AI retrieval, so RAG systems and platform assistants (such as ServiceNow Now Assist) can find and use content accurately ([see how retrieval works]({{ '/how-ai-reads-docs/' | relative_url }}))
- Docs-as-code: Markdown, Git, GitHub and GitLab pull/merge requests, release branching, YAML and JSON, publishing pipelines
- DITA XML structured authoring, content typing (concept, task, reference, tutorial), and content reuse
- Documentation modernisation (migrating legacy toolchains to Git/DITA workflows)
- Documentation in regulated environments, working with risk and compliance stakeholders
- Plain-English writing and accessibility (WCAG, Section 508)
- Documenting AI and ML systems, grounded in the models and tools I build and document myself

See my [GitHub projects]({{ '/github/' | relative_url }}) for hands-on examples including fine-tuned LLMs and a RAG system built against real documentation.

See the [portfolio]({{ '/portfolio/' | relative_url }}) for examples of my work.

**A note for engineering teams:**

I test what I document. I verified every procedure for Oracle Cloud Native Environment
against live deployments, and wrote Terraform and Ansible scripts to provision my own
test environments, cutting setup time from 6 hours to 20 minutes. Oracle Support later
adopted those scripts for internal testing. I'll work directly with your engineers,
raise issues early, and deliver documentation that holds up under real use.

---

## Watch a draft become documentation

Here's a made-up engineering draft about backing up an Oracle Cloud Native Environment cluster, and the six edits I'd make to turn it into a procedure. The draft is invented; the command and facts come from the [Kubernetes Clusters guide]({{ '/portfolio/ocne2_kubernetes_clusters/' | relative_url }}) I wrote. Press play, or step through the edits.

</div>

<p class="er-noscript">This interactive example needs JavaScript.</p>

<section class="er" data-editing-replay hidden aria-label="Editing replay">
  <div class="er-controls">
    <button type="button" class="er-btn er-play" aria-pressed="false" aria-label="Play">
      <svg class="icon-play" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M4 2.5v11a.75.75 0 0 0 1.14.64l9-5.5a.75.75 0 0 0 0-1.28l-9-5.5A.75.75 0 0 0 4 2.5z"/></svg>
      <svg class="icon-pause" viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1"/><rect x="9.5" y="2" width="3.5" height="12" rx="1"/></svg>
    </button>
    <button type="button" class="er-btn er-prev" aria-label="Previous edit">&lsaquo;</button>
    <div class="er-track">
      <input type="range" class="er-slider" min="0" max="6" step="1" value="0" aria-label="Edit">
      <div class="er-scale" aria-hidden="true"><span>Draft</span><span>Final</span></div>
    </div>
    <button type="button" class="er-btn er-next" aria-label="Next edit">&rsaquo;</button>
    <label class="er-toggle"><input type="checkbox" class="er-changes" checked> Show changes</label>
  </div>
  <div class="er-layout">
    <div class="er-doc" role="region" aria-label="Document being edited"></div>
    <aside class="er-note" aria-live="polite"></aside>
  </div>
</section>

<div class="about-content" markdown="1">

---

## How I use AI

AI is part of my writing toolkit. It makes me a faster, sharper technical writer, and it
keeps my understanding of the technology first-hand.

- **AI-assisted writing.** I use Claude Code and Cursor every day for drafting, restructuring,
  consistency checks, and Python scripting. I check their output the way I check engineering
  specifications: by running the steps and confirming the result.
- **Documentation automation.** On a recent bank contract I used Cursor to write Python scripts
  that converted almost 600 PDF source files to standardised Word documents, saving about 60 hours,
  and mentored other writers in AI tools, GitHub, and documentation automation.
- **Documenting what I build.** I've built a RAG system with an API, CLI, and web UI, run local LLMs,
  and fine-tuned models with QLoRA, and I document those projects end to end. It means I understand
  how AI assistants retrieve and use documentation, and I can write about AI systems from real
  understanding, not a spec sheet.
  See my [GitHub projects]({{ '/github/' | relative_url }}) for source code and write-ups.

</div>

<div class="contact-info">
  <h2>Ready to talk?</h2>
  <p><a href="{{ '/contact/' | relative_url }}">Get in touch</a> to talk about what you're working on.</p>
</div>

<script src="{{ '/assets/js/editing-replay.js' | relative_url }}" defer></script>
