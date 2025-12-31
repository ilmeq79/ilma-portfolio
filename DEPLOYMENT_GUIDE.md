# 🚀 Complete Deployment Guide: GitHub + Vercel

This guide will walk you through **every single step** to push your code to GitHub and deploy to Vercel.

---

## 📋 **PART 1: Setting Up GitHub**

### **Step 1: Create a GitHub Account (if you don't have one)**

1. Go to **https://github.com**
2. Click **"Sign up"**
3. Enter your email, create a password, and choose a username
4. Verify your email address
5. Complete the setup

---

### **Step 2: Install Git (if not already installed)**

**Check if Git is installed:**
1. Open your terminal/command prompt
2. Type: `git --version`
3. If you see a version number, Git is installed ✅
4. If you see an error, install Git:

**For Windows:**
- Download from: https://git-scm.com/download/win
- Run the installer
- Use default settings
- Restart your terminal after installation

**For Mac:**
- Git usually comes pre-installed
- If not: `brew install git` (if you have Homebrew)
- Or download from: https://git-scm.com/download/mac

---

### **Step 3: Configure Git (First Time Setup)**

Open your terminal and run these commands (replace with YOUR info):

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

**Example:**
```bash
git config --global user.name "Ilma Kaukovic"
git config --global user.email "theoceansugar9@gmail.com"
```

This tells Git who you are (only needed once).

---

### **Step 4: Create a New GitHub Repository**

1. Go to **https://github.com** and log in
2. Click the **"+"** icon in the top right corner
3. Click **"New repository"**
4. Fill in the details:
   - **Repository name**: `ilma-portfolio` (or any name you want)
   - **Description**: "My portfolio website" (optional)
   - **Visibility**: Choose **"Public"** (free) or **"Private"** (if you have GitHub Pro)
   - **DO NOT** check "Initialize with README" (we already have code)
   - **DO NOT** add .gitignore or license (we already have these)
5. Click **"Create repository"**

---

### **Step 5: Initialize Git in Your Project**

1. **Open your terminal/command prompt**
2. **Navigate to your project folder:**
   ```bash
   cd "C:\Users\Ilma Kaukovic\Desktop\ilma"
   ```
   (Or wherever your project is located)

3. **Initialize Git repository:**
   ```bash
   git init
   ```

4. **Check status:**
   ```bash
   git status
   ```
   You should see a list of files that need to be added.

---

### **Step 6: Create .gitignore (if not exists)**

Make sure you have a `.gitignore` file that excludes sensitive files:

**Check if it exists:**
```bash
dir .gitignore
```
(Windows) or
```bash
ls .gitignore
```
(Mac/Linux)

**If it doesn't exist, create it:**
1. Create a file named `.gitignore` in your project root
2. Add these lines:
   ```
   # dependencies
   /node_modules
   /.pnp
   .pnp.js

   # testing
   /coverage

   # next.js
   /.next/
   /out/

   # production
   /build

   # misc
   .DS_Store
   *.pem

   # debug
   npm-debug.log*
   yarn-debug.log*
   yarn-error.log*

   # local env files
   .env*.local
   .env

   # vercel
   .vercel

   # typescript
   *.tsbuildinfo
   next-env.d.ts
   ```

**Important:** This ensures `.env.local` (with your API key) is NOT uploaded to GitHub!

---

### **Step 7: Add All Files to Git**

```bash
git add .
```

This adds all your files to Git (except those in `.gitignore`).

**Verify what will be committed:**
```bash
git status
```

You should see all your files listed in green.

---

### **Step 8: Make Your First Commit**

```bash
git commit -m "Initial commit: Portfolio website"
```

This saves your files to Git with a message.

---

### **Step 9: Connect to GitHub Repository**

1. **Copy your GitHub repository URL:**
   - Go to your GitHub repository page
   - Click the green **"Code"** button
   - Copy the HTTPS URL (looks like: `https://github.com/yourusername/ilma-portfolio.git`)

2. **Add GitHub as remote:**
   ```bash
   git remote add origin https://github.com/yourusername/ilma-portfolio.git
   ```
   (Replace with YOUR repository URL)

3. **Verify it was added:**
   ```bash
   git remote -v
   ```
   You should see your repository URL listed.

---

### **Step 10: Push to GitHub**

```bash
git branch -M main
git push -u origin main
```

**If you're asked for credentials:**
- **Username**: Your GitHub username
- **Password**: You'll need a **Personal Access Token** (not your GitHub password)

**To create a Personal Access Token:**
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click **"Generate new token"**
3. Give it a name: "Portfolio Deployment"
4. Select scopes: Check **"repo"** (full control of private repositories)
5. Click **"Generate token"**
6. **COPY THE TOKEN** (you can only see it once!)
7. Use this token as your password when pushing

**After pushing, you should see:**
```
Enumerating objects: X, done.
Writing objects: 100% (X/X), done.
To https://github.com/...
```

✅ **Your code is now on GitHub!**

---

## 📋 **PART 2: Deploying to Vercel**

### **Step 11: Create Vercel Account**

1. Go to **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"** (easiest option)
4. Authorize Vercel to access your GitHub account
5. Complete the signup

---

### **Step 12: Import Your GitHub Repository**

1. Once logged into Vercel, you'll see the dashboard
2. Click **"Add New..."** → **"Project"**
3. You'll see a list of your GitHub repositories
4. Find your repository (e.g., `ilma-portfolio`)
5. Click **"Import"** next to it

