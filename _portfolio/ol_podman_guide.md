---
title: Oracle Linux Podman User's Guide
layout: portfolio_item
product: Oracle Linux Podman
doc_type: User Guide
version: F30921-28 (December 2025)
date: '2025-12-01'
date_completed: '2025-12-01'
featured: false
tags:
- User Guide
- Containers
- Podman
- Kubernetes
- Oracle Linux
- DITA XML
tools:
- DITA XML
- Oxygen XML
- Git
- Podman
- Buildah
- Skopeo
pdf_url: https://docs.oracle.com/en/operating-systems/oracle-linux/podman/OL-PODMAN.pdf
doc_url: https://docs.oracle.com/en/operating-systems/oracle-linux/podman/index.html
excerpt: Comprehensive user guide for Podman container management on Oracle Linux,
  restructured with DITA XML and updated with Oracle Linux 10 support, new Kubernetes
  integration chapter, and extensively revised content for modern container workflows.
---

## Overview

*Oracle Linux Podman User's Guide* is the definitive documentation for Podman, the daemonless container engine for managing OCI-compliant containers and images on Oracle Linux. This guide covers Podman's complete feature set along with companion tools Buildah (for advanced image building) and Skopeo (for remote image management).

As the primary technical writer for the December 2025 update (F30921-28), I led a major modernization effort that restructured the guide using DITA XML, added comprehensive Oracle Linux 10 coverage, wrote new content for Kubernetes integration, and significantly rewrote multiple chapters to reflect current best practices and new features.

## My Recent Contributions (2025 Update)

### DITA XML Restructuring

- **Complete migration to DITA XML** - Transformed entire guide from legacy format to structured DITA architecture
- **Topic-based authoring implementation** - Decomposed content into modular concept, task, and reference topics
- **Information architecture redesign** - Created logical DITA map structure optimizing content flow and navigation
- **Content reuse framework** - Established conrefs and content references for multi-version documentation

### New Chapter: Kubernetes Integration

- **Wrote comprehensive "podman kube" chapter** - Complete documentation for Kubernetes YAML generation and deployment
- **Kubernetes manifest creation** - Detailed procedures for generating Kubernetes-compatible YAML from Podman pods
- **Bidirectional workflows** - Documented both exporting Podman pods to Kubernetes and running Kubernetes YAML with Podman
- **PersistentVolumeClaim handling** - Explained volume management between Podman and Kubernetes
- **Testing procedures** - How to use Podman to test Kubernetes manifests before cluster deployment

### Oracle Linux 10 Integration

- **Platform update** - Added complete installation and usage procedures for Oracle Linux 10
- **UEK compatibility** - Documented Podman support with Unbreakable Enterprise Kernel 8
- **Version-specific content** - Created conditional content for Oracle Linux 7, 8, 9, and 10 differences
- **Testing validation** - Verified all procedures on Oracle Linux 10 release

### Major Content Rewrites

**Buildah Chapter:**
- Complete rewrite focusing on advanced image building scenarios
- Updated for current Buildah feature set and best practices
- New examples demonstrating Buildah advantages over `podman build`
- Expanded coverage of Containerfile processing and optimization
- Integration with CI/CD pipelines and automation workflows

**Skopeo Chapter:**
- Comprehensive revision for remote registry management
- Updated commands and options for current Skopeo release
- New use cases for bulk operations and registry migration
- Image inspection and validation procedures
- Registry authentication and security considerations

**Podman Quadlets:**
- Extensive rewrite of systemd integration using Quadlets
- Modern approach to running containers as systemd services
- Configuration examples for production deployments
- Startup dependencies and service ordering
- Conversion from older `podman generate systemd` method

**Private Container Registries:**
- Major expansion of registry deployment and management
- Step-by-step procedures for setting up private registries
- Authentication and access control configuration
- TLS/SSL certificate management
- Integration with organizational container workflows
- Registry maintenance and troubleshooting

### Comprehensive Testing and Updates

