# RewardPath — Phase 1 MVP

AI-powered credit card advisory platform. Phase 1 proves that citation-grounded, hybrid-retrieval recommendations beat static comparison tables.

## What's Built (Phase 1)

| Feature | Status |
|---------|--------|
| Marketing site (Nav, Hero, Features, FAQ, Footer) | ✅ |
| Interactive AI search — **The Matchmaker** | ✅ |
| Spend-Based ROI Calculator (NAV = Rewards − Fees) | ✅ |
| Dynamic Comparison Matrix | ✅ |
| Hybrid RAG (ChromaDB + SQLite structured facts) | ✅ |
| Citation-grounded responses | ✅ |
| Cookie consent + GA4 hooks | ✅ |
| Golden Q&A regression tests | ✅ |

**Deferred to Phase 2:** Accelerator, Arbitrageur, user accounts, Approval Odds, Testimonials/Team.

## Tech Stack

- **Frontend:** Next.js 15, React 19, Tailwind CSS
- **Structured data:** JSON-backed relational store (fees, multipliers, bonuses) — migrates to PostgreSQL in production
- **Vector DB:** ChromaDB (terms/context chunks with effective dates)
- **AI:** Rule-based Matchmaker + optional OpenAI enhancement (structured JSON only)

> [!WARNING]
> ### 🛡️ SECURITY & SECRET SAFETY DIRECTIVE
> **DO NOT COMMIT REAL SECRETS OR API KEYS TO GIT**:
> All API keys (`OPENAI_API_KEY`, `ADMIN_SECRET_KEY`), database connection strings (`DATABASE_URL`), and authentication tokens MUST be stored in `.env.local` or environment variables ONLY.
> 
> **GIT HISTORY ROTATION WARNING**:
> If any secret key (OpenAI API Key, Supabase Service Role Key, Database URL, or Admin Secret Token) was previously committed to git history during earlier development or testing, **ROTATE ALL SECRETS IMMEDIATELY** in your provider dashboards before deploying to production. Committed secrets in git logs are permanently compromised even if deleted in future commits.

## Quick Start

```bash
# Install dependencies
npm install

# Copy env and configure (optional)
cp .env.example .env.local

# Seed structured + vector data
npm run seed

# Run golden regression tests
npm run test:golden

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### ChromaDB (optional for full hybrid retrieval)

```bash
docker run -p 8000:8000 chromadb/chroma
```

The app works without ChromaDB — structured SQLite retrieval powers all numeric claims. Vector search enhances contextual ranking when available.

### OpenAI (optional)

Set `OPENAI_API_KEY` in `.env.local` to enable LLM-enhanced reasoning summaries. Without it, the rule-based Matchmaker runs with full citation support.

## Architecture

```
User Query
    │
    ├─► Vector DB (ChromaDB) ──► context chunks + metadata
    │
    └─► Structured store (JSON/DB) ──► exact fees, multipliers, bonuses
                │
                ▼
         Matchmaker Engine
                │
                ▼
    Ranked recommendations + NAV math + citations
```

## Cross-Cutting Constraints

1. **No full card numbers** — card type/issuer only
2. **Every numeric claim cited** to source document chunks
3. **Affiliate disclosure** on every recommendation component
4. **Informational framing** — not licensed financial advice
5. **Golden tests** must pass before any prompt or card-data change ships

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run seed` | Seed SQLite + ChromaDB |
| `npm run test:golden` | Run golden Q&A regression suite |

## Phase Roadmap

- **Phase 1 (current):** Matchmaker, ROI Calculator, Comparison Matrix
- **Phase 2:** Accelerator, Arbitrageur, user accounts, award-space caching
- **Phase 3:** Guardian, route alerts, Trip Tracker, SOC 2
