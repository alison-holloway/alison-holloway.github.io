---
title: Oracle Cloud Native Environment Release 2 - CLI Reference
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: CLI Reference
version: Release 2
date: '2024-08-01'
date_completed: '2024-08-01'
featured: true
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

## Overview

The Oracle Cloud Native Environment CLI Reference provides comprehensive documentation for the `ocne` command-line interface, the primary tool for creating, managing, and maintaining Kubernetes clusters on Oracle CNE.

## Documentation Scope

- Complete command syntax and options for all `ocne` commands
- Installation and configuration procedures
- Subcommand reference with detailed parameter descriptions
- Configuration file reference and examples
- Usage examples for common workflows
- Error messages and troubleshooting

## Key Documentation Features

**Structured Reference Format:** Each command documented with consistent structure:
- Synopsis (command syntax)
- Description
- Required and optional parameters
- Examples
- Related commands
- Return codes and error handling

**Working Examples:** Every command includes tested, working examples showing real-world usage patterns. Examples progress from simple to complex use cases.

**Configuration File Documentation:** Complete reference for YAML configuration files used with cluster creation, including all supported options and their effects.

## Documentation Challenges

### Challenge: Rapid Command Evolution

Release 2 represented a significant CLI redesign from Release 1.x. The new CLI introduced provider-based architecture with different command patterns for each provider (libvirt, OCI, OLVM, BYO).

**Solution:** Established close collaboration with engineering during CLI development to document commands as they were implemented. Created modular documentation structure that could accommodate new commands and providers as they were added.

### Challenge: Parameter Combinations

Many `ocne` commands have complex parameter interactions where certain options are required or prohibited depending on other options. Traditional command reference formats struggle to express these relationships clearly.

**Solution:** Developed comprehensive parameter tables showing relationships and constraints. Added conditional examples demonstrating when to use specific parameter combinations. Included common error scenarios with explanations.

## Documentation Process

- **Command Testing:** Every documented command and example tested in actual Oracle CNE environments
- **Output Validation:** Captured real command output to show users what to expect
- **Error Documentation:** Reproduced common error conditions to document error messages and resolutions
- **Engineering Review:** All command documentation reviewed by developers for technical accuracy

## Target Audience

System administrators, DevOps engineers, and automation developers who create and manage Oracle CNE clusters. Assumes Linux command-line proficiency.

## Related Documentation

- Quick Start Guide (introductory CLI usage)
- Kubernetes Clusters Guide (cluster management workflows)
- Concepts Guide (architectural context for CLI operations)
