# Stage 1: Build React Frontend
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: True Monolith (Node + MongoDB)
FROM ubuntu:22.04

# Install Node.js, MongoDB, and dependencies
RUN apt-get update && apt-get install -y \
    curl \
    gnupg \
    && curl -fsSL https://www.mongodb.org/static/pgp/server-7.0.asc | gpg --dearmor -o /usr/share/keyrings/mongodb-server-7.0.gpg \
    && echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-7.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-7.0.list \
    && curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs mongodb-org \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files and install production dependencies
COPY package*.json ./
RUN npm install --production

# Copy server code and build folder
COPY server/ ./server/
COPY --from=builder /app/build ./build
COPY start.sh ./

# Set permissions for the startup script
RUN chmod +x start.sh

# Environment Variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose port (Monolith uses a single port to serve everything)
EXPOSE 5000

# Start everything
CMD ["./start.sh"]
