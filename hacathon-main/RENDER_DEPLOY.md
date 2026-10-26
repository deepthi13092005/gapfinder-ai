# Deploy GapFinder AI to Render

## Quick Deploy

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

## Manual Deployment Steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "GapFinder AI - Hackathon Project"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 2. Create Web Service on Render
1. Go to [render.com](https://render.com) and sign in
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: gapfinder-ai
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

### 3. Add Environment Variables
In Render dashboard → Environment, add:

| Key | Value | Notes |
|---|---|---|
| `NODE_ENV` | `production` | Required |
| `NEXT_PUBLIC_APP_NAME` | `GapFinder AI` | Required |
| `NEXT_PUBLIC_DEMO_MODE` | `true` | Works without API keys |
| `GEMINI_API_KEY` | your key | Optional - for real AI |
| `NEXT_PUBLIC_SUPABASE_URL` | your url | Optional - for auth/db |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your key | Optional |
| `SUPABASE_SERVICE_ROLE_KEY` | your key | Optional |

**Note:** Leave API keys empty for demo mode - app works with sample data.

### 4. Deploy
Click "Create Web Service" and wait for build to complete (3-5 minutes).

Your app will be live at `https://gapfinder-ai-XXXX.onrender.com`

## Tips
- Free tier sleeps after inactivity - first load may take ~30s
- Demo mode is enabled by default, works perfectly
- For production with real users, add Supabase credentials
- Build is already tested and passes
