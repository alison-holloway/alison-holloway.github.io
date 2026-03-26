---
title: "Kubernetes Assistant: Fine-Tuned LLM"
layout: portfolio_item
product: k8s-model-fine-tuning
doc_type: Python / Machine Learning
date: '2026-01-01'
date_completed: 'February 2026'
section: ai
tools:
- Python
- PyTorch
- QLoRA
- Unsloth
- Claude API
- Hugging Face
- Ollama
- WSL2
doc_url: https://github.com/alison-holloway/k8s-model-fine-tuning
excerpt: "Fine-tuning Llama 3.1 8B on 2,000 Kubernetes examples for YAML generation, kubectl command explanation, and error troubleshooting. Training on a Windows gaming PC (RTX 2080); inference via Ollama."
---

## Overview

This project fine-tunes Llama 3.1 8B on a dataset of 2,000 Kubernetes examples across three task categories: YAML manifest generation, kubectl command explanation, and error troubleshooting. The goal was to produce a small, locally-runnable model that outperforms the base model on Kubernetes-specific tasks.

The fine-tuned model is available via Ollama as `k8s-assistant`.

The source code is on GitHub.

## Results

Evaluated on a 30-example smoke test across all three categories:

| Metric | Base Model | Fine-Tuned |
|---|---|---|
| YAML Validity (K8s fields) | 0% (0/6) | 83% (5/6) |
| kubectl Accuracy | 80% (8/10) | 100% (10/10) |
| Overall | 73% (22/30) | 97% (29/30) |
| Training Time | -- | ~10 hrs (RTX 2080) |
| Dataset Cost | -- | ~$15 (Claude API) |

## How It Works

**Dataset generation** runs on a Mac using the Claude API. A generation script produces 2,000 labelled examples covering the three task types, with a validation pipeline to filter out bad outputs. Total cost was around $15.

**Training** runs on a Windows PC via SSH and WSL2 Ubuntu, using QLoRA to fit training within the 8GB VRAM budget of an RTX 2080. Training took roughly 10 hours.

**Inference** uses Ollama. The fine-tuned model is converted to GGUF format and loaded as a local Ollama model.

This two-machine setup (Mac for scripting and API calls, PC for GPU training via SSH) is documented in detail in `docs/SETUP.md`.

## Documentation

The repo includes full methodology docs covering environment setup, dataset generation, training configuration, evaluation methodology, and a comparison of fine-tuning vs. retrieval-augmented generation for this use case.
