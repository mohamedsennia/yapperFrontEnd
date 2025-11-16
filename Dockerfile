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

# Install http-server globally
RUN npm install -g http-server

# Copy built files
COPY --from=build /app/dist/messenger-app-front/browser ./dist

# Expose port
EXPOSE $PORT

# Start command
CMD http-server dist -p $PORT -a 0.0.0.0