---
title: 'Oracle Linux: Using DTrace for System Tracing'
layout: portfolio_item
product: Oracle Linux
doc_type: Reference Guide
version: F76721-03 (May 2025)
date: '2025-05-01'
date_completed: '2025-05-01'
featured: fasle
tags:
- Reference Guide
- System Tracing
- Performance Analysis
- Oracle Linux
- DITA XML
- Documentation Modernization
tools:
- DITA XML
- Oxygen XML Editor
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/oracle-linux/dtrace-v2-guide/OL-DTRACE2-GUIDE.pdf
doc_url: https://docs.oracle.com/en/operating-systems/oracle-linux/dtrace-v2-guide/index.html
excerpt: Comprehensive reference guide for DTrace dynamic tracing tool on Oracle Linux,
  restructured using DITA XML and updated with latest features for modern eBPF-based
  implementation.
---

## Overview

Oracle Linux: Using DTrace for System Tracing is the definitive reference guide for DTrace, a powerful dynamic tracing framework for Oracle Linux with the Unbreakable Enterprise Kernel (UEK). This guide documents DTrace's complete feature set, including the D programming language, probe providers, aggregation functions, and advanced tracing capabilities for production system analysis. As the primary technical writer for the latest update (F76721-03, May 2025), I restructured the entire guide using DITA XML and incorporated documentation for the new eBPF-based DTrace implementation.

## Target Audience

Administrators, developers, and performance engineers using DTrace for system analysis and troubleshooting on Oracle Linux. Assumes familiarity with Linux system administration and performance analysis concepts.

## My Contributions

### Documentation Restructuring

Migrated legacy content to DITA XML, transforming existing documentation into structured DITA architecture. Implemented topic-based authoring by decomposing monolithic chapters into modular, reusable DITA topics. Designed information architecture creating DITA map structure optimizing content organization. Established content reuse strategy implementing conrefs and content references for multi-version documentation.

### New Feature Documentation

Documented the new eBPF-based DTrace implementation leveraging Linux kernel eBPF facilities. Updated probe providers for compatibility with modern Linux kernels. Added coverage for Oracle Linux 8, 9, and 10 with UEK 6, 7, and 8. Documented support for both x86_64 and aarch64 architectures.

### Technical Accuracy and Testing

Tested all DTrace examples on multiple Oracle Linux versions and kernel releases. Revised D programming examples for compatibility with new implementation. Validated all dtrace command options and output formats. Confirmed interaction with modern Linux tracing facilities.

## Documentation Challenges

### Challenge 1: Documenting Major Implementation Change

The new DTrace implementation represents a fundamental architectural shift from kernel patches to eBPF-based tracing. Documentation needed to explain this transition while maintaining continuity for existing users.

**Solution:** Created clear sections distinguishing the new implementation from earlier versions. Documented functional compatibility ensuring existing DTrace scripts continue working. Explained eBPF integration benefits (no kernel patches required, modern Linux integration).

### Challenge 2: DITA XML Migration from Legacy Format

The previous guide used traditional documentation formats. Migrating to DITA required restructuring content while preserving technical accuracy and completeness.

**Solution:** Analyzed existing content structure to identify natural topic boundaries. Broke monolithic chapters into concept, task, and reference topics. Established topic relationships and cross-references in DITA maps. Compared output from DITA build against original documentation to ensure no content loss.

### Challenge 3: Multi-Platform, Multi-Kernel Documentation

DTrace supports multiple Oracle Linux releases (7, 8, 9, 10) and UEK versions (6, 7, 8), each with slightly different features and requirements.

**Solution:** Implemented DITA conditional processing using ditaval filters to generate version-specific documentation. Created platform compatibility matrices showing feature availability by Oracle Linux release and UEK version.

## DITA XML Architecture

Designed DITA map structure with progressive disclosure: high-level concepts first, followed by architectural details, with clear cross-references. Used concept topics for technology explanations, task topics for step-by-step procedures, and reference topics for command syntax and parameters. Implemented conrefs for common terminology and keyrefs for platform names and version numbers.

## Technical Approach

Reviewed existing documentation and compared with new implementation features. Identified new features requiring documentation and deprecated features to remove. Created DITA topic structure and map organization. Converted legacy content to DITA topics with appropriate topic types. Wrote documentation for new eBPF-based features. Tested all D program examples on target platforms. Coordinated reviews with DTrace development team.
