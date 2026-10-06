# ============================================================
# Stage 1: deps — Install all production dependencies only
# ============================================================
FROM node:20-alpine AS deps

# Install pnpm globally
RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy only the files needed for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install dependencies (production only — smaller image)
RUN pnpm install --frozen-lockfile --prod

# ============================================================
# Stage 2: builder — Build the Next.js application
# ============================================================
FROM node:20-alpine AS builder

RUN corepack enable && corepack prepare pnpm@9.0.0 --activate

WORKDIR /app

# Copy dependencies from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Build the application (standalone output)
RUN pnpm build

# ============================================================
# Stage 3: runner — Minimal production runtime
# ============================================================
FROM node:20-alpine AS runner

WORKDIR /app

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy standalone output and minimal production files
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Use non-root user
USER nextjs

EXPOSE 3000

# Healthcheck — verify the server responds
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD wget -qO- http://localhost:3000 || exit 1

# Start the Next.js server
CMD ["node", "server.js"]
