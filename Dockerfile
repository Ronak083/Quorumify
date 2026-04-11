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

# Stage 1: Build the React application
FROM node:20-alpine AS build
WORKDIR /app

# Copy package files and install dependencies
# Doing this before copying the whole project leverages Docker caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application code and build
COPY . .
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:stable-alpine

# Copy the build output from Stage 1 to Nginx's html folder
COPY --from=build /app/dist /usr/share/nginx/html

# Copy a custom nginx config if you have one (optional but recommended for SPAs)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]