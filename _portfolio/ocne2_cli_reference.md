---
title: CLI Reference
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: CLI Reference
version: F96194-18
date: '2024-08-01'
date_completed: 'August 2025'
tools:
- DITA XML
- Oxygen XML Editor
- Git
pdf_url: https://docs.oracle.com/en/operating-systems/olcne/2/cli/OCNE-2-CLI.pdf
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/cli/
excerpt: Complete command-line interface reference for the ocne tool, documenting
  installation, configuration, and all commands for Kubernetes cluster lifecycle management
  in Oracle Cloud Native Environment.
---

## Overview

The Oracle Cloud Native Environment CLI Reference documents the `ocne` command-line tool, the single interface for creating and managing Kubernetes clusters in Oracle CNE. The book covers installation on Oracle Linux 8 and 9, CLI usage conventions, a three-layer configuration system, and a complete reference for every command and subcommand.

## Target Audience

System administrators, DevOps engineers, and platform operators who deploy and manage Kubernetes clusters using Oracle CNE. Readers are expected to be comfortable with Linux administration and have a working knowledge of Kubernetes concepts.

## Documentation Scope

The reference is structured across four chapters:

- **Installing the CLI:** Prerequisites and installation via Oracle Linux Yum Server or Unbreakable Linux Network (ULN) on Oracle Linux 8 and 9
- **Using the CLI:** Syntax help, prefix matching for abbreviated commands, shell completion (bash, zsh, fish, PowerShell), and supported environment variables
- **Configuration Files:** A three-layer hierarchy: global defaults file (`~/.ocne/defaults.yaml`), per-cluster YAML files, and command-line flags, with worked examples for common provider configurations
- **CLI Command Reference:** Full reference for all command groups and subcommands

## Commands Documented

The reference covers five command groups and two standalone commands:

| Command | Subcommands | Purpose |
|---------|-------------|---------|
| `ocne application` | install, list, show, template, uninstall, update | Application lifecycle management |
| `ocne catalog` | add, copy, get, list, mirror, remove, search | Application catalog and private registry management |
| `ocne cluster` | analyze, backup, console, delete, dump, info, join, list, show, stage, start, template | Full Kubernetes cluster lifecycle |
| `ocne completion` | bash, zsh, fish, powershell | Shell completion generation |
| `ocne image` | create, upload | OCK image creation and upload |
| `ocne node` | update | Node-level OCK image updates |
| `ocne info` | — | Environment variable state and version information |

## Documentation Challenges

### Challenge 1: Four Deployment Providers

The `ocne cluster start` command supports four distinct providers: libvirt, OCI, OLVM, and Bring Your Own, each with different configuration options, prerequisites, and constraints. The configuration file chapter alone covers provider-specific sections for all four, with fields ranging from libvirt storage pool and network settings to full oVirt API server configuration for OLVM.

**Solution:** Documented all providers within a unified chapter structure, using consistent field naming conventions and worked configuration examples for each provider. Clear provider labels throughout avoid ambiguity about which options apply where.

### Challenge 2: Three-Layer Configuration System

The CLI uses a priority hierarchy where global defaults, cluster config files, and command-line flags can all set the same options. Users needed to understand precedence rules and know which layer to use for each type of setting.

**Solution:** Introduced the configuration system with an explicit layered model before diving into individual options. Documented all global defaults fields in a single reference table, with cross-references to the provider-specific sections and cluster start command for flags that correspond.

### Challenge 3: Living Reference Across Releases

As a CLI reference for an actively developed product, every release can change command flags, add subcommands, or modify configuration options. Keeping the reference synchronized with the product while also managing accumulated updates across many revision cycles requires disciplined source management.

**Solution:** Maintained close collaboration with engineering to track CLI changes early in each development cycle. Used DITA XML conrefs and conditional attributes to manage provider-specific content efficiently, reducing the risk of inconsistency across related topics.

## Technical Approach

### Hands-On Verification

CLI reference accuracy depends on testing every command. All documented commands, flags, and configuration options were verified against the actual CLI, with special attention to default values and flag interactions that are easy to mis-document from engineering specs alone.

### Consistent Formatting

Reference content requires rigid structural consistency so users can scan quickly. Every command topic follows the same pattern: purpose, syntax, options table, and examples.

### Single Sourcing

The CLI reference is designed to complement rather than duplicate the procedural guides. Commands are documented with their options and syntax; the Kubernetes Clusters guide contains the step-by-step deployment procedures that call those commands in context. The syntax and examples included in other documents, like the Kubernetes Clusters guide, are almost all single sourced from the CLI reference!
