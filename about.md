---
layout: default
title: About
permalink: /about/
---

<h1 class="page-title">About Alison</h1>

<div class="page-intro">
  <p class="lead">I'm a senior technical writer based in Melbourne, Australia.</p>
</div>

<div class="about-content" markdown="1">

I write for developer and platform-engineering audiences. At Oracle, for 12 years I was the sole documentation owner for Oracle Cloud Native Environment, an enterprise Kubernetes platform, across 14 major releases. I designed the information architecture, moved the source to a Git-based docs-as-code workflow, and tested every procedure against live deployments.

I use AI tools every day in my writing work, for drafting, restructuring, and consistency checks. I check their output the way I checked engineering specifications: by running the steps and confirming the result. Since leaving Oracle I've built a RAG system with an API, CLI, and UI, run local LLMs, and fine-tuned models with QLoRA, so I understand how AI assistants retrieve and use documentation.

In recent contracts with two major Australian banks, I worked with stakeholders to uplift documentation so that people and AI assistants can find and use it accurately.

I learn unfamiliar technical and business domains quickly and have done so repeatedly, from Kubernetes and virtualisation to banking risk and compliance.

## Technical Writer (Contractor) | pta Consulting Group

Contracts with two major national Australian banks, preparing internal documentation for software updates and platform migrations and for use by AI assistants.

- **ServiceNow pilot:** Uplifted non-financial risk content (work instructions and reference articles) for a pilot migration from Confluence to ServiceNow, working with risk content owners to agree structure and terminology. Designed the content so the platform's AI assistant, Now Assist, could retrieve it accurately.
- **Software upgrade:** Uplifted compliance documents (work instructions and standard operating procedures) hosted on SharePoint to support a major software upgrade and AI ingestion. Used Cursor to write Python scripts to automate conversion of almost 600 PDF source files to standardised Word documents, saving about 60 hours. Created and shared Python projects in the internal GitHub repository. Mentored writers in AI tools, GitHub, and documentation automation.

## AI Projects (Independent)

Hands-on projects to understand from the inside how AI assistants retrieve and use documentation:

- **RAG CLI:** a retrieval-augmented generation system with four interfaces (CLI, REST API, web UI, and a native macOS desktop app), using the Oracle Cloud Native Environment documentation as the corpus. This showed me where retrieval breaks and how content structure affects answer quality.
- **Kubernetes Assistant:** fine-tuning Llama 3.1 8B with QLoRA on 2,000 generated training examples drawn from the upstream Kubernetes documentation, covering YAML generation, kubectl commands, and error troubleshooting. The fine-tuned model scores 97% on the test set, against 73% for the base model, on consumer-grade hardware.
- **Oracle Cloud Native Environment Assistant:** the same approach applied to Q&A pairs generated from the Oracle Cloud Native Environment Release 2 documentation I spent 12 years writing.
- **Local LLM infrastructure:** set up and run on a dedicated Ubuntu workstation.
- **MicroK8s dashboard tutorial:** a published technical guide on installing and accessing the Kubernetes dashboard on Canonical's MicroK8s.

All are on the [GitHub projects]({{ '/github/' | relative_url }}) page with source code and documentation.

## Staff Technical Writer (Consulting User Assistance Developer) | Oracle Australia

Oracle Cloud Native Environment is a multi-component Kubernetes platform for enterprise customers. I was the sole technical writer for the product across all 14 major releases and owned the information architecture as well as the content.

**Documentation architecture and delivery.** I designed the complete documentation structure covering installation, configuration, administration, upgrade, and reference content across multiple concurrent product releases. I built the information architecture with strict DITA XML content typing, maximising reuse across shared components, and structured content for distinct user pathways: new users, those evaluating the product, experienced administrators, and customers upgrading from earlier releases. I structured the product documentation to complement upstream Kubernetes and component documentation, linking to it rather than duplicating it. I managed publication and version control on docs.oracle.com and maintained the documentation Git repository, creating, reviewing, and merging changes and managing release branches across concurrent releases.

**Engineering collaboration and testing.** I worked with engineering and QA throughout each development cycle to test features, identify gaps, and raise defects before release. I verified all documentation against live deployments, using OCI daily to deploy the platform across many virtualised configurations (OCI VMs, nested KVM on OCI VMs, Oracle Linux Virtualization Manager). I wrote Terraform and Ansible scripts to provision and validate my own test environments, cutting setup time from 6 hours to 20 minutes. Oracle Support later adopted those scripts for internal testing.

**Toolchain, mentoring, and learning content.** I migrated the documentation source from DocBook XML and Subversion to DITA XML and Git, implementing a docs-as-code workflow that reduced publication overhead and improved version control. I mentored junior technical writers in structured authoring, writing practices, and working effectively with engineering teams, and produced tutorials with the training team that were consistent with the product documentation.

**Other Oracle Linux products.** I delivered documentation for Oracle OpenStack, Oracle VM, Oracle Linux Virtualization Manager, and related open-source technologies including Podman, DTrace, Gluster Storage, and Ceph Storage.

## Earlier roles: Senior Technical Writer | Oracle Australia

I produced documentation for Oracle Database and Oracle Applications, covering SQL\*Plus, localisation features, and developer tools, and worked with product teams across multiple divisions. I co-authored *The Underground PHP and Oracle Manual*, a practical guide for PHP developers integrating with Oracle Database. I presented technical sessions and ran hands-on training at Oracle OpenWorld and international PHP conferences in Germany and New York.

## Education

<div class="education-grid">
<div class="education-item" markdown="1">

**Master of Technology**
Internet and Web Computing
RMIT University, Melbourne

</div>
<div class="education-item" markdown="1">

**Graduate Diploma**
Internet and Web Computing (Distinction)
RMIT University, Melbourne

</div>
</div>

</div>