- **Complete procedure validation** - Tested every command and procedure on Oracle Linux 8, 9, and 10
- **Command syntax updates** - Revised all commands for current Podman, Buildah, and Skopeo releases
- **Output verification** - Updated command output examples to match current versions
- **Broken link fixes** - Identified and corrected outdated external references
- **Screenshot updates** - Captured new screenshots where UI or output changed
- **Error correction** - Fixed technical inaccuracies discovered during testing

## Documentation Scope

The guide provides comprehensive coverage of the Podman ecosystem:

### Podman Fundamentals
- **Introduction to Podman** - Daemonless architecture, OCI compliance, Docker compatibility
- **Installation and setup** - Package installation on Oracle Linux 7, 8, 9, and 10
- **Basic container operations** - Running, managing, and inspecting containers
- **Storage configuration** - Overlay2 driver, storage locations, quota management
- **Rootless containers** - Running containers without root privileges

### Container Image Management
- **Working with images** - Pulling, listing, inspecting, and removing images
- **Image creation** - Building images from Containerfiles
- **Image optimization** - Multi-stage builds, layer caching strategies
- **Registry integration** - Docker Hub, Oracle Container Registry, private registries

### Advanced Podman Features
- **Pod management** - Creating and managing multi-container pods
- **Networking** - Container networking, port mapping, network isolation
- **Volume management** - Persistent data with bind mounts and volumes
- **Resource constraints** - CPU, memory, and I/O limitations
- **Health checks** - Container health monitoring and automatic restart

### Kubernetes Integration (New Chapter)
- **podman kube play** - Running Kubernetes YAML manifests with Podman
- **podman kube generate** - Creating Kubernetes YAML from Podman pods
- **Testing Kubernetes manifests** - Local validation before cluster deployment
- **PersistentVolumeClaim handling** - Volume configuration for Kubernetes compatibility
- **Migration strategies** - Moving workloads between Podman and Kubernetes

### Buildah for Advanced Image Building
- **Buildah fundamentals** - Purpose and advantages over podman build
- **Container creation** - Building from scratch or base images
- **Customization options** - Fine-grained control over image construction
- **Working containers** - Interactive modification during build
- **Image optimization** - Techniques for minimal, secure images
- **CI/CD integration** - Automated image building in pipelines

### Skopeo for Registry Management
- **Image inspection** - Examining remote images without downloading
- **Image copying** - Moving images between registries
- **Bulk operations** - Managing multiple images efficiently
- **Registry authentication** - Credential management for multiple registries
- **Image signing and verification** - Security and trust management

### Systemd Integration with Quadlets
- **Container services** - Running containers as systemd units
- **Quadlet configuration** - Modern declarative service definitions
- **Service dependencies** - Ordering and requirement management
- **Auto-update** - Automatic container updates with Podman auto-update
- **Production deployment patterns** - Best practices for container services

### Private Container Registries
- **Registry deployment** - Setting up private registry infrastructure
- **Authentication configuration** - User management and access control
- **TLS/SSL setup** - Secure registry communication
- **Storage backend configuration** - Registry storage options
- **Integration workflows** - Incorporating private registries in development pipelines
- **Maintenance and monitoring** - Registry health and performance

### Security and Best Practices
- **Rootless operation** - Security benefits and configuration
- **SELinux integration** - Container security with SELinux
- **User namespaces** - UID/GID mapping for isolation
- **Secrets management** - Handling sensitive data in containers
- **Security scanning** - Image vulnerability assessment

## Documentation Challenges

### Challenge 1: DITA Migration While Maintaining Currency

Restructuring to DITA XML while simultaneously updating for Oracle Linux 10 and new features created complex coordination requirements.

**Solution:** Implemented phased approach—first migrated existing content to DITA establishing topic structure, then systematically updated topics with new content. Used DITA's conditional processing to manage version-specific content from the start, preventing separate documentation branches.

### Challenge 2: Kubernetes Integration Documentation

The new `podman kube` functionality bridges two ecosystems (Podman and Kubernetes) with different mental models and terminology. Documentation needed to serve users familiar with one but not the other.

**Solution:** Created chapter that introduces Kubernetes concepts as needed for Podman users, without assuming Kubernetes expertise. Provided parallel examples showing same operations in both Podman-native and Kubernetes manifest approaches. Included complete working examples that users can immediately test.

