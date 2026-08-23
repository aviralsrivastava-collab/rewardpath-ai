# RewardPath — Developer Guide

This guide covers local development environment setup, database seeding, test execution, and deployment guidelines.

## Requirements

- **Node.js**: v18.x or later
- **Package Manager**: npm v9+

## Quick Start Setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local

# 3. Seed structured card data & vector embeddings
npm run seed

# 4. Run golden Q&A regression suite
npm run test:golden

# 5. Start development server
npm run dev
```

## npm Scripts Reference

| Command | Description |
|---|---|
| `npm run dev` | Starts local Next.js dev server at `http://localhost:3000` |
| `npm run build` | Builds production optimized Next.js bundle |
| `npm run start` | Starts production server using built artifacts |
| `npm run lint` | Runs Next.js ESLint checker |
| `npm run seed` | Runs `scripts/seed-data.ts` to populate card facts and embeddings |
| `npm run train:model` | Runs `scripts/train-ai-model.ts` to rebuild embedding index |
| `npm run test:golden` | Executes golden Q&A regression tests |

## Code Standards & Style

- **TypeScript**: Strict mode enabled. Do not use `any`.
- **Imports**: Utilize path aliases (`@/components/...`, `@/lib/...`).
- **Formatting**: Run formatting following `.prettierrc` (2-space indent, double quotes).
- **Security**: Never hardcode secret keys or tokens. All secrets must reside in `.env.local`.
