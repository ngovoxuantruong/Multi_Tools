# Multi Tools

A collection of useful web tools built with Next.js 15, TypeScript, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Package Manager:** pnpm
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Icons:** Lucide React
- **Theme:** next-themes

## Getting Started

```bash
# Install dependencies
cd apps/web
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to start using the tools.

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
│   │   ├── layout/          # Layout components
│   │   └── common/          # Shared components
│   └── lib/                 # Utilities
└── docker-compose.yml       # Docker deployment
```
