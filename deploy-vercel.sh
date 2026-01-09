#!/bin/bash

# 🚀 Quick Deployment Script for Vercel
# This script helps you deploy to Vercel in minutes

echo "🚀 Stress-Free Trip Planner - Vercel Deployment"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit for deployment"
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo ""
    echo "📥 Installing Vercel CLI..."
    npm install -g vercel
    echo "✅ Vercel CLI installed"
else
    echo "✅ Vercel CLI already installed"
fi

echo ""
echo "🔐 Please ensure you have:"
echo "  1. Created a GitHub repository"
echo "  2. Pushed your code: git remote add origin <your-repo-url>"
echo "  3. Have your Supabase credentials ready"
echo ""
echo "📋 Your environment variables:"
echo "  - PUBLIC_SUPABASE_URL"
echo "  - PUBLIC_SUPABASE_ANON_KEY"
echo "  - ADMIN_EMAIL"
echo ""

read -p "Ready to deploy? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🚀 Starting Vercel deployment..."
    echo "Follow the prompts to:"
    echo "  1. Login to Vercel"
    echo "  2. Link to your project"
    echo "  3. Configure settings"
    echo ""
    
    vercel
    
    echo ""
    echo "✅ Deployment initiated!"
    echo ""
    echo "📝 Next steps:"
    echo "  1. Add environment variables in Vercel dashboard"
    echo "  2. Redeploy: vercel --prod"
    echo "  3. Add your custom domain in Vercel settings"
    echo "  4. Update DNS in HostAfrica cPanel"
    echo ""
else
    echo "Deployment cancelled. Run this script again when ready!"
fi
