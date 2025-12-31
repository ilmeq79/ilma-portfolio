# 🔧 Troubleshooting Email Issues

## ❌ Error: "Network error. Please check your connection and try again."

This error usually means one of these issues:

---

## ✅ **Step 1: Check if Resend Package is Installed**

Open your terminal and run:

```bash
npm install resend
```

Or if you're using yarn:

```bash
yarn add resend
```

**Then restart your development server:**
```bash
npm run dev
```

---

## ✅ **Step 2: Check if API Key is Set**

1. **Check if `.env.local` file exists** in your project root folder
   - It should be in the same folder as `package.json`

2. **Open `.env.local`** and check it contains:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
   - Replace `re_your_actual_api_key_here` with your real API key from Resend

3. **Make sure:**
   - No spaces around the `=` sign
   - No quotes around the API key
   - The API key starts with `re_`

**Example of CORRECT format:**
```
RESEND_API_KEY=re_1234567890abcdefghijklmnop
```

**Example of WRONG format:**
```
RESEND_API_KEY = re_1234567890abcdefghijklmnop  ❌ (spaces)
RESEND_API_KEY="re_1234567890abcdefghijklmnop"  ❌ (quotes)
RESEND_API_KEY=re_1234567890abcdefghijklmnop    ✅ (correct)
```

---

## ✅ **Step 3: Restart Development Server**

**After adding/changing `.env.local`:**

1. **Stop your server** (Ctrl+C in terminal)
2. **Start it again:**
   ```bash
   npm run dev
   ```

⚠️ **Important:** Environment variables are only loaded when the server starts. You MUST restart after changing `.env.local`!

---

## ✅ **Step 4: Check Browser Console**

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Try submitting the form again
4. Look for any error messages

**Common errors you might see:**
- `RESEND_API_KEY is not set` → API key missing
- `Cannot connect to server` → Server not running
- `Failed to fetch` → Network/connection issue

---

## ✅ **Step 5: Check Server Terminal**

Look at your terminal where `npm run dev` is running.

**You should see:**
- No errors about missing modules
- Server running on `http://localhost:3000`

**If you see errors:**
- `Cannot find module 'resend'` → Run `npm install resend`
- `RESEND_API_KEY is not set` → Check `.env.local` file

---

## ✅ **Step 6: Verify API Key**

1. Go to **https://resend.com**
2. Log in to your account
3. Go to **"API Keys"** section
4. Make sure your API key is **active** (not deleted/revoked)
5. Copy it again and update `.env.local` if needed

---

## ✅ **Step 7: Test the API Route Directly**

You can test if the API route works by:

1. Open: `http://localhost:3000/api/send-email` in your browser
   - You should see an error (because it's a POST request, not GET)
   - But if you see a response, the route exists

2. Or use a tool like **Postman** or **curl**:
   ```bash
   curl -X POST http://localhost:3000/api/send-email \
     -H "Content-Type: application/json" \
     -d '{"name":"Test","email":"test@example.com","message":"Test message"}'
   ```

---

## 🔍 **Common Issues & Solutions**

### **Issue 1: "Cannot find module 'resend'"**
**Solution:**
```bash
npm install resend
```

### **Issue 2: "RESEND_API_KEY is not set"**
**Solution:**
- Create `.env.local` file in project root
- Add: `RESEND_API_KEY=re_your_key_here`
- Restart server

### **Issue 3: "Network error" or "Failed to fetch"**
**Solutions:**
- Make sure server is running (`npm run dev`)
- Check if server is on correct port (usually 3000)
- Check browser console for CORS errors
- Try refreshing the page

### **Issue 4: "Email service is not configured"**
**Solution:**
- API key is missing or invalid
- Check `.env.local` file exists and has correct key
- Restart server after adding key

### **Issue 5: "Invalid API key"**
**Solution:**
- Get a new API key from Resend dashboard
- Update `.env.local` with new key
- Restart server

---

## 🧪 **Quick Test Checklist**

Run through this checklist:

- [ ] `npm install resend` completed successfully
- [ ] `.env.local` file exists in project root
- [ ] `.env.local` contains `RESEND_API_KEY=re_...`
- [ ] API key is correct (starts with `re_`)
- [ ] No spaces or quotes around API key
- [ ] Development server restarted after adding API key
- [ ] Server is running (`npm run dev`)
- [ ] Browser console shows no errors
- [ ] Server terminal shows no errors

---

## 🆘 **Still Not Working?**

1. **Check the server terminal** for detailed error messages
2. **Check browser console** (F12 → Console tab)
3. **Verify API key** in Resend dashboard
4. **Try creating a new API key** in Resend
5. **Make sure you're using the latest code** (pull latest changes if using Git)

---

## 📝 **Debug Mode**

To see more detailed errors, check:

1. **Server terminal** - Shows API route errors
2. **Browser console** (F12) - Shows frontend errors
3. **Network tab** (F12 → Network) - Shows API request/response

Look for:
- Status codes (200 = success, 500 = server error, 400 = bad request)
- Error messages in response
- Request payload (what data is being sent)

---

## ✅ **Expected Behavior When Working**

When everything is set up correctly:

1. ✅ Form submits without errors
2. ✅ "Sending..." shows briefly
3. ✅ Success popup appears
4. ✅ Email arrives in your inbox (check `theoceansugar9@gmail.com`)
5. ✅ No errors in browser console
6. ✅ No errors in server terminal

---

**Need more help?** Check the error messages in:
- Browser console (F12)
- Server terminal
- Resend dashboard (for delivery status)

