---
title: Oracle Cloud Native Environment Release 2 - Quick Start Guide
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: Quick Start Guide
version: F96192-11
date: '2024-08-01'
date_completed: '2024-08-01'
featured: false
tags:
- Quick Start
- Installation
- Cloud Native
- Kubernetes
- KVM
- OLVM
- OCI
tools:
- DITA XML
- Oxygen XML Editor
- Git
- Draw.io
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/quickstart/OCNE-2-QUICKSTART.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/quickstart/
excerpt: Fast-track guide for creating a KVM-based Kubernetes cluster using the libvirt
  provider, designed to get users up and running with Oracle CNE quickly.
---

## Overview

The Oracle Cloud Native Environment Quick Start Guide provides streamlined procedures for deploying a development or test Kubernetes cluster using the libvirt provider on a single KVM host. This guide is designed to get users from zero to a running Kubernetes cluster in the shortest time possible, covering CLI installation and initial configuration, single-node KVM host setup with libvirt, simple Kubernetes cluster creation, basic cluster verification, and next steps for expanding to production deployments.

## Target Audience

Developers, system administrators, and DevOps engineers who want to quickly evaluate Oracle CNE or set up development environments. Assumes Linux system administration skills and basic virtualization knowledge.

## Key Features

**Minimal Prerequisites:** Focuses on single-host deployment requiring only a Linux system with KVM/libvirt capabilities.

**Task-Focused:** Every section leads directly to a working configuration. No conceptual deep-dives that slow down initial deployment.

**Tested Procedures:** All commands tested on Oracle Linux 8 and 9 to ensure reliability.

## Documentation Challenge

Quick Start guides must balance speed with completeness. Users want to get running quickly but also need enough information to troubleshoot if something goes wrong.

**Solution:** Provided streamlined procedures with clear expected outputs at each step, plus links to detailed troubleshooting and conceptual information for users who need more depth.ß