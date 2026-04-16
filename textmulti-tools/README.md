# Multi Tools

A collection of useful web tools built with Next.js 15, TypeScript, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Theme:** next-themes (dark mode via `class` strategy)

---

## Running Locally (without Docker)

```bash
cd apps/web
pnpm install
pnpm dev
```
Open [http://localhost:3000](http://localhost:3000).

---

## Docker Deployment

> **Build context:** Docker images are always built from the `apps/web` directory
> (`context: ./apps/web` in docker-compose).  All docker-compose and Dockerfile
> references to paths inside `/app` assume this context.

### Development

Hot-reload dev server via Docker Compose — source changes on the host are
reflected immediately without rebuilding the image.

```bash
# Build image + start container (foreground)
docker compose up --build

# Run in background, then tail logs
docker compose up --build -d
docker compose logs -f

# Stop and remove containers
docker compose down
```

> **Named volume for `node_modules`:** The dev compose file uses a named volume
> `node_modules:/app/node_modules` alongside the bind mount `./apps/web:/app`.
> Without the named volume the bind mount hides the container's `/app/node_modules`,
> causing "module not found" errors.  The named volume preserves the installed
> packages independently of the source mount.

### Production

Multi-stage Docker build (`node:20-alpine`) → minimal standalone image.
Uses `pnpm@latest` via corepack; the `pnpm-lock.yaml` is the real source of
truth for dependency resolution (`--frozen-lockfile` enforces exact matches).

```bash
# Build image + start container (foreground)
docker compose -f docker-compose.prod.yml up --build

# Run in background
docker compose -f docker-compose.prod.yml up --build -d

# Restart running container
docker compose -f docker-compose.prod.yml restart web

# Stop and remove containers
docker compose -f docker-compose.prod.yml down
```

The production container:
- Runs as **non-root user** `nextjs` (uid 1001) for OS-level security.
- Inherits a `HEALTHCHECK` from the Dockerfile: `wget http://localhost:3000/` every
  10 s, marks unhealthy after 3 consecutive failures.
- Restarts automatically on crash or host reboot (`restart: unless-stopped`).

### Production Image Size Optimization

| Technique | Impact |
|---|---|
| `node:20-alpine` base image | ~50 MB smaller than `node:20` slim |
| 3-stage multi-stage build | Runner stage contains only runtime artifacts |
| `--frozen-lockfile` dependency pinning | Deterministic layer caching, no extra installs |
| `output: "standalone"` (Next.js) | Only compiled server + static assets in final image |

Final image size: **120 – 180 MB** depending on installed dependencies.

---

## Available Tools

- **Dashboard** - Overview and navigation
- **Infinity Scroll** - Infinite scroll testing tool
- **Keyboard Test** - Virtual keyboard testing
- **Mouse Click Test** - Click speed and accuracy testing
- **What is My IP** - Display your IP address information

## Project Structure

```
textmulti-tools/
├── apps/web/
│   ├── app/                  # Next.js App Router
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   └── layout/          # Header, Sidebar, ThemeProvider, ThemeToggle
│   ├── lib/                  # Utilities (cn helper, etc.)
│   ├── Dockerfile            # 3-stage production build (deps → builder → runner)
│   └── .dockerignore         # Keeps pnpm-lock.yaml, skips dev artifacts
├── docker-compose.yml        # Development (bind mount + named node_modules volume)
├── docker-compose.prod.yml   # Production (standalone image, restart unless-stopped)
└── pnpm-workspace.yaml       # Monorepo workspace config
```
