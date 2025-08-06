#!/bin/bash

# Deploy script for portfolio website
# This script helps with the two-branch deployment strategy

echo "🚀 Starting deployment process..."

# Check if we're on main branch
if [ "$(git branch --show-current)" != "main" ]; then
    echo "❌ Error: You must be on the main branch to deploy"
    echo "Please run: git checkout main"
    exit 1
fi

# Check if there are uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: You have uncommitted changes"
    echo "Please commit or stash your changes before deploying"
    exit 1
fi

# Switch to production branch
echo "📦 Switching to production branch..."
git checkout production

# Merge latest changes from main
echo "🔄 Merging latest changes from main..."
git merge main

# Push to trigger deployment
echo "🚀 Pushing to production branch to trigger deployment..."
git push origin production

# Switch back to main
echo "🔄 Switching back to main branch..."
git checkout main

echo "✅ Deployment triggered successfully!"
echo "🌐 Your site will be available at: https://gamedevsam.com/"
echo "📊 Check deployment status at: https://github.com/samthesomebody/portfolio-website/actions" 