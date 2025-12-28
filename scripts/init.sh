#!/bin/bash

# Script for initializing the development environment

echo "🚀 Initializing Real Estate Monorepo..."

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version: $(node -v)"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install dependencies for each app
echo "📦 Installing dependencies for apps..."
for app in apps/*/; do
    if [ -f "$app/package.json" ]; then
        echo "  Installing dependencies for $app..."
        cd "$app" && npm install && cd ../..
    fi
done

# Create .env files if they don't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cat > .env << EOF
# Database
POSTGRES_DB=real_estate
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# MinIO
MINIO_ROOT_USER=minioadmin
MINIO_ROOT_PASSWORD=minioadmin

# JWT
JWT_SECRET=your-secret-key-change-in-production
JWT_REFRESH_SECRET=your-refresh-secret-key-change-in-production

# Redis
REDIS_URL=redis://redis:6379

# API URLs
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_EVENTS_API_URL=http://localhost:3002

# Environment
NODE_ENV=development
EOF
    echo "✅ Created .env file"
fi

echo "✅ Initialization complete!"
echo ""
echo "Next steps:"
echo "  1. Review and update .env file with your settings"
echo "  2. Run 'npm run dev' to start development"
echo "  3. Or run 'docker-compose up -d' to start with Docker"

