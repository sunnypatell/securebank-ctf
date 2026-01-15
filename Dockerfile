# syntax=docker/dockerfile:1

# Base image for all stages
FROM node:20-slim AS base
WORKDIR /app

# Install native build prerequisites and lock down dependencies
FROM base AS deps
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        build-essential \
        python3 \
    && rm -rf /var/lib/apt/lists/*
COPY frontend/package*.json ./
RUN npm ci

# Build the Next.js application ahead of time
FROM deps AS builder
ARG NODE_OPTIONS="--max-old-space-size=4096"
ENV NODE_OPTIONS=${NODE_OPTIONS}
COPY frontend/ ./
RUN npm run build
RUN npm prune --omit=dev
RUN mkdir -p /app/seed \
    && cp database.sqlite /app/seed/database.sqlite

# Production runtime image
FROM base AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV DATA_DIR=/app/data
WORKDIR /app

# Copy the built application and runtime dependencies
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/app ./app
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/database ./database
COPY --from=builder /app/database.sqlite ./database.sqlite
COPY --from=builder /app/seed ./seed
COPY --from=builder /app/next.config.ts ./next.config.ts
# COPY --from=builder /app/.env.local ./.env.local

# Startup script handles database seeding & persistence awareness
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh \
    && mkdir -p /app/data \
    && chown -R node:node /app

VOLUME ["/app/data"]
EXPOSE 3000
USER node

CMD ["start.sh"]
