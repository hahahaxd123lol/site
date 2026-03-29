# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Node.js Dependencies
Open PowerShell in this directory and run:
```powershell
npm install
```

### Step 2: Create Discord Webhook

1. Go to your **Discord Server**
2. Right-click a channel → **Edit Channel**
3. Go to **Integrations** → **Webhooks** → **New Webhook**
4. Name it "Half-Price Orders"
5. Click **Copy Webhook URL**

### Step 3: Create Your .env File

1. Copy `.env.example` and rename to `.env`
2. Open `.env` and paste your webhook URL:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-id/your-webhook-token
PORT=3000
```

✨ **No API key needed!** Address autocomplete uses free OpenStreetMap.

### Step 4: Start the Server

```powershell
npm start
```

You should see: `Server running on http://localhost:3000`

### Step 5: Visit Your Site

Open your browser and go to:
**http://localhost:3000**

## ✨ Test It Out

1. Find a product link (Amazon, Shopify, etc.)
2. Paste it in the form
3. For the address field - start typing your address and you'll see suggestions pop up!
4. Select a suggestion and it auto-fills the full address
5. Fill in remaining details
6. Click "Submit Half-Price Request"
7. **Check your Discord server** - you'll see a beautiful formatted message with all the details!

## 🛑 Stopping the Server

Press `Ctrl + C` in PowerShell

## 💡 Common Issues

**Discord notifications not showing?**
- Check the webhook URL is correct in `.env`
- Make sure the Discord bot has permissions in the channel
- Check your Discord server settings allow webhooks
- Look at the server console for errors (Ctrl + C to see)

**Port 3000 already in use?**
```powershell
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Price not showing?**
- Make sure the product URL is publicly accessible
- Some sites may block web scrapers
- Try a different product if it doesn't work

**No address suggestions appearing?**
- Make sure you're typing at least 3 characters
- Check server is running (should see messages in console)
- Try a city name or known address

## 📚 Next Steps

- Read the `README.md` for full documentation
- Customize the form in `public/index.html`
- Change colors/styling in `public/styles.css`
- Modify email templates in `server.js`

Enjoy! 🎉
