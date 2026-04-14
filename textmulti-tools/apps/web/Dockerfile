# ══════════════════════════════════════════════════════════════════════════════
#  Multi-Tools – Production Dockerfile
#  Next.js 15 · standalone output · multi-stage build
#
#  Stage 1 – deps    : install ALL dependencies (including devDependencies).
#                      Needed because the builder stage runs TypeScript/ESLint
#                      and needs the full toolchain.
#  Stage 2 – builder : compile the application → .next/standalone output.
#  Stage 3 – runner  : minimal runtime image – only the compiled server, static
#                      assets, and production node_modules are copied.
# ══════════════════════════════════════════════════════════════════════════════

# ── Stage 1: install all dependencies ────────────────────────────────────────
FROM node:20-alpine AS deps

RUN corepack enable && corepack prepare pnpm@9@activate

WORKDIR /app

# Copy package manifests first to maximise Docker layer-cache reuse.
# `pnpm install` only re-runs when package.json or pnpm-lock.yaml changes.
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile
# NOTE: do NOT use --production here. The builder stage needs devDependencies
#       (TypeScript, ts-node, etc.) to compile the application.

# ── Stage 2: build the application ───────────────────────────────────────────
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9@activate

WORKDIR /app

# Re-use the node_modules from stage 1 (includes devDependencies).
COPY --from=deps /app/node_modules ./node_modules

# Copy full source tree (build context = ./apps/web from docker-compose).
COPY . .

# Build.  The `output: "standalone"` in next.config.mjs emits
#         only the files needed to run the server into .next/standalone/.
RUN pnpm build

# ── Stage 3: minimal runtime image ───────────────────────────────────────────
FROM node:20-alpine AS runner

ENV NODE_ENV=production

WORKDIR /app

# ── Security: run as non-root user ────────────────────────────────────────────
# Create a dedicated system group and user (matches Dockerfile HEALTHCHECK user).
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid  1001 nextjs

# Copy the standalone server bundle from the builder stage.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Copy compiled static assets (JS bundles, images, fonts, etc.).
COPY --from=builder --chown=nextjs:nodejs /app/.next/static   ./.next/static

# Copy the public/ directory if it exists (icons, static files).
# The || true prevents the COPY from failing when the directory is absent.
COPY --from=builder --chown=nextjs:nodejs /app/public          ./public || true

EXPOSE 3000

# Health check: polls the root URL every 10 s; unhealthy after 3 consecutive
# failures (30 s total).  `docker compose ps` shows (healthy) once the server
# starts responding.
HEALTHCHECK --interval=10s --timeout=5s --retries=3 \
  CMD wget -qO- http://localhost:3000/ || exit 1

# Drop privileges – all subsequent commands run as the nextjs user.
USER nextjs

# `next start` binds to 0.0.0.0:3000 by default (Docker port mapping works).
CMD ["node", "server.js"]
