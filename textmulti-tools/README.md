# Multi Tools

A collection of useful web tools built with Next.js 15, TypeScript, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Theme:** next-themes (dark/light mode)

---

## Getting Started

### Local Development (without Docker)

```bash
cd apps/web
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start using the tools.

---

## Docker

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) v2+

---

### Development (Hot Reload)

Runs with **bind mount** — code changes on your host are reflected immediately (no rebuild needed).

```bash
# Build image and start container
docker compose up --build

# Start without rebuilding
docker compose up

# Stop and remove containers
docker compose down
```

- **URL:** http://localhost:3000
- **Hot reload:** Enabled via bind mount
- **STDIN/TDY:** Open (dev mode active)

---

### Production (Optimized Image)

Multi-stage Dockerfile builds a minimal, production-ready image (~150–200 MB).

```bash
# Build image and start production container
docker compose -f docker-compose.prod.yml up --build

# Start without rebuilding (use existing image)
docker compose -f docker-compose.prod.yml up

# Stop and remove containers
docker compose -f docker-compose.prod.yml down
```

- **URL:** http://localhost:3000
- **Restart policy:** `unless-stopped` (auto-restarts on failure)
- **Healthcheck:** Enabled (HTTP check every 30s)
- **User:** Non-root (`nextjs` user, UID 1001)

---

## Available Tools

| Tool | Route | Description |
|------|-------|-------------|
| Dashboard | `/` | Overview and navigation |
| Infinity Scroll | `/infinity-scroll` | Infinite scroll testing |
| Keyboard Test | `/keyboard-test` | Virtual keyboard testing |
| Mouse Click Test | `/mouse-click-test` | Click speed & accuracy testing |
| What is My IP | `/whatismyip` | Display your IP address |

---

## Project Structure

```
textmulti-tools/
├── apps/web/
│   ├── app/                  # Next.js App Router (pages, layout)
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Header, Sidebar, ThemeProvider
│   ├── lib/                 # Utilities (cn, utils)
│   ├── Dockerfile           # Multi-stage production build
│   ├── .dockerignore        # Exclude unnecessary files
│   └── next.config.mjs      # Next.js config (standalone output)
├── docker-compose.yml        # Development (hot reload)
├── docker-compose.prod.yml   # Production (optimized image)
└── README.md
```

---

## Docker Build Pipeline

```
┌──────────────────┐
│  node:20-alpine   │  ← Stage: deps
│  pnpm install --prod     │
└────────┬─────────┘
         │ (node_modules only)
         ▼
┌──────────────────────────┐
│  node:20-alpine          │  ← Stage: builder
│  pnpm build              │
│  output: "standalone"     │
└────────┬─────────────────┘
         │ (.next/standalone + .next/static)
         ▼
┌──────────────────────────┐
│  node:20-alpine          │  ← Stage: runner
│  node server.js          │
│  Non-root user           │
│  HEALTHCHECK enabled     │
└──────────────────────────┘
```
