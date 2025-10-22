#!/bin/bash

# Installation Script for Alexander & Troy Tours Website
# This script installs all required dependencies for the admin panel

echo "================================================"
echo "Alexander & Troy Tours - Setup Script"
echo "================================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install Node.js first.${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm is installed"
echo ""

# Install main dependencies
echo "📦 Installing main dependencies..."
echo ""

echo "Installing next-auth..."
npm install next-auth

echo "Installing @octokit/rest..."
npm install @octokit/rest

echo ""

# Install dev dependencies
echo "📦 Installing dev dependencies..."
echo ""

echo "Installing @types/next-auth..."
npm install --save-dev @types/next-auth

echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    echo "Creating .env.local from template..."
    
    if [ -f .env.local.example ]; then
        cp .env.local.example .env.local
        echo -e "${GREEN}✓${NC} Created .env.local from .env.local.example"
        echo ""
        echo -e "${YELLOW}⚠️  IMPORTANT: Edit .env.local and add your configuration${NC}"
    else
        echo -e "${RED}❌ .env.local.example not found${NC}"
    fi
else
    echo -e "${GREEN}✓${NC} .env.local already exists"
fi

echo ""
echo "================================================"
echo "Installation Complete!"
echo "================================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Generate NEXTAUTH_SECRET:"
echo "   openssl rand -base64 32"
echo ""
echo "2. Create GitHub OAuth App:"
echo "   https://github.com/settings/developers"
echo ""
echo "3. Generate GitHub Personal Access Token:"
echo "   https://github.com/settings/tokens"
echo ""
echo "4. Edit .env.local with your credentials"
echo ""
echo "5. Start the development server:"
echo "   npm run dev"
echo ""
echo "6. Visit the admin panel:"
echo "   http://localhost:3000/admin/login"
echo ""
echo "📚 For detailed instructions, read:"
echo "   docs/IMPLEMENTATION_CHECKLIST.md"
echo ""
