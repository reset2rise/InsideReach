# Deployment Guide for Inside Reach Ministries Website

## Quick Deployment to Netlify

### Step 1: Prepare Your Code
1. Download all project files from this environment
2. Create a GitHub account at https://github.com if you don't have one

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Name your repository (e.g., "inside-reach-ministries")
3. Keep it private or public (your choice)
4. Click "Create repository"

### Step 3: Upload Code to GitHub
**Option A: Using GitHub Website (Easiest)**
1. On your new repository page, click "uploading an existing file"
2. Drag and drop all project files
3. Click "Commit changes"

**Option B: Using Git Command Line**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

### Step 4: Deploy to Netlify
1. Go to https://netlify.com and sign up (free)
2. Click "Add new site" → "Import an existing project"
3. Choose "Deploy with GitHub"
4. Authorize Netlify to access your GitHub
5. Select your repository
6. Netlify will auto-detect settings from netlify.toml
7. Click "Deploy site"

Your site will be live in 2-3 minutes!

### Step 5: Add Your Custom Domain
1. In Netlify dashboard, click "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow instructions to update DNS settings with your domain registrar
5. SSL certificate will be added automatically (free)

## Contact Form Setup

Your contact form is ready to work with Netlify Forms:

1. In Netlify dashboard, go to "Forms"
2. You'll see submissions from your contact form
3. Set up email notifications in Form settings

## Future: Adding Netlify CMS (Visual Editor)

When you're ready to add a visual editor for content:

1. We'll add Netlify CMS configuration files
2. You'll access the editor at: yoursite.com/admin
3. You can edit text, images, and content without touching code
4. Changes publish automatically

This can be added anytime without affecting your current site.

## Making Updates

To update your live site:
1. Make changes to your code
2. Push to GitHub
3. Netlify automatically rebuilds and deploys (1-2 minutes)

## Support

- Netlify docs: https://docs.netlify.com
- Netlify community: https://answers.netlify.com
- Need help? Contact a developer or reach out to Netlify support

## Cost

Everything described above is **100% FREE** on Netlify's Starter plan:
- Free hosting
- Free SSL certificate
- Free custom domain support
- 100GB bandwidth/month
- Form submissions included
