---
title: "RAG CLI"
layout: portfolio_item
product: rag-cli-project
doc_type: Python Application
date: '2026-01-21'
date_completed: 'February 2026'
section: ai
tools:
- Python
- FastAPI
- React
- Tauri
- ChromaDB
- sentence-transformers
- Claude API
- Ollama
doc_url: https://github.com/alison-holloway/rag-cli-project
excerpt: "A Retrieval-Augmented Generation system for querying local documents using language models, with four interfaces: CLI, REST API, web UI, and a native macOS desktop app."
---

## Overview

RAG CLI is a Retrieval-Augmented Generation (RAG) system that lets you query your own documents using a language model. You point it at a folder of PDFs, Markdown files, HTML pages, or plain text, and then ask questions in plain English. The system finds the most relevant chunks from your documents and sends them to the model as context, so answers are grounded in your actual content rather than general training data.

The project was built to work entirely offline using Ollama for local inference, but it also supports the Claude API if you want a hosted model.

The source code is on GitHub.

## Interfaces

The same core engine is available through four different interfaces, depending on how you want to use it:

**CLI** -- the primary interface. Commands for adding documents, running one-shot queries, and starting an interactive chat session. Options for top-k retrieval count, temperature, and verbose output.

**REST API** -- a FastAPI backend with auto-generated Swagger docs. Useful for integrating the RAG system into other tools or scripts. Endpoints cover queries, document management, and configuration.

**Web UI** -- a React frontend with drag-and-drop document upload, markdown rendering, syntax highlighting, message export (text or JSON format), and dark mode.

**Desktop app** -- a native macOS application built with Tauri. Includes menu bar integration, keyboard shortcuts, and file associations.

## Technical Details

Documents are chunked and embedded using `BAAI/bge-small-en-v1.5` from sentence-transformers. Embeddings are stored in ChromaDB with persistence between sessions.

The repo also includes several standalone tools: an HTML documentation scraper, a DITA-aware semantic chunker (built for Oracle documentation), an embedding model benchmarker, and migration utilities for switching between embedding models.

Requires Python 3.12 or 3.13. Python 3.14 is not supported, and Intel Mac users have constraints around onnxruntime.
