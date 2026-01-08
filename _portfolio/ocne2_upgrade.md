---
title: Oracle Cloud Native Environment Release 2 - Upgrade Guide
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: Upgrade Guide
version: F96199-04
date: '2024-08-01'
date_completed: 'August 2025'
featured: false
tags:
- Upgrade
- Migration
- Kubernetes
- Cloud Native
tools:
- DITA XML
- Oxygen XML Editor
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/upgrade/OCNE-2-UPGRADE.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/upgrade/
excerpt: Comprehensive procedures for upgrading from Oracle CNE Release 1.9 to Release
  2, including planning, prerequisites, upgrade execution, and post-upgrade validation.
---

## Overview

The Oracle Cloud Native Environment Upgrade Guide provides complete procedures for migrating existing Oracle CNE Release 1.x clusters to Release 2. This represents a major version upgrade with significant architectural changes, requiring careful planning and execution. The guide covers upgrade planning and impact assessment, supported upgrade paths from Release 1.x versions, pre-upgrade prerequisites and validation, backup and rollback procedures, step-by-step upgrade execution, post-upgrade validation and testing, troubleshooting upgrade issues, and application compatibility considerations.

## Target Audience

System administrators, platform engineers, and DevOps teams responsible for maintaining production Oracle CNE environments. Requires strong understanding of both Release 1.x and Release 2 architectures.

## Key Documentation Features

### Major Version Migration

Release 2 represents a significant architectural shift from Release 1.x including new CLI-based management replacing Platform API and Kubernetes operators, different cluster provider model, new node image architecture (OCK), and updated Kubernetes versions and components. The upgrade guide addresses these breaking changes while providing clear migration paths.

### Risk Mitigation

Upgrade documentation emphasizes risk mitigation through comprehensive backup procedures before upgrade begins, validation checkpoints at each upgrade stage, rollback procedures for each phase if issues occur, and testing recommendations for pre-production validation.

### Multi-Stage Process

The upgrade is documented as a multi-stage process: assessment (evaluate current environment and upgrade readiness), preparation (backup, prerequisite installation, resource allocation), execution (phased upgrade of control plane and worker nodes), validation (comprehensive post-upgrade testing), and application migration (redeploying or reconfiguring applications for Release 2).

## Documentation Challenges

### Challenge 1: Breaking Changes

Release 2 is not a drop-in replacement for Release 1.x. The CLI replaces the Platform API, requiring documentation of completely different management workflows.

**Solution:** Created comprehensive mapping documentation showing Release 1.x operations and their Release 2 equivalents. Provided side-by-side comparison of old vs. new workflows to aid in transition planning.

### Challenge 2: Upgrade Complexity

Major version upgrades of production Kubernetes clusters carry significant risk. Customers needed confidence that upgrade procedures were thoroughly tested and that rollback options existed.

**Solution:** Documented extensive pre-upgrade validation procedures to identify potential issues before upgrade begins. Created detailed rollback procedures for each upgrade phase. Provided multiple upgrade path options based on risk tolerance (in-place upgrade vs. cluster migration).

### Challenge 3: Application Impact

Applications running on Release 1.x clusters needed assessment for Release 2 compatibility, particularly with Kubernetes version changes.

**Solution:** Developed application compatibility assessment checklist. Documented common application migration patterns. Provided guidance on testing applications in pre-production Release 2 environments before upgrading production.

## Technical Approach

Every upgrade scenario documented was tested in lab environments including upgrades from multiple Release 1.x starting versions, various cluster sizes and configurations, different application workloads, and failure scenario testing with rollback validation. Created Terraform/Ansible scripts for pre-upgrade environment validation, test cluster provisioning for upgrade practice, and post-upgrade validation automation.
