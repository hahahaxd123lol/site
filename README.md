
# Half Price Hub - Premium Half-Price Orders Platform

A stunning web application with **half-price product orders**, **visitor tracking with country flags**, and **real-time Discord notifications**.

## 🌟 What's Inside

### 📦 Half-Price Orders
- Submit product links → we scrape the price → calculate 50% off automatically
- Smart address autocomplete (free OpenStreetMap, no API keys)
- Instant Discord notifications with full order details
- Collect size, payment method, contact info, social links

###  Stunning Dashboard
- **🌍 Your IP with Country Flag** - Shows emoji flag for your country
- **💻 System Info** - Browser, OS, screen size, timezone
- **📡 Connection Details** - Network type, DNS details
- **📈 Live Statistics** - Visitor counts, order tracking
- **🎯 Quick Actions** - Fast links to all features

### ✨ Beautiful Modern UI
- Gradient designs with smooth animations
- Fully responsive (mobile, tablet, desktop)
- Real-time form validation
- Professional card layouts
- Dark shadows and hover effects
- Lightning-fast performance

## 🚀 Get Started in 2 Minutes

```powershell
# 1. Install dependencies
npm install

# 2. Add Discord webhook to .env
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN

# 3. Start server
npm start

# 4. Visit http://localhost:3000
```

## 📁 Pages & Features

| Page | Features |
|------|----------|
| **Home** | Feature showcase, quick links |
| **Orders** | Half-price form, address autocomplete |
| **Dashboard** | IP tracking, country flag, stats |

## 🔧 Key APIs

```
GET  /api/visitor-info          → Your IP, country, flag
GET  /api/stats                 → Visitor & order stats
GET  /api/search-addresses?q=   → Address suggestions
POST /api/submit-order          → Submit half-price order
POST /api/order-submitted       → Update order count
GET  /api/health                → Server status
```

## 💝 Special Features

✅ **Zero API Keys Needed** - Everything works free!
✅ **Instant Notifications** - Discord webhook integration
✅ **Automatic IP Detection** - Shows your country with flag
✅ **Smart Address Fill** - Type 3+ chars, get suggestions
✅ **Beautiful Design** - Gradients, animations, responsive
✅ **Real-time Stats** - Live visitor & order tracking
✅ **Daily Reset** - Statistics reset at midnight

## 📊 Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js + Express
- **Price Scraping**: Axios + Cheerio
- **APIs**: OpenStreetMap, ipapi.co
- **Webhooks**: Discord

##  Dashboard Highlights