---

### **Step 13: Configure Project Settings**

Vercel will auto-detect Next.js, but verify:

1. **Framework Preset**: Should be **"Next.js"** ✅
2. **Root Directory**: Leave as **"./"** (unless your Next.js app is in a subfolder)
3. **Build Command**: Leave default (usually `npm run build`)
4. **Output Directory**: Leave default (usually `.next`)
5. **Install Command**: Leave default (usually `npm install`)

**Click "Deploy"** (don't worry about environment variables yet - we'll add them after)

---

### **Step 14: Wait for Deployment**

1. Vercel will start building your project
2. You'll see a progress log
3. This takes 1-3 minutes
4. **It will fail the first time** (because we haven't added the API key yet - that's OK!)

---

### **Step 15: Add Environment Variables**

**After the first deployment (even if it failed):**

1. Go to your project dashboard in Vercel
2. Click on **"Settings"** (top menu)
3. Click **"Environment Variables"** (left sidebar)
4. Click **"Add New"**
5. Add your Resend API key:
   - **Key**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (starts with `re_`)
   - **Environment**: Select **"Production"**, **"Preview"**, and **"Development"** (or just **"Production"**)
6. Click **"Save"**

**Important:** 
- The value should be your actual API key (the one from Resend)
- Don't include quotes or spaces
- Make sure all three environments are selected if you want it to work everywhere

---

### **Step 16: Redeploy**

1. Go to the **"Deployments"** tab
2. Find your latest deployment
3. Click the **"..."** (three dots) menu
4. Click **"Redeploy"**
5. Confirm by clicking **"Redeploy"** again

**OR** simply push a new commit to trigger a new deployment:
```bash
git add .
git commit -m "Add environment variables"
git push
```

---

### **Step 17: Verify Deployment**

1. Once deployment completes, you'll see a **"Visit"** button
2. Click it to see your live website!
3. Your site URL will be: `https://your-project-name.vercel.app`

**Test your contact form:**
- Fill it out and submit
- Check your email (`theoceansugar9@gmail.com`)
- You should receive the message!

---

## 🎯 **PART 3: Custom Domain (Optional)**

### **Step 18: Add Your Own Domain**

1. In Vercel project settings, go to **"Domains"**
2. Enter your domain name (e.g., `ilmakaukovic.com`)
3. Follow Vercel's instructions to:
   - Add DNS records to your domain provider
   - Wait for DNS propagation (can take up to 48 hours)
4. Once verified, your site will be live on your custom domain!

---

## ✅ **Quick Reference Commands**

**For future updates, use these commands:**

```bash
# Navigate to project
cd "C:\Users\Ilma Kaukovic\Desktop\ilma"

# Check status
git status

# Add all changes
git add .

# Commit changes
git commit -m "Description of what you changed"

# Push to GitHub
git push

# Vercel will automatically deploy!
```

---

## 🆘 **Troubleshooting**

### **Issue: "git: command not found"**
**Solution:** Install Git (see Step 2)

### **Issue: "Permission denied" when pushing**
**Solution:** 
- Use Personal Access Token instead of password
- Make sure you have write access to the repository

### **Issue: "Failed to deploy" on Vercel**
**Solutions:**
- Check build logs in Vercel dashboard
- Make sure `RESEND_API_KEY` is set in environment variables
- Check that all dependencies are in `package.json`
- Make sure `.env.local` is in `.gitignore` (don't commit it!)

### **Issue: "Module not found" errors**
**Solution:**
- Make sure `package.json` has all dependencies
- Run `npm install` locally to verify
- Check that `node_modules` is in `.gitignore`

### **Issue: Contact form not working after deployment**
**Solution:**
- Verify `RESEND_API_KEY` is added in Vercel environment variables
- Make sure it's set for "Production" environment
- Redeploy after adding the variable
- Check Vercel function logs for errors

---

## 📝 **Checklist**

Before deploying, make sure:

- [ ] Git is installed and configured
- [ ] GitHub account created
- [ ] GitHub repository created
- [ ] `.gitignore` file exists and includes `.env*.local`
- [ ] Code pushed to GitHub successfully
- [ ] Vercel account created
- [ ] Project imported from GitHub
- [ ] `RESEND_API_KEY` added to Vercel environment variables
- [ ] Deployment successful
- [ ] Website is live and working
- [ ] Contact form tested and working

---

## 🎉 **You're Done!**

Your portfolio is now:
- ✅ On GitHub (version controlled)
- ✅ Deployed on Vercel (live on the internet)
- ✅ Contact form working (emails sent to your inbox)
- ✅ Secure (API keys not exposed)

**Your live website URL:** `https://your-project-name.vercel.app`

**Share it with the world!** 🌍

---

## 💡 **Pro Tips**

1. **Every time you make changes:**
   - `git add .`
   - `git commit -m "What you changed"`
   - `git push`
   - Vercel auto-deploys!

2. **Check deployment status:**
   - Vercel dashboard shows all deployments
   - Green = success, Red = failed

3. **View logs:**
   - Click on any deployment in Vercel
   - See build logs and function logs
   - Helps debug issues

4. **Environment variables:**
   - Never commit `.env.local` to GitHub
   - Always add them in Vercel dashboard
   - Different values for dev/prod if needed

---

**Need help?** Check the error messages in:
- Vercel deployment logs
- Browser console (F12)
- Terminal/command prompt

Good luck! 🚀

