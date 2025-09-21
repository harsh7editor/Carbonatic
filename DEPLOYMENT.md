# Smart City Traveler - Vercel Deployment Guide

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Git Repository**: Push your code to GitHub, GitLab, or Bitbucket
3. **Vercel CLI** (optional): `npm i -g vercel`

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Connect Repository**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your Git repository

2. **Configure Project**:
   - **Framework Preset**: Other
   - **Root Directory**: `./` (leave as root)
   - **Build Command**: `cd smart-city-traveler-frontend && npm install && npm run build`
   - **Output Directory**: `smart-city-traveler-frontend/build`
   - **Install Command**: `cd smart-city-traveler-frontend && npm install`

3. **Environment Variables** (Optional):
   - `CI=false`
   - `DISABLE_ESLINT_PLUGIN=true`
   - `GENERATE_SOURCEMAP=false`

4. **Deploy**: Click "Deploy"

### Option 2: Deploy via CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - Project name: smart-city-traveler
# - Directory: ./
```

## Project Structure

```
smart-city-traveler/
├── api/                          # Vercel Serverless Functions
│   ├── auth/
│   │   ├── signin.js            # POST /api/auth/signin
│   │   └── signup.js            # POST /api/auth/signup
│   ├── places/
│   │   └── [id].js              # GET /api/places/[id]
│   ├── reviews/
│   │   └── place/
│   │       └── [id].js          # GET /api/reviews/place/[id]
│   ├── places.js                # GET /api/places
│   ├── trips.js                 # GET/POST /api/trips
│   └── reviews.js               # POST /api/reviews
├── smart-city-traveler-frontend/ # React Frontend
└── vercel.json                  # Vercel Configuration
```

## API Endpoints

Once deployed, your API will be available at:

- `GET /api/places` - Get all places with filtering
- `GET /api/places/[id]` - Get specific place
- `GET /api/trips` - Get user trips
- `POST /api/trips` - Create new trip
- `GET /api/reviews/place/[id]` - Get reviews for place
- `POST /api/reviews` - Create review
- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration

## Frontend Features

- ✅ React 18 with Material-UI
- ✅ Redux Toolkit for state management
- ✅ React Router for navigation
- ✅ Responsive design
- ✅ Google Maps integration ready
- ✅ Mock authentication system

## Post-Deployment

1. **Custom Domain** (Optional):
   - Go to Project Settings → Domains
   - Add your custom domain

2. **Environment Variables**:
   - Add any API keys in Project Settings → Environment Variables
   - `GOOGLE_MAPS_API_KEY` for maps functionality

3. **Analytics**:
   - Enable Vercel Analytics in Project Settings

## Troubleshooting

### Build Issues
- Ensure all dependencies are in `smart-city-traveler-frontend/package.json`
- Check build logs in Vercel dashboard

### API Issues
- Verify API functions are in `/api` directory
- Check function logs in Vercel dashboard

### CORS Issues
- API functions include CORS headers
- No additional configuration needed

## Local Development

```bash
# Start frontend
cd smart-city-traveler-frontend
npm install
npm start

# Start mock backend (for local testing)
node mock-backend.js
```

## Production URLs

After deployment, you'll get:
- **Frontend**: `https://your-project.vercel.app`
- **API**: `https://your-project.vercel.app/api/*`

The application is now ready for production use with full-stack functionality!