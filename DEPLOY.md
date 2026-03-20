# DuoExtra — Deployment Guide (Termux → GitHub → Netlify + Render)

## Prerequisites

You need Termux installed on your Android phone with the project files already on your device.

---

## STEP 1: Set Up Termux

Open Termux and run these commands one by one:

```bash
# Update packages
pkg update && pkg upgrade -y

# Install required tools
pkg install git nodejs-lts openssh -y

# Verify installations
git --version
node --version
npm --version
```

---

## STEP 2: Configure Git

```bash
# Set your identity (use your real name and GitHub email)
git config --global user.name "Your Name"
git config --global user.email "your-email@example.com"

# Generate SSH key for GitHub
ssh-keygen -t ed25519 -C "your-email@example.com"
# Press Enter 3 times (default location, no passphrase)

# Display your public key — COPY THIS
cat ~/.ssh/id_ed25519.pub
```

**Now go to GitHub in your browser:**
1. Go to https://github.com/settings/keys
2. Click **"New SSH key"**
3. Title: `Termux Phone`
4. Paste the key you copied
5. Click **"Add SSH key"**

Test the connection:
```bash
ssh -T git@github.com
# Should say: "Hi username! You've successfully authenticated"
```

---

## STEP 3: Create GitHub Repository

**In your browser:**
1. Go to https://github.com/new
2. Repository name: `duoextra`
3. Description: `German Language Learning & Exam Preparation Platform`
4. Set to **Public** or **Private**
5. Do NOT initialize with README (we already have one)
6. Click **"Create repository"**

---

## STEP 4: Navigate to Project Files

Your project files should be on your phone. Find where they are:

```bash
# If files are in Downloads (common after extracting the tar.gz)
cd ~/storage/downloads/duoextra

# OR if you extracted elsewhere, navigate there:
# cd /path/to/your/duoextra

# Verify you're in the right place
ls
# You should see: README.md  backend/  frontend/  docs/  shared/  docker-compose.yml  etc.
```

**If Termux can't access storage yet:**
```bash
termux-setup-storage
# Grant permission when prompted, then:
cd ~/storage/downloads/duoextra
```

**If the files are still in tar.gz format:**
```bash
cd ~/storage/downloads
tar -xzf duoextra-project.tar.gz
cd duoextra
```

---

## STEP 5: Push to GitHub

```bash
# Initialize git repo
git init

# Add all files
git add .

# Verify what's being committed
git status

# Create first commit
git commit -m "Initial commit: DuoExtra platform — backend, frontend, docs"

# Set main branch
git branch -M main

# Add your GitHub remote (replace YOUR_USERNAME)
git remote add origin git@github.com:YOUR_USERNAME/duoextra.git

# Push to GitHub
git push -u origin main
```

**Verify:** Go to `https://github.com/YOUR_USERNAME/duoextra` in your browser. You should see all the files.

---

## STEP 6: Deploy Backend to Render

### 6A: Create a PostgreSQL Database

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"**
3. Name: `duoextra-db`
4. Database: `duoextra`
5. Region: **Frankfurt (EU Central)** or closest to you
6. Plan: **Free**
7. Click **"Create Database"**
8. **COPY the "External Database URL"** — you'll need it. It looks like:
   ```
   postgresql://duoextra_user:password@host.render.com:5432/duoextra
   ```

### 6B: Deploy the Backend API

1. Click **"New +"** → **"Web Service"**
2. Connect your GitHub account if not already connected
3. Select the `duoextra` repository
4. Configure:

| Setting | Value |
|---------|-------|
| **Name** | `duoextra-api` |
| **Region** | Frankfurt (EU Central) |
| **Root Directory** | `backend` |
| **Runtime** | Node |
| **Build Command** | `npm install && npx prisma generate && npm run build` |
| **Start Command** | `npm run start:prod` |
| **Plan** | Free |

5. Click **"Advanced"** and add these **Environment Variables**:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `PORT` | `4000` |
| `DATABASE_URL` | *(paste the External Database URL from step 6A)* |
| `JWT_SECRET` | *(click "Generate" or type a random 64-char string)* |
| `JWT_REFRESH_SECRET` | *(another random string, different from above)* |
| `JWT_EXPIRES_IN` | `15m` |
| `JWT_REFRESH_EXPIRES_IN` | `7d` |
| `FRONTEND_URL` | `https://duoextra.netlify.app` |

6. Click **"Create Web Service"**
7. Wait for the build to complete (5-10 minutes)
8. **COPY the Render URL** — it will be something like:
   ```
   https://duoextra-api.onrender.com
   ```

### 6C: Run Database Migration & Seed

After the backend deploys, you need to run the Prisma migration. In Render:

1. Go to your **duoextra-api** service
2. Click **"Shell"** tab (or use the console)
3. Run:
```bash
npx prisma migrate deploy
npx prisma db seed
```

