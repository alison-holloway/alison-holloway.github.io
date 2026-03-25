---
title: "Access the Canonical MicroK8s Kubernetes Dashboard"
layout: portfolio_item
product: MicroK8s
doc_type: Technical Guide
date: '2026-03-25'
date_completed: 'March 2026'
featured: false
section: independent
tags:
- Technical Guide
- Kubernetes
- MicroK8s
- Dashboard
- Personal Project
tools:
- Markdown
- Git
- GitHub
doc_url: https://github.com/alison-holloway/microk8s-dashboard-local-access-patterns
excerpt: A practical guide comparing four methods for accessing the Canonical MicroK8s
  Kubernetes Dashboard on a local machine, with setup instructions, security trade-offs,
  and troubleshooting tips.
---

## Overview

I wrote this guide out of frustration with existing Kubernetes Dashboard documentation, which presents methods like `kubectl port-forward` and `kubectl proxy` without explaining when to use each or what the security trade-offs are. I cover four access methods, comparing each across setup ease, security, network exposure, and kubectl dependency:

- port-forward
- kubectl proxy
- NodePort
- Ingress

Prerequisites, step-by-step setup instructions, and troubleshooting are included for each method.

Tested on Ubuntu 24.04 LTS with MicroK8s 1.33.9, single-node cluster, browser and cluster on the same host.

## Target Audience

Developers running MicroK8s on a single local machine. I scoped this specifically to single-node clusters on a local host, excluding multi-node clusters, RBAC-enabled setups, and VM networking scenarios, which are the things that make other guides hard to follow for this common case.

## Methods Covered

| Method | Setup Ease | Security | Best For |
|---|---|---|---|
| Port-forward | 3/3 | High | Local development |
| kubectl proxy | 2/3 | High | Direct API access |
| NodePort | 2/3 | Low | Home labs / LAN |
| Ingress | 1/3 | Very High | Production-like local |

**Port-forward** is my recommendation for most developers: a secure tunnel directly to the Dashboard service, no cluster changes required, no network exposure beyond the local loopback.

**NodePort** suits homelabs where persistent access from other local devices is useful, at the cost of exposing the login page to anyone with the host IP and port number.

**Ingress** is the most complex but most production-realistic setup, using an Nginx Ingress controller, a custom hostname (`dashboard.local`), and standard HTTPS ports.

I deliberately excluded `kubectl proxy` as a recommended method because it exposes the entire Kubernetes API, not just the Dashboard, which is a security concern that the upstream docs don't make obvious.

One troubleshooting gotcha worth calling out: always use HTTPS, not HTTP. HTTP login pages silently reject bearer tokens with no error message, which is a confusing failure mode for new users.
