# ⚡ Quick Deployment Reference

## 🚀 **Fast Track (If You Already Know Git)**

### **1. Push to GitHub:**
```bash
cd "C:\Users\Ilma Kaukovic\Desktop\ilma"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

### **2. Deploy to Vercel:**
1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Add New Project"
4. Import your repository
5. Click "Deploy"
6. Go to Settings → Environment Variables
7. Add: `RESEND_API_KEY` = `your_api_key_here`
8. Redeploy

**Done!** ✅

---

## 📋 **Full Detailed Guide**

See `DEPLOYMENT_GUIDE.md` for complete step-by-step instructions with screenshots and troubleshooting.

---

## ⚠️ **IMPORTANT Before Pushing:**

1. ✅ Make sure `.env.local` is NOT committed (it's in `.gitignore`)
2. ✅ Make sure `RESEND_API_KEY` is NOT in your code
3. ✅ Test locally first: `npm run dev`
4. ✅ Make sure everything works before deploying

---

## 🔑 **Environment Variables to Add in Vercel:**

- **Key**: `RESEND_API_KEY`
- **Value**: Your Resend API key (from https://resend.com)
- **Environments**: Production, Preview, Development (check all)

---

## 🎯 **After Deployment:**

Your site will be live at: `https://your-project-name.vercel.app`

Test the contact form - it should send emails to `theoceansugar9@gmail.com`!

