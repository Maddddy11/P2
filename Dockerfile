# Production Dockerfile for JSON Monolith
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY server/ ./server/
COPY data/ ./data/
COPY --from=builder /app/build ./build
ENV NODE_ENV=production
ENV PORT=5000
EXPOSE 5000
CMD ["node", "server/index.js"]