**Alternative — from Termux** (if Render shell doesn't work on free plan):
```bash
# Install npm dependencies locally to get prisma CLI
cd ~/storage/downloads/duoextra/backend
npm install

# Run migration against Render database
DATABASE_URL="postgresql://USER:PASS@HOST:5432/duoextra" npx prisma migrate deploy
DATABASE_URL="postgresql://USER:PASS@HOST:5432/duoextra" npx prisma db seed
```
*(Replace the DATABASE_URL with your actual Render database URL)*

### 6D: Verify Backend

Open in your browser:
```
https://duoextra-api.onrender.com/api/docs
```
You should see the Swagger API documentation page.

---

## STEP 7: Deploy Frontend to Netlify

### 7A: Connect to Netlify

1. Go to https://app.netlify.com
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub**
4. Authorize Netlify to access your GitHub
5. Select the `duoextra` repository

### 7B: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Base directory** | `frontend` |
| **Build command** | `npm run build` |
| **Publish directory** | `frontend/.next` |

### 7C: Set Environment Variables

Click **"Show advanced"** → **"New variable"** and add:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | `https://duoextra-api.onrender.com/api` |
| `NEXT_PUBLIC_WS_URL` | `wss://duoextra-api.onrender.com` |
| `NEXT_PUBLIC_APP_NAME` | `DuoExtra` |

### 7D: Install Next.js Plugin

Under **"Build & deploy"** settings, make sure the **Next.js plugin** is installed:
- Go to Site Settings → Build & deploy → Plugins
- Search for `@netlify/plugin-nextjs`
- Install it

### 7E: Deploy

1. Click **"Deploy site"**
2. Wait for the build (3-5 minutes)
3. Netlify will assign a random URL like `random-name-123.netlify.app`

### 7F: Set Custom Domain (Optional)

1. Go to **Site Settings → Domain management**
2. Click **"Add custom domain"**
3. Or change the site name: **Site Settings → General → Site name** → change to `duoextra`
4. Your site will be at: `https://duoextra.netlify.app`

### 7G: Update Render CORS

Now go back to Render and update the `FRONTEND_URL` environment variable to match your actual Netlify URL:

```
FRONTEND_URL=https://duoextra.netlify.app
```

Render will auto-redeploy.

---

## STEP 8: Verify Everything Works

1. **Frontend:** Open `https://duoextra.netlify.app`
   - You should see the landing page
   - Click "Start Free" to register

2. **Backend API:** Open `https://duoextra-api.onrender.com/api/docs`
   - You should see Swagger documentation

3. **Test Registration:**
   - Go to the register page
   - Create an account
   - You should be redirected to onboarding

4. **Test Login:**
   - Use the demo account: `demo@duoextra.com` / `learner123!`
   - You should see the dashboard

---

## STEP 9: Future Updates from Termux

Whenever you make changes, push from Termux:

```bash
cd ~/storage/downloads/duoextra

# Check what changed
git status

# Add changes
git add .

# Commit with a message
git commit -m "feat: add new speaking exercises"

# Push to GitHub
git push
```

**Both Netlify and Render will auto-deploy** when you push to the `main` branch.

---

## Quick Reference — URLs

| Service | URL |
|---------|-----|
| GitHub Repo | `https://github.com/YOUR_USERNAME/duoextra` |
| Frontend (Netlify) | `https://duoextra.netlify.app` |
| Backend API (Render) | `https://duoextra-api.onrender.com/api` |
| API Docs (Swagger) | `https://duoextra-api.onrender.com/api/docs` |
| Render Dashboard | `https://dashboard.render.com` |
| Netlify Dashboard | `https://app.netlify.com` |

---

## Troubleshooting

### "Permission denied" when pushing to GitHub
```bash
# Make sure SSH key is loaded
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
ssh -T git@github.com
```

### Netlify build fails
- Check that Base directory is set to `frontend`
- Make sure the Next.js plugin is installed
- Check build logs for missing dependencies

### Render build fails
- Check that Root Directory is set to `backend`
- Verify DATABASE_URL is correct
- Check that all env vars are set

### "CORS error" in browser console
- Update `FRONTEND_URL` on Render to match your exact Netlify URL
- Include both `https://duoextra.netlify.app,http://localhost:3000` if testing locally too

### Database migration errors
- Run `npx prisma migrate deploy` (not `dev`) in production
- Check that DATABASE_URL has the correct password

### Free tier cold starts
- Render free tier sleeps after 15 min of inactivity
- First request after sleep takes ~30 seconds
- This is normal — upgrade to paid plan for always-on

### Termux can't access files
```bash
termux-setup-storage
# Then files are at ~/storage/downloads/ or ~/storage/shared/
```
