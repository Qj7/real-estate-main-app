# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build application (creates static export in 'out' directory)
ARG NEXT_PUBLIC_API_URL=http://localhost:3001/api
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build with verbose output for debugging
RUN npm run build 2>&1 || (echo "Build failed, checking for errors..." && exit 1)

# Production stage - use nginx for static files
FROM nginx:alpine

# Copy static files from build
COPY --from=builder /app/out /usr/share/nginx/html

# Copy nginx configuration (optional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

