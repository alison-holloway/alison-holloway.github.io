---
layout: default
title: How AI Reads Your Docs
permalink: /how-ai-reads-docs/
description: An interactive demo of how AI assistants retrieve documentation, and why structure decides whether the answer reaches the model.
image: /assets/images/social/how-ai-reads-docs.png
---

<h1 class="page-title">How AI Reads Your Docs</h1>

<div class="page-intro">
  <p class="lead">An AI assistant doesn't read your documentation the way a person does. It retrieves a few chunks that look relevant and answers from those alone.</p>
</div>

<div class="about-content rd-intro" markdown="1">

If the answer isn't in the chunks it retrieves, the assistant can't give it, however good the rest of your docs are.

This demo runs real keyword retrieval (BM25) in your browser over two versions of the same cluster administration content, adapted from the [Kubernetes Clusters guide]({{ '/portfolio/ocne2_kubernetes_clusters/' | relative_url }}) I wrote for Oracle Cloud Native Environment Release 2. The structured version follows the guide's own headings and topics. The other holds the same facts, written as one long page and split into fixed-size chunks.

Pick a question, then switch between the versions. Try all three: the unstructured version sometimes gets lucky, and that inconsistency is part of the problem.

</div>

<p class="rd-noscript">This interactive demo needs JavaScript.</p>

<section class="rd" data-retrieval-demo hidden aria-label="Retrieval demo">
  <div class="rd-controls">
    <div class="rd-control">
      <p class="rd-step"><span class="rd-step-num">1</span> Ask a question</p>
      <div class="rd-questions" role="group" aria-label="Question"></div>
    </div>
    <div class="rd-control">
      <p class="rd-step"><span class="rd-step-num">2</span> Choose the documentation</p>
      <div class="rd-modes" role="group" aria-label="Documentation version"></div>
    </div>
  </div>

  <div class="rd-panel">
    <p class="rd-step"><span class="rd-step-num">3</span> The question becomes search terms</p>
    <div class="rd-query" aria-live="polite"></div>
  </div>

  <div class="rd-panel">
    <p class="rd-step"><span class="rd-step-num">4</span> Every chunk is scored <span class="rd-index-label"></span></p>
    <ol class="rd-index"></ol>
  </div>

  <div class="rd-panel rd-panel-context">
    <p class="rd-step"><span class="rd-step-num">5</span> The top 3 chunks are all the model sees</p>
    <ol class="rd-context"></ol>
    <p class="rd-verdict" role="status"></p>
  </div>
</section>

<div class="about-content rd-outro" markdown="1">

## What Makes the Difference

- **Headings that name the task.** "Backing Up a Cluster" can be found. "Preparation" can't.
- **Sections that stand alone.** Name the subject instead of writing "it" or "everything else". A chunk loses everything around it.
- **Chunks that follow the structure.** Split content at topic boundaries, not every few hundred words, and index each heading path with its text.
- **The words people search with.** Readers ask how to "upgrade" a cluster or "back up" a cluster. Content that only says "move to a new release" or "save the database" is hard to find.

Production assistants usually combine keyword search with semantic (embedding) search, but the same principle holds: a chunk that never names its subject is hard to retrieve. The sample chunks are shortened from the Cluster Administration and libvirt Provider chapters of the [published guide](https://docs.oracle.com/en/operating-systems/olcne/2/clusters/), and the `ocne` commands are as documented.

</div>

<script src="{{ '/assets/js/retrieval-demo-data.js' | relative_url }}" defer></script>
<script src="{{ '/assets/js/retrieval-demo.js' | relative_url }}" defer></script>
