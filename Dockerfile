# Use a lightweight Node.js image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install build tools and SQLite
RUN apk add --no-cache python3 make g++ sqlite

# Copy only package files first for layer caching
COPY package*.json ./

# Install dependencies with clean cache
RUN npm ci --omit=dev

# Copy the entire application
COPY . .

# Build the NestJS application
RUN npm run build

# Ensure a writable directory for SQLite
RUN mkdir -p /app/data && chmod 777 /app/data

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Expose the port
EXPOSE 10000

# Runtime command: patch DB path and start the app
CMD ["sh", "-c", "sed -i \"s|database: 'university.sqlite'|database: 'data/university.sqlite'|g\" dist/app.module.js && node dist/main.js"]
