---
title: Oracle Cloud Native Environment Release 2 - Information Architecture
layout: portfolio_item
product: Oracle Cloud Native Environment
doc_type: Information Architecture
date: '2024-08-01'
date_completed: 'August 2025'
featured: true
tags:
- Information Architecture
- Documentation Strategy
- Cloud Native
- Kubernetes
- DITA XML
tools:
- DITA XML
- Oxygen XML
- Git
- Mermaid
doc_url: https://docs.oracle.com/en/operating-systems/olcne/2/
excerpt: Complete information architecture for Oracle Cloud Native Environment Release 2, encompassing 9 integrated documentation deliverables designed to support diverse user journeys across evaluation, deployment, operation, and advanced customization scenarios.
---

## Overview

The Oracle Cloud Native Environment Release 2 documentation set comprises 9 integrated books designed to support the complete lifecycle of Kubernetes cluster deployment and management. As the technical writer responsible for this documentation set, I designed the information architecture to accommodate four distinct cluster providers (libvirt, OCI, OLVM, BYO), multiple user personas with varying expertise levels, and use cases ranging from quick evaluation to production deployment and ongoing operations.

This portfolio entry documents the architectural decisions, organizational principles, and cross-referencing strategies that create a cohesive documentation experience across the complete documentation set.

## The Documentation Set

The 9 books serve distinct purposes while forming an integrated whole:

| Book | Purpose | Primary Audience |
|------|---------|------------------|
| **Release Notes** | Version-specific updates, CVEs, known issues | All users |
| **Concepts** | Architecture, components, provider comparisons | Architects, evaluators |
| **Quick Start** | Fastest path to running cluster | Developers, new users |
| **CLI Reference** | Complete command syntax and options | All users (reference) |
| **Kubernetes Clusters** | Full deployment and administration | Platform engineers, admins |
| **Applications** | Catalog and application management | DevOps, developers |
| **Kubernetes** | Platform fundamentals | Users new to Kubernetes |
| **OCK Image Builder** | Custom node image creation | Security teams, advanced users |
| **Upgrade Guide** | Release 1.x to Release 2 migration | Existing customers |

## Documentation Set Architecture

The books are organized into five functional categories that reflect how users approach the documentation:

```mermaid
flowchart TB
  subgraph Reference["Reference & Updates"]
    RN["Release Notes"]
    CLI["CLI Reference"]
  end
  subgraph Foundation["Foundation & Concepts"]
    CON["Concepts"]
    K8S["Kubernetes"]
  end
  subgraph Start["Getting Started"]
    QS["Quick Start"]
  end
  subgraph Core["Core Operations"]
    KC["Kubernetes Clusters"]
    APP["Applications"]
  end
  subgraph Advanced["Advanced & Specialized"]
    OCK["OCK Image Builder"]
    UPG["Upgrade Guide"]
  end
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  class APP,CLI,CON,K8S,KC,OCK,QS,RN,UPG chapter;
```

## Information Flow

This diagram shows how users navigate between books based on their needs:

```mermaid
flowchart LR
  subgraph Entry["Entry Points"]
    RN["Release Notes"]
    QS["Quick Start"]
    CON["Concepts"]
  end
  subgraph Core["Core Documentation"]
    KC["Kubernetes<br/>Clusters"]
    CLI["CLI Reference"]
    APP["Applications"]
  end
  subgraph Support["Supporting Guides"]
    K8S["Kubernetes"]
    OCK["OCK Image<br/>Builder"]
    UPG["Upgrade"]
  end
  RN -->|"what's new"| KC
  RN -->|"known issues"| CLI
  QS -->|"production deployment"| KC
  CON -->|"understand architecture"| KC
  CON -->|"provider selection"| KC
  KC <-->|"command syntax"| CLI
  KC -->|"deploy apps"| APP
  APP <-->|"catalog commands"| CLI
  KC -->|"k8s basics"| K8S
  KC -->|"custom images"| OCK
  KC <-->|"R1 migration"| UPG
  APP -->|"k8s concepts"| K8S
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  class APP,CLI,CON,K8S,KC,OCK,QS,RN,UPG chapter;
  linkStyle 0,1,2,3,4,5,6,7,8,9,10,11 stroke:#235789,stroke-width:3px;
```

## User Journeys

The information architecture supports several common reader journeys through the documentation set.

### Journey 1: Quick Evaluation

**Persona:** Developer or DevOps engineer evaluating Oracle CNE for a project.

**Goal:** Get a working Kubernetes cluster as fast as possible.

```mermaid
flowchart LR
  Start([Start]) --> QS["Quick Start<br/>Ch 1-9"]
  QS --> APP["Applications<br/>Install App"]
  APP --> Done([Running Cluster<br/>+ Application])
  APP -.->|"explore"| CON["Concepts"]
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
```

