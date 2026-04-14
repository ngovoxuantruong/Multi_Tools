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

### Development

Hot-reload dev server with bind mount — code changes are reflected immediately.

```bash
# Build image + start container (foreground)
docker compose up --build

# Run in background
docker compose up --build -d

# Stop and remove containers
docker compose down
```

### Production

Multi-stage Docker build (node:20-alpine) → minimal standalone image.

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

The production container runs as non-root user, includes a `HEALTHCHECK` polling
`http://localhost:3000/` every 10 s, and restarts automatically on crash or host reboot (`restart: unless-stopped`).

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
│   ├── Dockerfile            # Multi-stage production build
│   └── .dockerignore         # Excludes dev artifacts from build context
├── docker-compose.yml        # Development (bind mount, hot reload)
├── docker-compose.prod.yml   # Production (standalone image, restart policy)
└── pnpm-workspace.yaml       # Monorepo workspace config
```
