# ─── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies (separate layer for cache efficiency)
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copy source and build
COPY . .

# Allows overriding the API base URL at build time via --build-arg
# e.g. docker build --build-arg REACT_APP_API_URL=http://quorumify-api:8080/api/
ARG REACT_APP_API_URL=http://localhost:8080/api/
ENV REACT_APP_API_URL=$REACT_APP_API_URL

RUN npm run build

# ─── Stage 2: Serve with Nginx ────────────────────────────────────────────────
FROM nginx:1.25-alpine

# Copy built React app
COPY --from=builder /app/build /usr/share/nginx/html

# Replace default nginx config with custom config (SPA routing + API proxy)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]