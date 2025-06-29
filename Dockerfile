FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies including SQLite
RUN apk add --no-cache python3 make g++ sqlite

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy application source
COPY . .

# Build the application
RUN npm run build

# Create a directory for the SQLite database with proper permissions
RUN mkdir -p /app/data && chmod 777 /app/data

# Set environment variables
ENV NODE_ENV=production
ENV PORT=10000

# Expose the application port
EXPOSE 10000

# Update the database path to use the data directory
# This is done at runtime to ensure the database is created in the persistent directory
CMD ["sh", "-c", "sed -i 's/database: \'university.sqlite\'/database: \'data\/university.sqlite\'/g' dist/app.module.js && node dist/main.js"]