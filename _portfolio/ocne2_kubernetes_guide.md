---
title: Oracle Cloud Native Environment Release 2 - Kubernetes Guide
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: User Guide
version: F96196-06
date: '2024-08-01'
date_completed: 'August 2025'
featured: false
tags:
- Kubernetes
- Cloud Native
- Container Management
- kubectl
tools:
- DITA XML
- Oxygen XML
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/kubernetes/OCNE-2-KUBERNETES.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/kubernetes/
excerpt: Comprehensive introduction to using Kubernetes on Oracle CNE, covering kubectl
  usage, pod management, services, deployments, and core Kubernetes concepts.
---

## Overview

The Oracle Cloud Native Environment Kubernetes Guide provides foundational Kubernetes knowledge specifically tailored for Oracle CNE users. While Oracle CNE simplifies many cluster management tasks through its CLI and catalogs, users still need to understand core Kubernetes concepts for application deployment and troubleshooting. The guide covers Kubernetes fundamentals and architecture, kubectl CLI usage and common commands, pod creation and management, deployments and ReplicaSets, services and networking, ConfigMaps and Secrets, persistent storage usage, and basic troubleshooting workflows.

## Target Audience

Application developers, DevOps engineers, and system administrators working with containerized applications on Oracle CNE. May be new to Kubernetes but familiar with containers and Linux.

## Key Documentation Features

**Oracle CNE Context:** While covering standard Kubernetes concepts, this guide maintains Oracle CNE context throughout, showing how Oracle CNE-managed clusters differ from vanilla Kubernetes where relevant.

**Practical Examples:** Every Kubernetes concept illustrated with working examples tested on Oracle CNE clusters. Examples build progressively from simple to complex.

**Troubleshooting Focus:** Significant emphasis on troubleshooting common issues developers encounter when deploying applications, with Oracle CNE-specific considerations.

## Documentation Approach

This guide serves as a bridge between Kubernetes general documentation and Oracle CNE-specific features. It assumes readers are new to Kubernetes but have container technology familiarity. The goal is to provide enough Kubernetes knowledge to be productive without attempting to replace comprehensive Kubernetes documentation.

**Solution:** Structured as a "Kubernetes for Oracle CNE Users" guide, focusing on most common tasks and concepts while providing extensive links to upstream Kubernetes documentation for deep dives.
