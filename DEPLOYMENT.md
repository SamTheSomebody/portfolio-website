# Deployment Guide

This project uses a two-branch deployment strategy with automated GitHub Actions for GitHub Pages.

## Branch Structure

- **`main`** - Development branch for ongoing work
- **`production`** - Live deployment branch that triggers automated builds

## Automated Deployment

The project now uses GitHub Actions for automated builds and deployment. When you push to the `production` branch, it automatically:

1. Builds your SvelteKit site
2. Deploys it to GitHub Pages
3. Provides deployment status and URLs

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

When ready to deploy, use the automated script:

**On Windows:**

```cmd
# Make sure you're on main branch
git checkout main

# Run the deployment script
scripts\deploy.bat
```

**On macOS/Linux:**

```bash
# Make sure you're on main branch
git checkout main

# Run the deployment script
./scripts/deploy.sh
```

Or manually:

```bash
# Switch to production branch
git checkout production

# Merge latest changes from main
git merge main

# Push to trigger automated deployment
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
- Automated builds use GitHub Actions with Node.js 18
- The workflow includes `workflow_dispatch` for manual triggers
- Static adapter is configured for optimal GitHub Pages compatibility

## Testing Before Deployment

Always test your build locally before deploying:

```bash
npm run build:gh-pages
npm run preview:gh-pages
```

This simulates the exact build that will be deployed to GitHub Pages.

## Benefits of Automated Deployment

- ✅ No need to commit build files to repository
- ✅ Consistent builds across environments
- ✅ Automatic deployment on every push to production
- ✅ Build logs and deployment status tracking
- ✅ Clean repository without build artifacts

**Note**: The build command uses `cross-env` for Windows compatibility.
