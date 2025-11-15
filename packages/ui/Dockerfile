# Multi-stage build for UI
FROM node:18-alpine AS ui-build

# Enable corepack for Yarn 4
RUN corepack enable

WORKDIR /app

# Copy package files
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
COPY packages/shared/package.json packages/shared/
COPY packages/ui/package.json packages/ui/

# Install dependencies
RUN yarn install --immutable

# Copy source code
COPY packages/shared/src packages/shared/src
COPY packages/shared/tsconfig.json packages/shared/
COPY packages/ui/src packages/ui/src
COPY packages/ui/public packages/ui/public
COPY packages/ui/index.html packages/ui/
COPY packages/ui/tsconfig*.json packages/ui/
COPY packages/ui/vite.config.ts packages/ui/

# Build packages
RUN yarn workspace @project-twelve/shared build
RUN yarn workspace ui build

# Production stage with nginx
FROM nginx:alpine

# Copy nginx configuration
COPY packages/ui/nginx.conf /etc/nginx/conf.d/default.conf

# Copy built application
COPY --from=ui-build /app/packages/ui/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]