### Challenge 3: Rapidly Evolving Container Technology

Podman, Buildah, and Skopeo undergo frequent updates with new features, changed defaults, and occasional breaking changes.

**Solution:** Established systematic testing framework covering all documented procedures across supported Oracle Linux versions. Maintained test environment matrices (OL 8/9/10 × UEK versions × Podman versions). Documented version-specific behaviors using DITA conditional processing where needed.

### Challenge 4: Balancing Depth and Accessibility

Guide serves multiple audiences from container newcomers to experienced users migrating from Docker or exploring advanced features.

**Solution:** Structured guide with progressive complexity. Basic chapters assume minimal container knowledge with step-by-step procedures. Advanced chapters (Buildah, Quadlets, private registries) assume foundation understanding. Used "See Also" cross-references extensively to guide readers to prerequisite or related content.

### Challenge 5: Integration of Three Related Tools

Podman, Buildah, and Skopeo overlap functionally but serve different purposes. Documentation needed clear guidance on when to use which tool.

**Solution:** Created decision matrices and tool comparison sections. Each tool chapter begins with "When to Use This Tool" guidance. Provided workflow examples showing tools in context (e.g., Buildah builds image, Skopeo inspects and copies, Podman runs). Maintained consistent command pattern documentation across tools.

## DITA XML Architecture

### Information Architecture

**DITA Map Structure:**
```
podman-guide.ditamap
├── Introduction
│   ├── About Podman (concept)
│   ├── About Buildah (concept)
│   ├── About Skopeo (concept)
├── Getting Started
│   ├── Installing Podman (task)
│   ├── Basic Container Operations (task)
│   └── Configuration (reference)
├── Working with Images
│   ├── Image Concepts (concept)
│   ├── Pulling and Managing Images (task)
│   └── Building Images (task)
├── Container Management
│   ├── Running Containers (task)
│   ├── Managing Container Lifecycle (task)
│   └── Resource Management (task)
├── Pod Management
│   ├── Pod Concepts (concept)
│   └── Creating and Managing Pods (task)
├── Kubernetes Integration (NEW)
│   ├── podman kube Overview (concept)
│   ├── Generating Kubernetes YAML (task)
│   ├── Running Kubernetes Manifests (task)
│   └── Testing Kubernetes Deployments (task)
├── Building Images With Buildah (MAJOR REWRITE)
│   ├── When to Use Buildah (concept)
│   ├── Buildah Fundamentals (concept)
│   ├── Building From Scratch (task)
│   └── Advanced Techniques (task)
├── Using Skopeo (MAJOR REWRITE)
│   ├── When to Use Skopeo (concept)
│   ├── Inspecting Remote Images (task)
│   └── Copying Between Registries (task)
├── Systemd Integration (MAJOR REWRITE - Quadlets)
│   ├── Quadlet Overview (concept)
│   ├── Creating Quadlet Files (task)
│   └── Managing Container Services (task)
├── Private Container Registries (MAJOR REWRITE)
│   ├── Registry Deployment (task)
│   ├── Authentication Setup (task)
│   ├── TLS Configuration (task)
│   └── Registry Maintenance (task)
├── Networking
├── Storage and Volumes
└── Security
```

### Content Reuse Strategy

- **Common concepts:** Conrefs for container, image, pod definitions used consistently
- **Platform specifics:** Conditional content for Oracle Linux 7/8/9/10 differences
- **Command syntax:** Keyrefs for command names, enabling easy version updates
- **Cross-tool references:** Reusable topics explaining relationships between Podman, Buildah, Skopeo

### DITA Topic Types

- **Concept topics:** Technology explanations, architectural overviews
- **Task topics:** Step-by-step procedures with prerequisites and verification
- **Reference topics:** Command syntax, configuration parameters, API details
- **Troubleshooting topics:** Common problems and solutions

## Technical Validation Process

### Testing Methodology

1. **Platform matrix testing**
   - Oracle Linux 8.10 with UEK R7
   - Oracle Linux 9.5 with UEK R7
   - Oracle Linux 10.0 with UEK R8

