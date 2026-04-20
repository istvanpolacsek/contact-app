ARG NODE_VERSION=24-slim

# Build stage
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

# This Dockerfile must be built from the workspace root, for example:
# docker build -f apps/app/Dockerfile .

# Build-time environment variables for NEXT_PUBLIC_ vars
ARG NEXT_PUBLIC_S3_ENDPOINT_PUBLIC=http://localhost:9000
ARG NEXT_PUBLIC_S3_BUCKET=contact-app-media

ENV NEXT_PUBLIC_S3_ENDPOINT_PUBLIC=${NEXT_PUBLIC_S3_ENDPOINT_PUBLIC}
ENV NEXT_PUBLIC_S3_BUCKET=${NEXT_PUBLIC_S3_BUCKET}

# Enable corepack for yarn 3+ support
RUN corepack enable

# Configure Yarn to use node_modules instead of PnP
RUN echo 'nodeLinker: node-modules' > .yarnrc.yml

# Copy root package files
COPY package.json yarn.lock .yarnrc.yml eslint.config.js ./

# Copy Nx configuration and workspace setup
COPY nx.json tsconfig.base.json tsconfig.json ./
COPY apps/app ./apps/app
COPY libs ./libs

# Clean up any previous build artifacts
RUN rm -rf apps/app/dist apps/app/.next

# Install dependencies
RUN yarn install

# Build the Next.js app using Nx
RUN yarn nx run app:build:production --webpack

# Runtime stage
FROM node:${NODE_VERSION}

WORKDIR /app

# Add prod env
ENV NODE_ENV=production

# Copy the standalone server bundle and the assets it serves at runtime.
COPY --from=builder --chown=node:node /app/apps/app/dist/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/app/dist/.next/static ./apps/app/dist/.next/static
COPY --from=builder --chown=node:node /app/apps/app/dist/public ./apps/app/public

# Switch to non-root user for security best practices
USER node

# Expose port 3000 for Next.js
EXPOSE 3000

# Start the Next.js app
CMD ["node", "apps/app/server.js"]
