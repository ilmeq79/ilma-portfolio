# Fixing GitHub Authentication (403 Error)

The error `Permission denied to Ilmeq` means Git is trying to use the wrong GitHub account or credentials. Here's how to fix it:

## Option 1: Use Personal Access Token (Recommended)

GitHub no longer accepts passwords for Git operations. You need a **Personal Access Token**.

### Step 1: Create a Personal Access Token

1. Go to GitHub.com and sign in
2. Click your profile picture (top right) → **Settings**
3. Scroll down to **Developer settings** (bottom left)
4. Click **Personal access tokens** → **Tokens (classic)**
5. Click **Generate new token** → **Generate new token (classic)**
6. Give it a name: `Portfolio Project`
7. Select expiration: **90 days** (or your preference)
8. Check these permissions:
   - ✅ `repo` (Full control of private repositories)
9. Click **Generate token**
10. **COPY THE TOKEN IMMEDIATELY** - you won't see it again!

### Step 2: Use the Token in VS Code/Terminal

**In VS Code:**
1. When you try to push, VS Code will ask for credentials
2. **Username:** Your GitHub username (`ilmeq79`)
3. **Password:** Paste your **Personal Access Token** (not your GitHub password!)

**Or in Terminal:**
```bash
# When Git asks for password, paste your token
git push -u origin main
```

### Step 3: Save Credentials (Optional but Recommended)

After successful push, you can save credentials:

**Windows:**
```bash
git config --global credential.helper wincred
```

**Or use Git Credential Manager:**
```bash
git config --global credential.helper manager
```

## Option 2: Use SSH Instead of HTTPS

SSH is more secure and doesn't require entering tokens each time.

### Step 1: Generate SSH Key

```bash
# Generate SSH key (if you don't have one)
ssh-keygen -t ed25519 -C "your_email@example.com"

# Press Enter to accept default location
# Press Enter for no passphrase (or set one if you want)
```

### Step 2: Add SSH Key to GitHub

1. Copy your public key:
   ```bash
   # Windows (PowerShell)
   cat ~/.ssh/id_ed25519.pub | clip
   
   # Or manually open and copy:
   # C:\Users\YourUsername\.ssh\id_ed25519.pub
   ```

2. Go to GitHub.com → Settings → **SSH and GPG keys**
3. Click **New SSH key**
4. Title: `My Portfolio Project`
5. Key: Paste your public key
6. Click **Add SSH key**

### Step 3: Change Remote URL to SSH

```bash
# Check current remote
git remote -v

# Change to SSH
git remote set-url origin git@github.com:ilmeq79/ilma-portfolio.git

# Verify
git remote -v
```

### Step 4: Test SSH Connection

```bash
ssh -T git@github.com
# Should say: "Hi ilmeq79! You've successfully authenticated..."
```

### Step 5: Push Again

```bash
git push -u origin main
```

## Option 3: Verify Repository Exists

Make sure the repository exists on GitHub:

1. Go to: https://github.com/ilmeq79/ilma-portfolio
2. If it doesn't exist, create it:
   - Go to GitHub.com
   - Click **+** (top right) → **New repository**
   - Name: `ilma-portfolio`
   - Make it **Public** or **Private**
   - **Don't** initialize with README (you already have code)
   - Click **Create repository**

## Quick Fix: Clear Cached Credentials

If you're using wrong credentials:

**Windows:**
1. Open **Control Panel** → **Credential Manager**
2. Go to **Windows Credentials**
3. Find `git:https://github.com`
4. Click **Remove**
5. Try pushing again (it will ask for new credentials)

**Or via Command:**
```bash
git credential-manager-core erase
# Then enter: https://github.com
# Press Enter twice
```

## Troubleshooting

### Still Getting 403?

1. **Check your GitHub username:**
   ```bash
   git config --global user.name
   # Should match your GitHub username
   ```

2. **Check your email:**
   ```bash
   git config --global user.email
   # Should match your GitHub email
   ```

3. **Update if needed:**
   ```bash
   git config --global user.name "ilmeq79"
   git config --global user.email "your_email@example.com"
   ```

### VS Code Not Asking for Credentials?

1. Open VS Code Settings
2. Search for: `git.terminalAuthentication`
3. Make sure it's enabled
4. Or use terminal directly instead of VS Code UI

## Recommended: Use SSH

SSH is the best long-term solution:
- ✅ No need to enter tokens repeatedly
- ✅ More secure
- ✅ Works seamlessly with VS Code

Follow **Option 2** above to set up SSH.

