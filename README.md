# Project twelve

A modern TypeScript monorepo template for building fullstack applications with React frontend, Express API, and shared types. Built with Yarn 4 workspaces and proven production patterns.

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **Yarn** (v4.x)
- **Docker** (optional, for containerized setup)

### 🐳 Docker Setup (Recommended)

```bash
# Start with Docker Compose
docker compose up --build

# Access the app
open http://localhost:8080
```

### 💻 Local Development

```bash
# Install dependencies
yarn install

# Start development servers
yarn dev

# Or start individually
yarn workspace api dev    # API on :3000
yarn workspace ui dev     # UI on :3001
```

### 🏗️ Production Build

```bash
# Build all packages
yarn build

# Start production packages
yarn start
```

## 🏗️ Project Structure

```
typescript-fullstack-template/
├── packages/
│   ├── ui/              # React frontend
│   │   ├── src/
│   │   ├── cypress/     # E2E tests
│   │   └── Dockerfile
│   ├── api/             # Express backend
│   │   ├── src/
│   │   └── Dockerfile
│   └── shared/          # Shared types & utilities
│       └── src/
└── docker-compose.yml
```

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development
- **CSS Modules** for styling
- **Vitest** for unit testing
- **Cypress** for E2E testing
- **React Query** for data fetching

### Backend

- **Node.js** with Express
- **TypeScript** with ES modules
- **Zod** for validation
- **Vitest** for testing

### DevOps

- **Docker** & Docker Compose
- **Yarn Workspaces** (monorepo)
- **ESLint** & **Prettier**
- **Husky** for git hooks

## 🧪 Testing

```bash
# Run all tests
yarn test

# Run specific package tests
yarn workspace ui test
yarn workspace api test

# Run E2E tests (requires running app)
yarn workspace ui cypress:open
```

## 📦 Package Scripts

### UI Package

- `yarn workspace ui dev` - Start dev server
- `yarn workspace ui build` - Build for production
- `yarn workspace ui start` - Start production server
- `yarn workspace ui test` - Run unit tests
- `yarn workspace ui cypress:open` - Open Cypress

### API Package

- `yarn workspace api dev` - Start dev server
- `yarn workspace api build` - Build for production
- `yarn workspace api start` - Start production server
- `yarn workspace api test` - Run tests

### Shared Package

- `yarn workspace @project-twelve/shared build` - Build shared package

## 🎨 Component Creation

```bash
# Auto-generate component structure
yarn create-component MyComponent
```

This creates:

- `ComponentName/ComponentName.tsx`
- `ComponentName/ComponentName.module.css`
- `ComponentName/ComponentName.test.tsx`
- `ComponentName/index.ts`

## 🐛 Troubleshooting

**Port already in use:**

```bash
# Check what's using the port
lsof -i :3000
lsof -i :8080

# Kill the process
kill -9 <PID>
```

**Docker issues:**

```bash
# Reset Docker state
docker compose down
docker system prune -a
docker compose up --build
```

**Dependency issues:**

```bash
# Clean install
yarn reset
```
