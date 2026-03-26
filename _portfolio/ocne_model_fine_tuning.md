---
title: "Oracle CNE Assistant: Fine-Tuned LLM"
layout: portfolio_item
product: ocne-model-fine-tuning
doc_type: Python / Machine Learning
date: '2026-02-01'
date_completed: 'March 2026'
section: ai
tools:
- Python
- PyTorch
- QLoRA
- Hugging Face
- Ollama
- vLLM
doc_url: https://github.com/alison-holloway/ocne-model-fine-tuning
excerpt: "Fine-tuning Llama 3.1 8B Instruct on 285 curated Q&A pairs scraped from Oracle Cloud Native Environment documentation, covering CLI usage, cluster administration, and architectural concepts."
---

## Overview

This project fine-tunes Llama 3.1 8B Instruct on Oracle Cloud Native Environment (CNE) Release 2 documentation. The result is a locally-runnable model that can answer questions about CNE CLI usage, cluster administration, architectural concepts, and quick start procedures.

The dataset was created without external APIs. Two automation scripts handle the work: one scrapes all nine sections of the Oracle CNE Release 2 documentation, and another generates Q&A pairs from the scraped content using a local Ollama model.

The source code is on GitHub.

## Dataset

285 hand-curated Q&A pairs covering:

- CLI commands and flags
- Cluster administration procedures
- Architectural concepts
- Quick start and installation

The pairs are stored as JSONL and are included in the repository.

## Training

Training uses 4-bit QLoRA, which keeps peak VRAM usage around 9 GB and completes in about 8 minutes on a 16 GB GPU (tested on an RTX 5080). Configuration: 10 epochs, learning rate 2e-4, LoRA rank 16, effective batch size 8. Final loss is typically 0.35--0.45.

The training script is self-contained with no cloud dependencies or proprietary software beyond the base model weights.

## Inference

The model can be used in several ways after training:

- Python inference script with CUDA, MPS, and CPU support
- Direct LoRA adapter loading
- Ollama deployment after GGUF conversion
- vLLM for higher-throughput serving

A shell script handles the GGUF conversion and Ollama model registration.
