# Deployment Guide

This project uses a two-branch deployment strategy for GitHub Pages.

## Branch Structure

- **`main`** - Development branch for ongoing work
- **`production`** - Live deployment branch that triggers GitHub Pages

## Deployment Process

### 1. Development

Work on the `main` branch as usual:

```bash
git checkout main
# Make your changes
git add .
git commit -m "Your changes"
git push origin main
```

### 2. Deploy to Production

When ready to deploy to GitHub Pages:

```bash
# Switch to production branch
git checkout production

# Merge latest changes from main
git merge main

# Push to trigger deployment
git push origin production

# Switch back to main for continued development
git checkout main
```

### 3. Manual Deployment (Alternative)

You can also trigger a deployment manually:

- Go to your GitHub repository
- Navigate to Actions → Deploy to GitHub Pages
- Click "Run workflow" and select the `production` branch

## URLs

- **Live Site**: https://samthesomebody.github.io/portfolio-website/
- **Preview Build**: Run `npm run build:gh-pages && npm run preview` locally

## Configuration

- GitHub Pages is configured to deploy from the `production` branch only
- The workflow includes `workflow_dispatch` for manual triggers
- Static adapter is configured for optimal GitHub Pages compatibility

## Testing Before Deployment

Always test your build locally before deploying:

```bash
npm run build:gh-pages
npm run preview:gh-pages
```

This simulates the exact build that will be deployed to GitHub Pages.

**Note**: The build command now uses `cross-env` for Windows compatibility.
