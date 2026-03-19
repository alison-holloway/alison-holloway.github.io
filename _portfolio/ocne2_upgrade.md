---
title: Upgrade Guide
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

The Oracle Cloud Native Environment Upgrade Guide provides complete procedures for migrating existing Oracle CNE Release 1.9 clusters to Release 2. This represents a major version upgrade with significant architectural changes, requiring careful planning and execution. The guide covers upgrade planning and impact assessment, supported upgrade paths from Release 1.9 versions, pre-upgrade prerequisites and validation, backup and rollback procedures, step-by-step upgrade execution, post-upgrade validation and testing, troubleshooting upgrade issues, and application compatibility considerations.

## Target Audience

System administrators, platform engineers, and DevOps teams responsible for maintaining production Oracle CNE environments. Requires strong understanding of both Release 1.9 and Release 2 architectures.

## Key Documentation Features

### Major Version Migration

Release 2 represents a significant architectural shift from Release 1.9 including new CLI-based management replacing Platform API and Kubernetes operators, different cluster provider model, new node image architecture (an OSTree based image named Oracle Container Host for Kubernetes, or OCK), and updated Kubernetes versions and components. The upgrade guide addresses these changes while providing clear migration paths.

### Risk Mitigation

Upgrade documentation emphasizes risk mitigation through comprehensive backup procedures before upgrade begins, validation checkpoints at each upgrade stage, rollback procedures for each phase if issues occur, and testing recommendations for pre-production validation.

### Multi-Stage Process

The upgrade is documented as a multi-stage process: assessment (evaluate current environment and upgrade readiness), preparation (backup, prerequisite installation, resource allocation), execution (phased upgrade of control plane and worker nodes), validation (comprehensive post-upgrade testing), and application migration (redeploying or reconfiguring applications for Release 2).

## Documentation Challenges

### Challenge 1: Architecture Changes

Release 2 is not a drop-in replacement for Release 1.9. There are multiple deployment options for Release 2 compared to a single option for Release 1. Upgrade planning needed to show all possible options. 

**Solution:** Created a comparison table with all possible Release 2 deployment options that link to the many upgrade paths available, each one detailed in their own chapter, and following the same structure.

### Challenge 2: Upgrade Complexity

Major version upgrades of production Kubernetes clusters carry significant risk. Customers needed confidence that upgrade procedures were thoroughly tested and that rollback options existed.

**Solution:** Documented extensive pre-upgrade validation procedures to identify potential issues before upgrade begins. Created detailed rollback procedures for each upgrade phase. Provided multiple upgrade path options based on risk tolerance (in-place upgrade vs. cluster migration).

### Challenge 3: Application Impact

Applications running on Release 1.9 clusters needed assessment for Release 2 compatibility, particularly with Kubernetes version changes. 

**Solution:** While most applications automatically updated, some needed workarounds. Provided steps to upgrade these in the Release 2 cluster, while also calling out these steps very early in the planning and preparation phases. 

