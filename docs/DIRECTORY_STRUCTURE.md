# RewardPath — Directory Structure Guide

This document details the file tree hierarchy and guidelines for extending the codebase.

## Directory Tree

```
master/
├── .env.example              # Environment variable documentation template
├── .eslintrc.json            # ESLint rules & Next.js config
├── .editorconfig             # IDE indentation and line ending rules
├── .prettierrc               # Prettier code formatting rules
├── .gitignore                # Git exclusion directives
├── next.config.ts            # Next.js build configuration
├── package.json              # NPM dependencies and script definitions
├── postcss.config.mjs        # PostCSS configuration
├── tailwind.config.ts        # Tailwind CSS design system configuration
├── tsconfig.json             # TypeScript config & path aliases (@/components, @/lib, etc.)
├── README.md                 # Primary project overview & quickstart
│
├── data/                     # Data stores
│   ├── cards.json            # Relational cards facts data
│   └── embedding_index.json  # Pre-computed AI embedding index
│
├── docs/                     # Documentation directory
│   ├── ARCHITECTURE.md       # High-level architecture & RAG workflow
│   ├── DIRECTORY_STRUCTURE.md# File hierarchy breakdown
│   ├── DEVELOPMENT.md        # Local setup & testing guide
│   └── API.md                # API route reference
│
├── public/                   # Static web assets
│   ├── robots.txt            # Search engine crawler directives
│   ├── sitemap.xml           # XML Sitemap
│   └── site.webmanifest      # PWA Web Application Manifest
│
├── scripts/                  # Command-line utility scripts
│   ├── seed-data.ts          # Database & ChromaDB seeding script
│   └── train-ai-model.ts     # Local AI embedding model indexing script
│
├── src/                      # Application source code
│   ├── app/                  # Next.js 15 App Router pages & API routes
│   │   ├── affiliate-disclosure/ # Affiliate disclosure page
│   │   ├── api/              # Backend API handlers
│   │   │   ├── ai/           # AI Chat & Admin Reindexing API
│   │   │   ├── cards/        # Card facts API
│   │   │   ├── matchmaker/   # Matchmaker search API
│   │   │   ├── roi/          # ROI Calculator API
│   │   │   └── user/         # User data management API
│   │   ├── privacy/          # Privacy Policy page
│   │   ├── terms/            # Terms of Service page
│   │   ├── globals.css       # Global styles & Tailwind directives
│   │   ├── layout.tsx        # Root HTML layout wrapper
│   │   └── page.tsx          # Homepage view
│   │
│   ├── components/           # UI Component system (grouped by domain)
│   │   ├── ai/               # AI Assistant & Copilot modals
│   │   ├── calculators/      # ROI, Breakeven, Matrix, Odds, Wallet tools
│   │   ├── dashboard/        # Portfolio dashboard component
│   │   ├── infrastructure/   # Award alerts & Trust modals
│   │   ├── layout/           # Navbar, Footer, CookieConsent
│   │   ├── marketing/        # Hero, FeatureGrid, FAQ, SocialProof
│   │   └── index.ts          # Top-level component barrel export
│   │
│   ├── lib/                  # Core logic, DB stores, AI algorithms
│   │   ├── ai/               # AI model classes and interfaces
│   │   ├── data/             # Seed data structures
│   │   ├── db/               # Structured SQLite & Vector ChromaDB store wrappers
│   │   ├── rag/              # Matchmaker, Accelerator, Arbitrageur, Guardian
│   │   ├── analytics.ts      # GA4 tracking helper functions
│   │   ├── config.ts         # Environment validation helper
│   │   ├── error-handler.ts  # Server correlation ID & error wrapper
│   │   ├── rate-limiter.ts   # In-memory sliding-window rate limiter
│   │   ├── sanitizer.ts      # String sanitizer
│   │   ├── types.ts          # Central TypeScript interfaces
│   │   ├── utils.ts          # Common utility functions
│   │   └── index.ts          # Central lib barrel export
│   │
│   └── middleware.ts         # Next.js security headers & rate-limiting middleware
│
└── tests/                    # Test suites
    └── golden-qa.test.ts     # Golden Q&A regression test suite
```

## Module Import Conventions

Use barrel exports and path aliases for clean imports:

```typescript
// Prefer:
import { ROICalculator, ComparisonMatrix } from "@/components/calculators";
import { runMatchmaker } from "@/lib/rag";
import { CardStructuredData } from "@/lib/types";

// Avoid deep relative paths like:
// import { ROICalculator } from "../../../components/calculators/ROICalculator";
```
