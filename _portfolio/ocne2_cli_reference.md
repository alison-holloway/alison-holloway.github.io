---
title: Oracle Cloud Native Environment Release 2 - CLI Reference
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: CLI Reference
version: F96194-16
date: '2024-08-01'
date_completed: 'August 2025'
featured: false
tags:
- CLI Reference
- Command Line
- Cloud Native
- Kubernetes
tools:
- DITA XML
- Oxygen XML Editor
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/cli/OCNE-2-CLI.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/cli/
excerpt: Complete command-line interface reference for Oracle CNE, documenting all
  commands, options, arguments, and usage examples for cluster management.
---

### Overview

The Oracle Cloud Native Environment Release 2 Release Notes provide complete documentation of changes, new features, enhancements, known issues, and bug fixes for Release 2 of Oracle's Kubernetes-based cloud-native platform. Oracle CNE is a fully integrated suite for the development and management of cloud-native applications, built on open standards from the Open Container Initiative (OCI) and Cloud Native Computing Foundation (CNCF).

## Target Audience

System administrators planning Oracle CNE deployments or upgrades, DevOps engineers evaluating new capabilities, support engineers investigating customer issues, solution architects designing cloud-native infrastructure, and development teams building applications on Oracle CNE.

## Key Documentation Features

Release 2 introduces significant enhancements including new cluster provider options (libvirt, OCI, OLVM, Bring Your Own), simplified CLI-based cluster management, application catalog for cloud-native application deployment, enhanced backup and update capabilities, and improved cluster analysis and diagnostics.

### Comprehensive Coverage

Release notes must balance multiple audiences and use cases. Operations teams planning upgrades need different information depth than developers building on the platform or system administrators managing deployments. Each audience requires careful organization and clear categorization of content.

### Issue Documentation

Known issues require particularly careful documentation with clear symptom descriptions so users can identify if they're experiencing the issue, impact assessment showing severity and scope, workaround procedures with step-by-step mitigation when available, and tracking information with bug IDs for reference with Support.

### Compatibility Matrices

Release 2 introduced new deployment options with varying compatibility requirements. The release notes include detailed compatibility matrices covering supported Oracle Linux versions, Kubernetes versions, container runtime versions, storage provider compatibility, and network plugin versions.

## Documentation Challenges

### Challenge 1: Multi-Provider Documentation

Release 2 introduced multiple cluster providers (libvirt, OCI, OLVM, BYO), each with provider-specific considerations. Release notes needed to clearly identify which features, limitations, and known issues applied to which providers.

**Solution:** Implemented consistent labeling and categorization throughout the document, with provider-specific sections where differences were significant. Created comparison tables for quick reference.

### Challenge 2: Upgrade Path Clarity

Customers upgrading from Release 1.x needed clear guidance on supported upgrade paths, prerequisites, and potential breaking changes.

**Solution:** Created dedicated "Upgrade Considerations" section with step-by-step upgrade prerequisites checklist, breaking changes clearly highlighted, version-specific upgrade notes, and references to detailed upgrade procedures in the Upgrade Guide.

### Challenge 3: Rapid Release Cycle

Oracle CNE follows an active development cycle with frequent component updates. Release notes needed to track changes across multiple upstream projects (Kubernetes, container runtimes, CNI plugins).

**Solution:** Established close collaboration with engineering teams to track changes early in the development cycle. Maintained structured tracking of all component version updates and their implications.

## Technical Approach

### Early Involvement

Effective release notes begin during development, not at release time. For Release 2, I attended sprint planning and review meetings, tracked feature development in JIRA, documented new features as they were committed, and collaborated with QA on issue documentation.

### Testing and Verification

Every documented known issue and workaround was reproduced in test environments when possible, validated with engineering for accuracy, tested for completeness of workaround procedures, and reviewed with Support teams for field feedback.

### Stakeholder Review

Release notes underwent review by product management for feature completeness, engineering for technical accuracy, QA for known issues coverage, support for field issue relevance, and the documentation team for clarity and consistency.
