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

## One idea, four readers

Good documentation explains the same thing differently depending on who's reading. Here's how
the Oracle Cloud Native Environment doc set I wrote explains one idea, the Oracle Container Host
for Kubernetes (OCK) image, to four different readers. The text is quoted from the published guides.
Pick a reader.

</div>

<section class="aud" data-audience-switcher aria-label="One idea, four readers">
  <div class="aud-tabs" role="tablist" aria-label="Reader" hidden>
    <button type="button" role="tab" class="aud-tab" id="aud-tab-create" aria-controls="aud-create">
      <span class="aud-tab-who">Creating a cluster</span>
      <span class="aud-tab-guide">Kubernetes Clusters</span>
    </button>
    <button type="button" role="tab" class="aud-tab" id="aud-tab-custom" aria-controls="aud-custom">
      <span class="aud-tab-who">Needs a custom image</span>
      <span class="aud-tab-guide">OCK Image Builder</span>
    </button>
    <button type="button" role="tab" class="aud-tab" id="aud-tab-upgrade" aria-controls="aud-upgrade">
      <span class="aud-tab-who">Upgrading from Release 1</span>
      <span class="aud-tab-guide">Upgrade</span>
    </button>
    <button type="button" role="tab" class="aud-tab" id="aud-tab-versions" aria-controls="aud-versions">
      <span class="aud-tab-who">Checking what's available</span>
      <span class="aud-tab-guide">Release Notes</span>
    </button>
  </div>

  <div class="aud-panel" role="tabpanel" id="aud-create" aria-labelledby="aud-tab-create">
    <p class="aud-ask"><span class="aud-ask-label">Their question</span> What is this thing I'm deploying to my nodes?</p>
    <blockquote class="aud-quote">
      <p>Oracle CNE includes a Command Line Interface (CLI) that can manage the life cycle of Kubernetes clusters, using OSTree based container images. <mark>The container images include both the host Oracle Linux OS, and the Kubernetes software distribution.</mark> These images are deployed to hosts or Virtual Machines (VMs) to create nodes in a Kubernetes cluster. These images are referred to in this documentation set as Oracle Container Host for Kubernetes (OCK) images.</p>
      <footer><a href="https://docs.oracle.com/en/operating-systems/olcne/2/clusters/intro_concept.html">Kubernetes Clusters guide: Introduction</a></footer>
    </blockquote>
    <p class="aud-why"><span class="aud-why-label">Why it's written this way</span> This is where most readers meet the term for the first time, so it says what the image contains and what it does (becomes a node) before it gives the name. The name comes last, once it means something.</p>
  </div>

  <div class="aud-panel" role="tabpanel" id="aud-custom" aria-labelledby="aud-tab-custom">
    <p class="aud-ask"><span class="aud-ask-label">Their question</span> The standard image doesn't fit. Can I make my own, and what do I get?</p>
    <blockquote class="aud-quote">
      <p>Use OCK Image Builder to build custom OCK images for situations where the standard OCK image isn't adequate.</p>
      <p>For a specific configuration, OCK Image Builder can generate:</p>
      <ul>
        <li>A bootable Qcow2 image, to create cluster nodes.</li>
        <li>An OSTree container image, which Oracle CNE uses to update nodes in a running cluster.</li>
      </ul>
      <footer><a href="https://docs.oracle.com/en/operating-systems/olcne/2/ockforge/intro.html">OCK Image Builder guide: Introduction</a></footer>
    </blockquote>
    <p class="aud-why"><span class="aud-why-label">Why it's written this way</span> This reader already knows what an OCK image is, so there's no definition. The guide opens with when to build your own, then lists the two outputs as a pair, each with its purpose, so readers can see which one they need.</p>
  </div>

  <div class="aud-panel" role="tabpanel" id="aud-upgrade" aria-labelledby="aud-tab-upgrade">
    <p class="aud-ask"><span class="aud-ask-label">Their question</span> Will anything in my Release 1 cluster stop me upgrading?</p>
    <blockquote class="aud-quote">
      <p>Before you begin, identify any OS Customizations in the Release 1 cluster. If you have OS customizations that can't be set up using a configuration file, you might need to use Oracle Container Host for Kubernetes Image Builder to build a custom image to use during the upgrade.</p>
      <footer><a href="https://docs.oracle.com/en/operating-systems/olcne/2/upgrade/prereq.html">Upgrade guide: Prerequisites</a></footer>
    </blockquote>
    <p class="aud-why"><span class="aud-why-label">Why it's written this way</span> An upgrader doesn't care what an OCK image is until it affects them. The image only comes up here as a condition, before they begin, so nobody finds out halfway through an upgrade that they needed a custom build.</p>
  </div>

  <div class="aud-panel" role="tabpanel" id="aud-versions" aria-labelledby="aud-tab-versions">
    <p class="aud-ask"><span class="aud-ask-label">Their question</span> Which versions are out, and where do I pull them from?</p>
    <blockquote class="aud-quote">
      <p>Kubernetes Releases 1.35 and 1.34 are included with Oracle CNE Release 2.4. Updated Oracle Container Host for Kubernetes images are also available for Kubernetes Releases 1.33 and 1.32.</p>
      <p><mark>The Oracle Container Host for Kubernetes (OCK) image includes both the host Oracle Linux OS, and the Kubernetes software distribution.</mark> The OCK image is distributed on the Oracle Container Registry.</p>
      <p>A bootable container image, in the Qcow2 format, is available at:</p>
      <pre>container-registry.oracle.com/olcne/ock</pre>
      <p>An OSTree commit based container image, is available at:</p>
      <pre>container-registry.oracle.com/olcne/ock-ostree</pre>
      <footer><a href="https://docs.oracle.com/en/operating-systems/olcne/2/relnotes/components.html">Release Notes: Component Versions</a></footer>
    </blockquote>
    <p class="aud-why"><span class="aud-why-label">Why it's written this way</span> Versions come first, because that's what release notes readers came for. Then one line of definition, in the same words as the Kubernetes Clusters guide (highlighted), so the term means the same thing in every guide. It ends with the exact locations to copy.</p>
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
<script src="{{ '/assets/js/audience-switcher.js' | relative_url }}" defer></script>
