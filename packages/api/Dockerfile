# Multi-stage build for API
FROM node:18-alpine AS api-build

# Enable corepack for Yarn 4
RUN corepack enable

WORKDIR /app

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY packages/shared/package.json packages/shared/
COPY packages/api/package.json packages/api/

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY packages/shared/src packages/shared/src
COPY packages/shared/tsconfig.json packages/shared/
COPY packages/api/src packages/api/src
COPY packages/api/tsconfig.json packages/api/

# Build packages
RUN yarn workspace @your-app/shared build
RUN yarn workspace api build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built application
COPY --from=api-build /app/packages/api/dist ./dist
COPY --from=api-build /app/packages/shared/dist ./shared

# Copy package files for production dependencies
COPY --from=api-build /app/packages/api/package.json ./

# Install production dependencies only
RUN yarn install --production --immutable

EXPOSE 3000

CMD ["node", "dist/app.js"]