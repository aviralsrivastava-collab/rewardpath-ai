# RewardPath — Technical Architecture

This document describes the high-level architecture, hybrid retrieval system, security directives, and component organization of the RewardPath credit card advisory platform.

## System Overview

RewardPath is an AI-powered credit card and travel rewards advisor built on Next.js 15, React 19, and TypeScript. It combines deterministic structured mathematical calculation with citation-grounded hybrid retrieval (Vector Search + Relational Fact Store).

```
                      ┌───────────────────────────────┐
                      │          User Query           │
                      └───────────────┬───────────────┘
                                      │
                                      ▼
                      ┌───────────────────────────────┐
                      │    Middleware / Rate Limiter  │
                      └───────────────┬───────────────┘
                                      │
              ┌───────────────────────┴───────────────────────┐
              ▼                                               ▼
  ┌───────────────────────────────┐               ┌───────────────────────────────┐
  │     Structured Fact Store     │               │        Vector DB Chunk        │
  │     (Fees, Multipliers, NAV)  │               │       (ChromaDB Engine)       │
  └───────────────┬───────────────┘               └───────────────┬───────────────┘
                  │                                               │
                  └───────────────────────┬───────────────────────┘
                                          │
                                          ▼
                      ┌───────────────────────────────┐
                      │       Matchmaker Engine       │
                      │  (Deterministic + OpenAI LLM) │
                      └───────────────┬───────────────┘
                                      │
                                      ▼
                      ┌───────────────────────────────┐
                      │ Citation-Grounded Recommendation │
                      └───────────────────────────────┘
```

## Core Systems & Layers

### 1. Presentation & UI Layer (`src/components/`, `src/app/`)
- **Next.js 15 App Router**: Modern SSR and Client Component rendering.
- **Tailwind CSS**: Custom styling with glassmorphism design system.
- **Lucide Icons & Dynamic UI**: Smooth animations and responsive calculator interfaces.

### 2. AI Reasoning & Engine Layer (`src/lib/rag/`, `src/lib/ai/`)
- **Matchmaker**: Core credit card recommendation engine.
- **Accelerator**: Portfolio point-multiplier optimization engine.
- **Arbitrageur**: Flight/hotel award space sweet-spot valuation engine.
- **Guardian**: Approval odds & velocity check engine.

### 3. Data & Persistence Layer (`src/lib/db/`, `data/`)
- **Structured DB Store**: Fast deterministic SQL/JSON queries for credit card attributes, fees, and earn rates.
- **Vector DB Store**: ChromaDB embeddings index storing text chunks with source URLs, effective dates, and audit metadata.

### 4. Security & Compliance (`src/middleware.ts`, `src/lib/sanitizer.ts`)
- **Strict PII & Prompt Sanitization**: Removes credit card numbers, CVVs, and sensitive strings before model invocation.
- **Security Headers & CORS**: Custom security headers (HSTS, No-Sniff, Frame-Options) and rate-limiting.
