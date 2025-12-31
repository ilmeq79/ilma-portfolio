# 📧 Email Setup Instructions - Complete Guide

This guide will help you set up **real email functionality** for your contact form using **Resend** (free, secure, and easy to use).

---

## 🎯 What We're Using: Resend

**Resend** is a modern email API service that:
- ✅ **FREE** tier: 100 emails/day, 3,000 emails/month
- ✅ **Secure**: API keys, no passwords exposed
- ✅ **Easy**: Simple setup, great documentation
- ✅ **Reliable**: Professional email delivery
- ✅ **Perfect for Next.js**: Works seamlessly

---

## 📋 Step-by-Step Setup

### **Step 1: Create a Resend Account**

1. Go to **https://resend.com**
2. Click **"Sign Up"** (you can use GitHub, Google, or email)
3. Verify your email address
4. Complete the signup process

---

### **Step 2: Get Your API Key**

1. Once logged in, go to **"API Keys"** in the sidebar
2. Click **"Create API Key"**
3. Give it a name (e.g., "Portfolio Contact Form")
4. Select **"Sending access"** (not "Full access" for security)
5. Click **"Add"**
6. **COPY THE API KEY** - you'll need it in the next step!
   - ⚠️ **Important**: You can only see it once. Copy it now!

---

### **Step 3: Add API Key to Your Project**

1. In your project root folder, create a file named `.env.local`
   - If it already exists, just open it
2. Add this line to the file:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
   - Replace `re_your_api_key_here` with the API key you copied
   - **Example**: `RESEND_API_KEY=re_1234567890abcdef`

3. **Save the file**

⚠️ **IMPORTANT**: 
- Never commit `.env.local` to GitHub (it's already in `.gitignore`)
- Never share your API key publicly

---

### **Step 4: Install the Resend Package**

Open your terminal in the project folder and run:

```bash
npm install resend
```

Or if you're using yarn:

```bash
yarn add resend
```

---

### **Step 5: Update Your Email Address**

1. Open the file: `app/api/send-email/route.ts`
2. Find this line (around line 30):
   ```typescript
   to: ['ilmeq@icloud.com'], // Your email address
   ```
3. Replace `ilmeq@icloud.com` with **your actual email address** where you want to receive messages
4. Save the file

---

### **Step 6: Test It Locally**

1. Make sure your development server is running:
   ```bash
   npm run dev
   ```

2. Go to your contact form on `http://localhost:3000`

3. Fill out the form and submit it

4. Check your email inbox - you should receive the message!

---

## 🚀 Deploying to Production

### **For Vercel (Recommended):**

1. Push your code to GitHub
2. Go to **Vercel.com** and import your project
3. In Vercel project settings, go to **"Environment Variables"**
4. Add a new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your Resend API key (the same one from Step 2)
5. Click **"Save"**
6. Redeploy your project

### **For Other Platforms:**

Add the `RESEND_API_KEY` environment variable in your hosting platform's settings:
- **Netlify**: Site settings → Environment variables
- **Railway**: Variables tab
- **Render**: Environment section

---

## 🔒 Security Notes

✅ **What's Secure:**
- API key is stored in environment variables (not in code)
- API key is never exposed to the frontend
- All email sending happens on the server (API route)
- Input validation prevents spam/abuse

✅ **Best Practices:**
- Never commit `.env.local` to Git
- Use different API keys for development and production
- Monitor your Resend dashboard for any issues
- Set up rate limiting if needed (Resend has built-in limits)

---

## 📧 Customizing the Email

You can customize the email template in `app/api/send-email/route.ts`:

- **Change the "from" email**: Update the `from` field (you'll need to verify your domain first)
- **Change the subject**: Modify the `subject` field
- **Change the email design**: Edit the HTML in the `html` field
- **Add more recipients**: Add more emails to the `to` array

---

## 🆘 Troubleshooting

### **Email not sending?**

1. Check that `RESEND_API_KEY` is set correctly in `.env.local`
2. Check the browser console for errors
3. Check the terminal/console for server errors
4. Verify your API key is active in Resend dashboard
5. Make sure you haven't exceeded the free tier limits

### **Getting "Invalid API Key" error?**

- Make sure you copied the entire API key (it starts with `re_`)
- Check for extra spaces in `.env.local`
- Restart your development server after adding the key

### **Not receiving emails?**

- Check your spam folder
- Verify the `to` email address is correct in `route.ts`
- Check Resend dashboard for delivery status
- Make sure your email provider isn't blocking the emails

---

## 💰 Pricing (Free Tier)

- **100 emails per day**
- **3,000 emails per month**
- Perfect for personal portfolios!

If you need more, paid plans start at $20/month.

---

## ✅ You're All Set!

Once you complete these steps, your contact form will:
- ✅ Send real emails to your inbox
- ✅ Work securely with API keys
- ✅ Be free to use (within limits)
- ✅ Work in production when deployed

**Questions?** Check Resend documentation: https://resend.com/docs

---

## 📝 Quick Checklist

- [ ] Created Resend account
- [ ] Got API key from Resend
- [ ] Added `RESEND_API_KEY` to `.env.local`
- [ ] Installed `resend` package (`npm install resend`)
- [ ] Updated email address in `app/api/send-email/route.ts`
- [ ] Tested locally - received test email
- [ ] Added environment variable to production hosting (Vercel/etc.)
- [ ] Tested in production

**Done! 🎉**

