# TypeScript Fullstack Template - AI Coding Instructions

## Project Overview
This is a **Yarn 4 monorepo template** for building fullstack TypeScript applications with React frontend, Express API, and shared types. Based on proven patterns from production applications.

## Architecture & Key Patterns

### Monorepo Structure
- `packages/ui/` - React frontend (Vite, CSS Modules, React Query)
- `packages/api/` - Express backend (TypeScript, Zod validation)
- `packages/shared/` - Shared types, schemas, and enums
- Use `yarn workspace <package-name> <command>` for package-specific operations

### Component Architecture
- **CSS Modules**: Each component has `.module.css` file with className pattern `${componentName.toLowerCase()}Section`
- **Test co-location**: `ComponentName.test.tsx` alongside component files
- **Motion files**: Components with animations have `ComponentName.motion.ts`
- Use barrel exports (`index.ts`) for clean imports

### API Patterns
- **Zod validation**: All endpoints validate with schemas from shared package
- **Express controllers**: Separate business logic into `*.helpers.ts` files
- **Error handling**: Always check `safeParse()` results and return appropriate HTTP codes

## Development Workflows

### Component Creation
```bash
yarn create-component MyComponent  # Auto-generates component, CSS, test, and index files
```

### Testing Strategy
- **Unit tests**: Vitest with `@testing-library/react` for UI components
- **E2E tests**: Cypress with custom commands in `cypress/support/`
- Animation timing automatically reduced in test environments

### Development Commands
```bash
yarn dev                    # Start both API and UI in watch mode
yarn reset                  # Clean install + rebuild shared package (use when types are stale)
yarn workspace ui cypress:open  # E2E testing
```

### Docker Development
- `docker compose up --build` - Full containerized development
- Services communicate via internal Docker network
- UI proxies `/api/*` requests to backend

## Critical Conventions

### TypeScript Imports
- Shared package: `import { SharedType } from '@your-app/shared'`
- Use absolute paths for UI components: `import Component from '../../components/Component'`

### Animation System
- All timing controlled via `animationDurations.ts` constants
- Test environments auto-reduce timing with `multiplier`

## Common Pitfalls

- **Build order**: Run `yarn workspace @your-app/shared build` after type changes
- **Timer cleanup**: All `setTimeout` calls must have cleanup in `useEffect` return
- **Zod validation**: Backend must validate ALL inputs with shared schemas
- **CSS naming**: Component CSS classes must follow `${componentName.toLowerCase()}Section` pattern

## File Organization
- Components: `src/components/ComponentName/{ComponentName.tsx, ComponentName.module.css, ComponentName.test.tsx, index.ts}`
- Screens: `src/screens/ScreenName/` (same structure as components)
- Shared logic: Extract to `*.helpers.ts` files alongside main implementation