Your dashboard shows:
- 🔵 **Your IP Address** (what website sees)
- 🚩 **Country Flag Emoji** (based on your location)
- 🏙️ **City & Region** (where you're from)
- 🌐 **Timezone** (your exact time zone)
- 💻 **Browser & OS** (your device info)
- 📺 **Screen Resolution** (your screen size)
- 📞 **ISP Name** (your internet provider)
- 👁️ **Visit Counter** (how many times visited)

## 📈 Statistics

Automatic tracking:
- Total visitors (all-time)
- Visitors today (resets daily)
- Orders submitted
- System information

## 🔐 Security

✅ Your `.env` is never shared (in .gitignore)
✅ Discord webhook kept private
✅ No data stored permanently
✅ Input validation on all forms
✅ CORS protection
✅ Rate limiting ready

## 🌐 Browser Support

Works great on:
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers

## 💻 Project Files

```
website/
├── public/
│   ├── index.html         (Homepage)
│   ├── orders.html        (Order form)
│   ├── dashboard.html     (Analytics)
│   ├── common.css         (Global styles)
│   ├── styles.css         (Order form styles)
│   └── script.js          (Order form logic)
├── server.js              (Backend + geolocation)
├── package.json           (Dependencies)
├── .env.example           (Config template)
└── README.md              (This file)
```

## 🚀 Deployment

Deploy instantly to:
- **Heroku** - `heroku create && git push heroku main`
- **Render** - Connect GitHub to Render
- **Railway** - Push GitHub repo
- **Docker** - Build & run container

## 📝 .env Setup

```bash
# Required - Get from your Discord server
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1487764732168638525/LRYjNMK1CXBEO9JK0_hO-7DYoB8i7XS4agj7JEFbMlZfmlCnWisN4JZ4UlrFlwJ2pMs3

# Optional - Defaults to 3000
PORT=3000
```

## ⭐ Key Highlights

| What | Status |
|------|--------|
| Half-Price Orders | ✅ Works |
| Discord Notifications | ✅ Instant |
| Address Autocomplete | ✅ Free |
| Visitor IP & Flag | ✅ Real-time |
| Responsive Design | ✅ Mobile Ready |
| Zero API Keys | ✅ 100% Free |
| Beautiful UI | ✅ Modern |
| Statistics | ✅ Live |

## 🎯 Next Steps

1. Run `npm install`
2. Create `.env` with webhook URL
3. Run `npm start`
4. Open http://localhost:3000
5. Explore all features!

## 💬 Questions?

Check:
- Browser console (F12) for errors
- Server logs for debugging
- `.env` file for configuration
- individual JS files for functionality

## 📄 License

MIT - Use freely & modify as needed!

---

**Built with ❤️ - Half Price Hub 2026**
**Your premium platform for half-price orders and visitor analytics!**

## Features

✨ **Key Features:**
- 🔗 Enter any product link and we'll fetch the current price
- 💰 Automatic 50% price calculation and display
- 📧 Email notifications for new orders
- 📝 Comprehensive customer information collection
- 🔐 Social links/contact information tracking
- ✅ Customer confirmation emails
- 🎨 Beautiful, responsive UI

## Prerequisites

- **Node.js** v14 or higher
- **npm** (comes with Node.js)
- **Discord Server** (for webhook notifications)
- Basic command line knowledge

## Installation & Setup

### 1. Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

### 2. Configure Discord Webhook

**Step 1: Create a Discord Webhook**
- Open your Discord server
- Go to a channel where you want notifications
- Click the ⚙️ (Settings gear) → Integrations
- Click "Webhooks" → "New Webhook"
- Name it "Half-Price Orders" or anything you like
- Click "Copy Webhook URL"

**Step 2: Create `.env` file**
- Copy the `.env.example` file and rename it to `.env`
- Update the following value:

```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_ID/YOUR_TOKEN
```

**Example:**
```
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/1487764732168638525/LRYjNMK1CXBEO9JK0_hO-7DYoB8i7XS4agj7JEFbMlZfmlCnWisN4JZ4UlrFlwJ2pMs3
```

That's it! Address autocomplete uses **free OpenStreetMap** - no API key needed! 🎉

### 3. Start the Server

```powershell
npm start
```

You should see:
```
Server running on http://localhost:3000
```

### 5. Open in Browser

Visit: **http://localhost:3000**

## Usage

### For Customers

1. **Enter Product Link**: Paste any product URL (Amazon, Shopify, etc.)
2. **Fill Details**: Enter size, payment method, name, and contact info
3. **Add Social Links** (optional): Instagram, Discord, phone, etc.
4. **Submit**: Click the submit button
5. **Receive Confirmation**: Check your email for confirmation
6. **See Price**: The website displays original and half-price

### For You (Website Owner)

- Set `ADMIN_EMAIL` in `.env` to receive order notifications
- For each submission, you'll get an email with:
  - Customer's full information
  - Product link and price details
  - Their preferred payment method
  - Delivery address
  - Contact information
  - Reply-to email for direct contact

## Supported Price Extraction

The system attempts to extract prices from:
- Amazon
- eBay
- Shopify stores
- Major e-commerce sites
- Custom websites (best effort)

**Note**: Some websites may require additional configuration or might block automated price fetching for security reasons.

## Troubleshooting

### Server Won't Start
```powershell
# Kill any process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then try again
npm start
```

### Emails Not Sending

**Check your `.env` file:**
- Email and password are correct
- Email service is set to "gmail"
- Gmail has 2-step verification enabled
- Using an app password (not your Gmail password)

**Test email configuration:**
The server logs email errors in the console.

### Price Not Extracting

Some websites block automated access. Try:
1. Verifying the URL works in your browser
2. Making sure it's a public product page
3. Checking if the site has price information visible

## Development Mode

To auto-restart server on file changes:

```powershell
npm run dev
```

(Requires `nodemon` - included in devDependencies)

## Project Structure

```
website/
├── public/
│   ├── index.html          # Main form page
│   ├── styles.css          # Styling
│   └── script.js           # Frontend logic
├── server.js               # Express backend & price scraping
├── package.json            # Dependencies
├── .env.example            # Environment template
├── .env                    # Your secret config (don't share!)
└── README.md              # This file
```

## How It Works

1. **Frontend**: Customer fills out form
2. **Submission**: JavaScript sends data to backend
3. **Price Scraping**: Backend fetches product page and extracts price
4. **Calculation**: Server divides price by 2
5. **Discord Notification**: 
   - Beautiful embed sent to your Discord server
   - Contains all customer details
   - Includes product link, prices, address, contact info
6. **Response**: Frontend shows success with calculated prices

## Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Backend**: Node.js, Express.js
- **Web Scraping**: Axios, Cheerio
- **Notifications**: Discord Webhooks
- **Address Search**: Nominatim (OpenStreetMap)
- **Configuration**: dotenv

## Security Notes

⚠️ **Important:**
- Never commit `.env` file to git
- Don't share your email app password
- Consider implementing rate limiting for production
- Validate all user inputs on the backend (already done)
- Use HTTPS in production

## Customization

### Change Form Fields
Edit `public/index.html` - modify the form inputs

### Change Email Template
Edit `server.js` - look for the `emailContent` variable

### Change Price Selectors
Edit `server.js` - modify the `priceSelectors` array to support more sites

### Change Styling
Edit `public/styles.css` - customize colors, fonts, layout

## Deployment

For production deployment:

1. Use services like **Heroku**, **Render**, or **Railway**
2. Set environment variables in production dashboard
3. Use environment-specific configurations
4. Add HTTPS certificate
5. Consider adding:
   - Rate limiting
   - Request logging
   - Error tracking (Sentry)
   - Database (MongoDB, PostgreSQL)

## Support & Help

If you encounter issues:

1. Check the browser console (F12) for frontend errors
2. Check server terminal output for backend errors
3. Verify `.env` file is correctly configured
4. Make sure the product URL is accessible

## License

MIT License - Feel free to use and modify!

## Future Enhancements

Consider adding:
- Order history/database
- Payment processing integration
- Admin dashboard
- Order tracking
- SMS notifications
- Multiple language support
- Image upload
- Inventory management