2. **Procedure validation**
   - Execute every documented command
   - Verify output matches documentation
   - Test error conditions and troubleshooting steps
   - Confirm expected outcomes achieved

3. **Example verification**
   - Run all code examples and scripts
   - Test with multiple container images
   - Validate Kubernetes manifests with actual clusters
   - Confirm private registry examples work end-to-end

4. **Version compatibility**
   - Test with current Podman stable release (5.x)
   - Verify Buildah and Skopeo compatibility
   - Validate interaction with Kubernetes 1.28+
   - Test registry compatibility (Docker Registry v2)

### Collaboration with Engineering

- **Feature documentation coordination:** Worked with Podman engineering to document new features as developed
- **Beta testing:** Validated procedures with pre-release software
- **Issue identification:** Reported documentation-impacting bugs during testing
- **Example review:** Engineering validated technical accuracy of new examples

## Documentation Deliverables

- **HTML documentation** on docs.oracle.com with navigation and search
- **PDF version** for offline use and printing
- **Searchable content** integrated with Oracle documentation search
- **Responsive design** for mobile and tablet devices
- **CC-BY-SA licensed** content enabling community use and adaptation

## Outcome and Impact

The restructured and updated Podman User's Guide:

- **Modernized documentation infrastructure** - DITA XML enables efficient multi-version management
- **Expanded platform coverage** - Oracle Linux 10 support ready at platform launch
- **Enhanced Kubernetes integration** - New chapter enables Podman-Kubernetes workflows
- **Improved advanced content** - Buildah, Skopeo, Quadlets, and private registry rewrites provide production-ready guidance
- **Increased accuracy** - Comprehensive testing eliminated outdated procedures and examples
- **Better maintainability** - Topic-based structure simplifies future updates
- **Enabled content reuse** - Shared topics across Oracle Linux container documentation

The guide serves as the primary reference for Oracle Linux users deploying containerized applications with Podman, supporting developers, system administrators, and DevOps engineers.

## Professional Skills Demonstrated

This project showcased:

- **DITA XML expertise** - Successfully migrated and restructured complex user guide
- **Technical writing leadership** - Managed major update while maintaining publication schedule
- **Container technology depth** - Mastered Podman, Buildah, Skopeo, and Kubernetes integration
- **Hands-on testing** - Comprehensive validation across multiple platforms and versions
- **Content development** - Wrote substantial new content (Kubernetes chapter, major rewrites)
- **Documentation architecture** - Designed scalable information architecture for ongoing maintenance
- **Version management** - Implemented conditional processing for multi-version support

## Related Documentation

The Podman User's Guide integrates with broader Oracle Linux container documentation:

- **Oracle Linux: Getting Started with Podman** - Quick-start tutorial
- **Oracle Linux Release Notes** - Version-specific features and known issues
- **Oracle Container Registry Documentation** - Cloud registry integration
- **Oracle Cloud Native Environment Documentation** - Kubernetes platform integration

## Technical Writing Insights

### DITA Migration Best Practices Applied

1. **Structure before content** - Established topic architecture before migrating text
2. **Incremental migration** - Migrated and updated in logical sections, not all at once
3. **Test continuously** - Validated DITA output quality throughout migration
4. **Leverage topic types** - Used concept/task/reference appropriately for semantic correctness
5. **Plan for reuse** - Identified reusable content patterns from the beginning

### Writing for Rapidly Changing Technology

1. **Focus on fundamentals** - Core concepts remain stable even as features change
2. **Version awareness** - Document version-specific behaviors explicitly
3. **Test exhaustively** - Outdated examples destroy credibility instantly
4. **Update systematically** - Establish testing matrix covering supported platforms
5. **Monitor upstream** - Track Podman project releases for upcoming changes

### Integrating Related Tools

1. **Clear scope boundaries** - Help users understand what each tool does best
2. **Workflow examples** - Show tools working together in realistic scenarios
3. **Consistent patterns** - Document commands consistently across related tools
4. **Cross-references** - Link related content without creating circular dependencies

This project demonstrates the intersection of technical depth, documentation architecture, and hands-on validation required for high-quality technical documentation of complex, rapidly evolving technologies.
