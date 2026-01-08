---
title: Oracle Cloud Native Environment Release 2 - Oracle Container Host for Kubernetes
  Image Builder
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: User Guide
version: G17139-05
date: '2024-08-01'
date_completed: 'August 2025'
featured: false
tags:
- Image Building
- Kubernetes
- Node Images
- Customization
tools:
- DITA XML
- Oxygen XML Editor
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/ockforge/OCNE-2-OCKFORGE.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/ockforge/
excerpt: Guide for creating customized Oracle Container Host for Kubernetes (OCK)
  images used as node operating systems in Oracle CNE Kubernetes clusters.
---

## Overview

The Oracle Container Host for Kubernetes (OCK) Image Builder Guide documents procedures for creating custom node images for Oracle CNE clusters. OCK is the specialized Oracle Linux-based operating system image optimized for Kubernetes node deployment. The guide covers OCK image architecture and components, image building prerequisites and environment setup, creating custom OCK images with additional software, image customization options (packages, configurations, scripts), testing and validating custom images, deploying clusters using custom OCK images, and troubleshooting image build issues.

## Target Audience

Platform engineers, security teams, and system administrators who need to customize Kubernetes node images to meet organizational requirements. Assumes strong Linux system administration knowledge and familiarity with image building concepts.

## Key Documentation Features

**Customization Workflows:** While Oracle provides pre-built OCK images, many enterprise deployments require customization for security agents, monitoring tools, or corporate standards. This guide documents the complete customization workflow.

**Build Process:** Detailed documentation of the image build process, including required tools, build environment setup, and build configuration options.

**Integration with Cluster Deployment:** Shows how custom OCK images integrate with standard Oracle CNE cluster deployment workflows across all provider types.

## Documentation Challenge

OCK image customization involves multiple technologies: Oracle Linux, image building tools, Kubernetes node requirements, and various provider-specific image formats. Documentation needed to guide users through this complexity while preventing image builds that would produce non-functional Kubernetes nodes.

**Solution:** Developed validation checklists and testing procedures to ensure custom images meet all Kubernetes node requirements. Provided tested examples for common customization scenarios (adding monitoring agents, custom certificates, hardening configurations)
