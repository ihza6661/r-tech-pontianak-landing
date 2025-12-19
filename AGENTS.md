# Agent Guidelines for r-tech-pontianak-landing

## Build Commands
- **Dev**: `npm run dev` (starts on port 8080)
- **Build**: `npm run build` (production) or `npm run build:dev` (development mode)
- **Lint**: `npm run lint`
- **Preview**: `npm run preview`
- No test framework configured

## Tech Stack
Vite + React 18 + TypeScript + shadcn-ui + Tailwind CSS + React Router

## Code Style

### Imports
- Use `@/` alias for src imports: `import { Button } from "@/components/ui/button"`
- Group imports: external deps → components → utils → assets

### TypeScript
- Relaxed config: `noImplicitAny: false`, `strictNullChecks: false`, `noUnusedVars: off`
- Prefer typed components but implicit any is acceptable

### Components
- Functional components with arrow functions: `const Component = () => { ... }`
- Export default at bottom of file
- Use shadcn-ui components from `@/components/ui/`
- Tailwind for all styling, no CSS modules

### Naming
- Files: PascalCase for components (`HeroSection.tsx`), camelCase for utils (`whatsapp.ts`)
- Variables/functions: camelCase
- Types/Interfaces: PascalCase
- CSS: kebab-case for custom classes

### Utilities
- Use `cn()` from `@/lib/utils` for conditional className merging
- Tailwind merge for combining Tailwind classes