**Path:** Quick Start (complete) → Applications (deploy sample app) → Concepts (optional exploration)

### Journey 2: Production OCI Deployment

**Persona:** Platform engineer deploying production Kubernetes on Oracle Cloud Infrastructure.

**Goal:** Deploy a production-ready, highly-available cluster on OCI.

```mermaid
flowchart TB
  Start([Start]) --> RN["Release Notes<br/>Check compatibility"]
  RN --> CON["Concepts<br/>Ch 3: OCI Provider"]
  CON --> CLI["CLI Reference<br/>Ch 1, 3: Install & Config"]
  CLI --> KC["Kubernetes Clusters<br/>Ch 2, 3, 7: OCI Deployment"]
  KC --> APP["Applications<br/>Production setup"]
  APP --> Done([Production<br/>OCI Cluster])
  KC -.->|"ongoing"| KC10["Kubernetes Clusters<br/>Ch 10: Admin"]
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
```

**Path:** Release Notes → Concepts (OCI architecture) → CLI (installation, OCI config) → Kubernetes Clusters (OCI deployment) → Applications

### Journey 3: Upgrade from Release 1.x

**Persona:** System administrator migrating existing Release 1 clusters to Release 2.

**Goal:** Successfully migrate production clusters with minimal downtime.

```mermaid
flowchart TB
  Start([R1 Cluster]) --> RN["Release Notes<br/>Breaking changes"]
  RN --> UPG1["Upgrade Guide<br/>Ch 1-2: Prerequisites"]
  UPG1 --> KC["Kubernetes Clusters<br/>Ch 10: Backup"]
  KC --> UPG2["Upgrade Guide<br/>Ch 3-6: Execute"]
  UPG2 --> UPG3["Upgrade Guide<br/>Ch 7-9: Validate"]
  UPG3 --> CLI["CLI Reference<br/>Learn new CLI"]
  CLI --> Done([R2 Cluster])
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
```

**Path:** Release Notes (breaking changes) → Upgrade Guide (prerequisites) → Kubernetes Clusters (backup) → Upgrade Guide (execute, validate) → CLI Reference (new commands)

### Journey 4: Custom Node Images

**Persona:** Security or platform team creating hardened node images.

**Goal:** Build custom OCK images meeting corporate security standards.

```mermaid
flowchart LR
  Start([Requirements]) --> CON["Concepts<br/>Ch 2: OCK Architecture"]
  CON --> KC1["Kubernetes Clusters<br/>Ch 3: Image Options"]
  KC1 --> OCK["OCK Image Builder<br/>Ch 1-4: Build Custom"]
  OCK --> KC2["Kubernetes Clusters<br/>Deploy with Custom Image"]
  KC2 --> Done([Hardened Cluster])
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
```

**Path:** Concepts (OCK architecture) → Kubernetes Clusters (image options) → OCK Image Builder (build custom) → Kubernetes Clusters (deploy)

### Journey 5: Day-2 Operations

**Persona:** SRE or operations engineer maintaining production clusters.

**Goal:** Ongoing cluster maintenance including updates, scaling, backups, and troubleshooting.

```mermaid
flowchart TB
  subgraph DayTwo["Day-2 Operations Hub"]
    KC10["Kubernetes Clusters<br/>Ch 10: Administration"]
  end
  CLI["CLI Reference<br/>Command syntax"] <--> KC10
  RN["Release Notes<br/>Patches & issues"] <--> KC10
  K8S["Kubernetes<br/>App troubleshooting"] <--> KC10
  APP["Applications<br/>App updates"] <--> KC10
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  class KC10 chapter;
```

**Pattern:** Kubernetes Clusters Chapter 10 serves as the operations hub, with frequent cross-references to CLI Reference, Release Notes, Kubernetes guide, and Applications.

## Architectural Principles

### Task-Based Organization

Each book focuses on specific user tasks rather than feature-based organization. Users can locate content by what they want to accomplish, not by which product component implements the feature.

### Progressive Disclosure

The documentation set provides layered depth:
- **Quick Start** — Fastest path, minimal explanation
- **Concepts** — Why things work the way they do
- **Kubernetes Clusters** — Complete procedural depth
- **CLI Reference** — Exhaustive detail for every option

### Parallel Structure Across Providers

Chapters 5-8 of Kubernetes Clusters follow identical organization for each provider:
1. Setup
2. Create Cluster
3. Connect
4. Scale
5. Upgrade
6. Delete

This parallel structure allows users to transfer knowledge between providers and simplifies maintenance when procedures change across all providers.

### Separation of Reference and Procedural Content

- Configuration options documented separately from procedures (Chapter 2 vs. Chapters 5-8)
- CLI commands documented in CLI Reference, invoked from task guides
- Enables quick lookup without navigating through procedures

### Multiple Entry Points

