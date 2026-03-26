---
title: Release Notes
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: Release Notes
version: F96191-10
date: '2024-08-01'
date_completed: '2024-08-01'
tools:
- DITA XML
- Oxygen XML Editor
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/relnotes/OCNE-2-RELNOTES.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/relnotes/
excerpt: Comprehensive release notes documenting new features, enhancements, known
  issues, and resolved bugs for Oracle Cloud Native Environment Release 2.
---

## Overview

The Oracle Cloud Native Environment (Oracle CNE) Release 2 Release Notes provide complete documentation of changes, new features, enhancements, known issues, and bug fixes for Release 2 of Oracle's Kubernetes-based cloud-native platform.

Oracle CNE is a fully integrated suite for the development and management of cloud-native applications, built on open standards from the Open Container Initiative (OCI) and Cloud Native Computing Foundation (CNCF).

## Target Audience

These release notes serve:
- **System Administrators** planning Oracle CNE deployments or upgrades
- **DevOps Engineers** evaluating new capabilities
- **Support Engineers** investigating customer issues
- **Solution Architects** designing cloud-native infrastructure
- **Development Teams** building applications on Oracle CNE

## Documentation Scope

These release notes cover:

- **What's New:** Major new features and capabilities in Release 2
- **Enhanced Features:** Improvements to existing functionality
- **Deprecated Features:** Features marked for future removal
- **Known Issues:** Documented limitations and workarounds
- **Documentation Changes:** Major changes to the documentation set

## Key Features Documented

Release 2 introduces significant enhancements including:

- New cluster provider options (libvirt, OCI, OLVM, Bring Your Own)
- Simplified CLI-based cluster management
- Application catalog for cloud-native application deployment
- Enhanced backup and update capabilities
- Improved cluster analysis and diagnostics

## Documentation Approach

### Comprehensive Coverage

Release notes must balance multiple audiences and use cases:
- Operations teams planning upgrades
- Developers building on the platform
- System administrators managing deployments
- Solution architects evaluating the platform

Each audience needs different information depth and focus, requiring careful organization and clear categorization of content.

### Issue Documentation

Known issues require particularly careful documentation:
- **Clear symptom description** - Users must be able to identify if they're experiencing the issue
- **Impact assessment** - Severity and scope of the problem
- **Workaround procedures** - Step-by-step mitigation when available
- **Tracking information** - Bug IDs for reference with Support

## Documentation Process

### Early Involvement

Effective release notes begin during development, not at release time. For Release 2:
- Attended sprint planning and review meetings
- Tracked feature development in JIRA
- Documented new features as they were committed
- Collaborated with QA on issue documentation

### Testing and Verification

Every documented known issue and workaround was:
- Reproduced in test environments when possible
- Validated with engineering for accuracy
- Tested for completeness of workaround procedures
- Reviewed with Support teams for field feedback

### Stakeholder Review

Release notes underwent review by:
- Product Management (for feature completeness)
- Engineering (for technical accuracy)
- QA (for known issues coverage)
- Support (for field issue relevance)
- Documentation team (for clarity and consistency)

## Documentation Integration

Release notes integrate with the complete Oracle CNE documentation set:
- Links to detailed feature documentation in Concepts guide
- Cross-references to procedures in Quick Start and Clusters guides
- References to upgrade procedures in Upgrade guide
- Connections to CLI reference documentation

## Tools and Technologies

- **Authoring:** DITA XML in Oxygen XML Editor
- **Version Control:** Git for tracking documentation changes across releases
- **Issue Tracking:** JIRA for coordinating with engineering and QA
- **Testing:** Oracle Linux environments with multiple provider configurations
- **Validation:** Collaboration with engineering, QA, and Support teams

