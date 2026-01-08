---
title: Oracle Cloud Native Environment Release 2 - Applications Guide
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: User Guide
version: F96198-13
date: '2024-08-01'
date_completed: 'August 2025'
featured: false
tags:
- Applications
- Kubernetes
- Cloud Native
- Deployment
tools:
- DITA XML
- Oxygen XML Editor
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/applications/OCNE-2-APPS.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/applications/
excerpt: Guide for deploying and managing cloud-native applications on Oracle CNE
  using application catalogs, covering installation, configuration, and lifecycle
  management of applications.
---

## Overview

The Oracle Cloud Native Environment Applications Guide documents how to deploy, configure, and manage cloud-native applications on Kubernetes clusters using Oracle CNE's application catalog system. The guide covers application catalog concepts and architecture, installing applications from catalogs, configuring application deployments, managing application lifecycle (updates, scaling, removal), creating custom application catalogs, integration with Helm charts, and application monitoring and troubleshooting.

## Target Audience

DevOps engineers, application developers, and system administrators deploying applications on Oracle CNE. Assumes basic Kubernetes knowledge and familiarity with containerized applications.

## Key Features

**Catalog-Based Deployment:** Oracle CNE provides curated application catalogs containing tested, enterprise-grade applications. The guide documents how to browse, select, and deploy applications from these catalogs.

**Helm Integration:** Documentation covers Helm chart usage for application deployment, including customization through values files and command-line overrides.

**Lifecycle Management:** Complete procedures for managing deployed applications including updates, scaling, backup, and removal.

## Documentation Challenge

Balancing generic Kubernetes application deployment patterns with Oracle CNE-specific catalog features required careful organization. Users needed to understand both standard Kubernetes application concepts and Oracle CNE's simplified deployment workflows.

**Solution:** Structured documentation to introduce Oracle CNE catalog features first (the simplified path), then provided deeper coverage of underlying Kubernetes/Helm concepts for users requiring more control.
