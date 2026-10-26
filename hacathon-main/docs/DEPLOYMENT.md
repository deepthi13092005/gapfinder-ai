# GapFinder AI - Deployment Guide

## Deploy to Vercel

### Prerequisites
- Vercel account
- GitHub repository
- (Optional) Gemini API key and Supabase project

### Steps

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit: GapFinder AI"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```

2. **Import to Vercel**
- Go to [vercel.com/new](https://vercel.com/new)
- Import your GitHub repository
- Vercel will auto-detect Next.js

3. **Configure Environment Variables**
Add these in Vercel Project Settings → Environment Variables:

```
GEMINI_API_KEY=your_key_here (optional)
NEXT_PUBLIC_SUPABASE_URL=your_url_here (optional)
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key_here (optional)
SUPABASE_SERVICE_ROLE_KEY=your_key_here (optional)
NEXT_PUBLIC_APP_NAME=GapFinder AI
NEXT_PUBLIC_DEMO_MODE=true
```

**Note:** App works in demo mode without these variables.

4. **Deploy**
- Click Deploy
- Vercel will build and deploy automatically

## Build Settings
- Framework Preset: Next.js
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

## Post-Deployment
- App will be available at `your-project.vercel.app`
- Demo mode works immediately
- Add custom domain if needed

## Troubleshooting
- If build fails, check build logs
- Ensure all dependencies are in package.json
- Demo mode should work even with missing env vars