Different users enter the documentation set at different points:
- **New users:** Quick Start
- **Evaluators:** Concepts
- **Experienced admins:** Kubernetes Clusters
- **Existing customers:** Release Notes, Upgrade Guide

## Cross-Reference Strategy

Effective cross-referencing ensures users can navigate the complete set without getting lost or hitting dead ends.

### Cross-Reference Matrix

| From | To | Purpose |
|------|-----|---------|
| Release Notes | All guides | Feature details, procedure locations |
| Quick Start | Kubernetes Clusters | Production deployment |
| Concepts | Kubernetes Clusters | Procedural implementation |
| Kubernetes Clusters | CLI Reference | Command syntax |
| Kubernetes Clusters | Applications | Post-deployment |
| Applications | CLI Reference | Catalog commands |
| Kubernetes Clusters | OCK Image Builder | Custom images |
| All guides | Kubernetes | Platform fundamentals |
| Upgrade Guide | Kubernetes Clusters, CLI | Post-upgrade operations |

### Cross-Reference Visualization

```mermaid
flowchart TB
  RN["Release Notes"]
  CON["Concepts"]
  QS["Quick Start"]
  CLI["CLI Reference"]
  KC["Kubernetes Clusters"]
  APP["Applications"]
  K8S["Kubernetes"]
  OCK["OCK Image Builder"]
  UPG["Upgrade Guide"]
  RN -.-> CON
  RN -.-> KC
  RN -.-> UPG
  QS --> KC
  CON --> KC
  KC <--> CLI
  KC --> APP
  APP <--> CLI
  KC --> OCK
  KC --> K8S
  APP --> K8S
  UPG --> KC
  UPG --> CLI
  classDef chapter fill:#fff,stroke:#F1D302,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  classDef workflowNode fill:#fff,stroke:#C1292E,stroke-width:2px,color:#235789,font-size:16px,font-weight:bold;
  class APP,CLI,CON,K8S,KC,OCK,QS,RN,UPG chapter;
  linkStyle 3,4,5,6,7,8,9,10,11,12 stroke:#235789,stroke-width:3px;
  linkStyle 0,1,2 stroke:#F1D302,stroke-width:2.5px,stroke-dasharray:6,5;
```

The **Kubernetes Clusters** guide serves as the central hub of the documentation set, with the most incoming and outgoing cross-references.

## Documentation Challenges and Solutions

### Challenge 1: Four Provider Models

Oracle CNE supports libvirt, OCI, OLVM, and BYO providers with fundamentally different prerequisites, capabilities, and procedures.

**Solution:** Created provider-agnostic foundational content (Concepts, configuration principles) with provider-specific chapters using parallel structure. Comparison matrices help users choose providers. DITA conditional processing enables shared content where procedures overlap.

### Challenge 2: Multiple Expertise Levels

Users range from Kubernetes novices to experienced platform engineers.

**Solution:** Layered documentation architecture:
- Quick Start for beginners (assumes no Kubernetes knowledge)
- Kubernetes guide for platform fundamentals
- Kubernetes Clusters for experienced administrators
- OCK Image Builder for advanced customization

### Challenge 3: Complete Lifecycle Coverage

Documentation must support initial deployment through ongoing operations and eventual upgrade or migration.

**Solution:** Organized by lifecycle stage with clear pathways:
- **Evaluation:** Quick Start + Concepts
- **Deployment:** Kubernetes Clusters
- **Operations:** Kubernetes Clusters Ch 10 + Applications
- **Migration:** Upgrade Guide

### Challenge 4: Coherence Across 9 Books

Maintaining consistent terminology, cross-references, and organization across nearly 1,000 pages required systematic approach.

**Solution:**
- DITA key definitions for product names, versions, URLs
- Consistent chapter numbering conventions
- Parallel structure patterns (provider chapters)
- Regular cross-reference audits
- Style guide enforcement

## DITA Implementation

### Content Reuse Mechanisms

- **Keydefs:** Product names, version numbers, URLs managed centrally
- **Conrefs:** Shared warnings, prerequisites, and standard notes
- **Conditional Processing:** Provider-specific content filtered using DITAVAL
- **Relationship Tables:** Managed cross-references between books

### Topic Type Strategy

| Type | Usage | Examples |
|------|-------|----------|
| **Concept** | Architecture, design rationale | Provider introductions, configuration concepts |
| **Task** | Step-by-step procedures | Creating clusters, scaling nodes |
| **Reference** | Structured data, options | Configuration file options, CLI syntax |

## Target Audience

This portfolio entry demonstrates:

- **Information architecture design** for complex, multi-deliverable documentation sets
- **User journey mapping** across documentation boundaries
- **Content strategy** for technical products with multiple deployment models
- **DITA XML architecture** for enterprise documentation
- **Cross-reference planning** to create cohesive user experiences
