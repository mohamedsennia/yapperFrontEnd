# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app

# Install http-server
RUN npm install http-server

# Copy server script
COPY server.js ./

# Copy built files
COPY --from=build /app/dist/messenger-app-front/browser ./dist

# Start with node
CMD ["node", "server.js"]