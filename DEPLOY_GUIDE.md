# 🚀 Deploy Rixo Salesbot on Koyeb — FREE FOREVER
## No credit card • No expiry • 24x7 online • 5 minutes setup

---

## ⚠️ Why NOT Railway?
Railway is **NOT free** anymore:
- 30-day trial → only $5 credits
- After that → minimum **$5/month**

## ✅ Why Koyeb?
- **Forever free** — no 30-day limit
- **512MB RAM** — more than enough for your bot
- **No credit card** required (for most users)
- **Always running** — no sleeping like some other platforms
- **Permanent HTTPS URL** — e.g. `your-bot.koyeb.app`

---

## 📁 Files You Need (already done!)
```
rixo-koyeb/
├── bot.js          ← Main bot (cloud version, no ngrok)
└── package.json    ← Dependencies
```

---

## 🛤️ STEP 1 — Push Code to GitHub (FREE)

### If you don't have GitHub:
1. Go to **https://github.com** → Sign up free
2. Verify your email

### Create a repository:
1. Click the **"+"** icon → **New repository**
2. Name it: `rixo-salesbot`
3. Set to **Private** (safer for tokens)
4. Click **Create repository**

### Upload your files:
1. On the repo page, click **"uploading an existing file"**
2. Drag and drop both `bot.js` and `package.json`
3. Click **"Commit changes"** (green button)

✅ Your code is now on GitHub!

---

## 🌐 STEP 2 — Deploy on Koyeb

### Create free account:
1. Go to **https://koyeb.com**
2. Click **"Get started for free"**
3. Sign up with **GitHub** (easiest — one click!)

### Create a new service:
1. After login, click **"Create Service"**
2. Select **"Web Service"**
3. Select **"GitHub"** as source

### Connect your repo:
1. Click **"Install GitHub App"** → authorize Koyeb
2. Select your `rixo-salesbot` repository
3. Select branch: **main**

### Configure the service:
Fill in these settings:

| Setting | Value |
|---------|-------|
| **Name** | rixo-salesbot |
| **Region** | Singapore (closest to India) |
| **Instance type** | Free (512 MB) |
| **Build command** | `npm install` |
| **Start command** | `node bot.js` |
| **Port** | 3000 |

### ⚠️ ADD ENVIRONMENT VARIABLE (VERY IMPORTANT):
Before deploying, scroll down to **"Environment variables"**:

| Variable Name | Value |
|--------------|-------|
| `BOT_TOKEN` | Paste your Telegram bot token here |

> ✅ This keeps your token SECRET — never paste it directly in code!

### Deploy:
1. Click **"Deploy"** button
2. Wait 2-3 minutes for build to complete
3. You'll see a green ✅ when done

---

## 🔗 STEP 3 — Activate Webhook (ONE TIME)

After deployment succeeds:

1. Koyeb gives you a URL like:
   ```
   https://rixo-salesbot-xxxx.koyeb.app
   ```
2. Copy that URL and open this in your browser:
   ```
   https://rixo-salesbot-xxxx.koyeb.app/setup
   ```
3. You'll see: **"✅ Bot is LIVE!"**

That's it! Your bot is now active 24x7 on Koyeb! 🎉

---

## 📊 STEP 4 — Access Your Leads Dashboard

Visit anytime from any device:
```
https://rixo-salesbot-xxxx.koyeb.app/leads
```

Download leads anytime:
```
https://rixo-salesbot-xxxx.koyeb.app/export
```

> ⚠️ Export leads regularly! They reset when you redeploy.

---

## 📣 STEP 5 — Share Your Bot

Your bot link is always:
```
https://t.me/YOUR_BOT_USERNAME
```

**Paste this link everywhere:**
- Instagram bio
- Facebook page description  
- WhatsApp status & broadcasts
- Reels & post captions
- Business visiting cards
- Email signature

---

## 🔄 How to Update the Bot Later

When you want to change the sales pitch or fix something:
1. Edit `bot.js` on GitHub directly (click the file → pencil icon)
2. Commit the changes
3. Koyeb **auto-redeploys** within 2-3 minutes!

No manual steps needed — it's automatic. ✅

---

## ❓ Common Issues

| Problem | Fix |
|---------|-----|
| Build failed | Check package.json is correct |
| Bot not responding | Visit `/setup` again |
| "BOT_TOKEN invalid" | Re-check environment variable in Koyeb dashboard |
| Leads lost | Export them before redeploying |
| Need to change token | Update env variable in Koyeb → Settings → Environment |

---

## 🆚 Platform Comparison

| Platform | Free? | Sleeps? | Time Limit |
|----------|-------|---------|------------|
| **Koyeb** ✅ | Forever | No | None |
| Railway | Trial only | No | 30 days |
| Render | Yes (limited) | Yes (30 min) | None |
| Heroku | ❌ No | — | — |
| Your Laptop | Yes | When off | — |

**Koyeb wins for 24/7 free hosting!** 🏆

---
*Rixo.in Salesbot — Made with ❤️ in India*
