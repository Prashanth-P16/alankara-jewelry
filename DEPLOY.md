# ALANKARA by Karthika - Jewelry Showcase

A beautiful jewelry showcase website with admin console. No external dependencies - runs completely free using browser localStorage.

## Features
- Product showcase with categories
- Admin console for managing products
- First user to sign up becomes admin automatically
- All data stored in browser localStorage
- Image upload with base64 encoding

## Local Development

```bash
npm install
npm run dev
```

## Deploy to Netlify (FREE)

### Method 1: Using Netlify CLI
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy --prod`

### Method 2: Using Netlify Dashboard (Recommended)
1. Push your code to GitHub
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect to GitHub and select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

Your site will be live in minutes at a free Netlify URL!

## Admin Access
1. Go to `/auth` on your deployed site
2. Sign up with any email/password
3. First user automatically becomes admin
4. Access admin console at `/admin`

## Note
All data is stored in browser localStorage. Clearing browser data will reset everything.
