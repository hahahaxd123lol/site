const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static files

app.use(express.static('public'));
app.use(express.static('logos'));


// Discord webhook notification
function sendDiscordNotification(data) {
  if (!process.env.DISCORD_WEBHOOK_URL) {
    console.warn('Discord webhook URL not configured. Notification not sent.');
    return Promise.resolve();
  }

  const { name, email, productLink, originalPrice, halfPrice, size, paymentMethod, address, socialLinks } = data;

  const embed = {
    title: '🛍️ New Half-Price Order Request',
    color: 16711680, // Red color
    fields: [
      {
        name: '👤 Customer Name',
        value: name,
        inline: false,
      },

      {
        name: '📧 Preferred Contact',
        value: `${preferredContact}: ${contactDetails}`,
        inline: false,
      },
      {
        name: '🔗 Product Link',
        value: `[Click here](${productLink})`,
        inline: false,
      },
      {
        name: '💰 Original Price',
        value: `$${originalPrice}`,
        inline: true,
      },
      {
        name: '✨ Half Price',
        value: `$${halfPrice}`,
        inline: true,
      },
      {
        name: '📏 Size',
        value: size,
        inline: true,
      },
      {
        name: '💳 Payment Method',
        value: paymentMethod,
        inline: true,
      },
      {
        name: '📍 Delivery Address',
        value: `\`\`\`${address}\`\`\``,
        inline: false,
      },
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: 'Half-Price Orders System',
    },
  };

  if (socialLinks) {
    embed.fields.push({
      name: '📱 Social Links / Contact Info',
      value: `\`\`\`${socialLinks}\`\`\``,
      inline: false,
    });
  }

  return axios.post(process.env.DISCORD_WEBHOOK_URL, {
    embeds: [embed],
  }).catch(error => {
    console.error('Error sending Discord notification:', error.message);
  });
}

// Function to extract price from common e-commerce sites
async function extractPrice(url) {
  try {
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    };
    
    const response = await axios.get(url, { headers, timeout: 10000 });
    const $ = cheerio.load(response.data);
    
    // Try common price selectors
    const priceSelectors = [
      '[data-price]',
      '.price',
      '.product-price',
      '[class*="price"]',
      '[data-qa="product_price"]',
      '.item-price',
      '.current-price',
      'span[data-product-price]',
    ];

    let price = null;
    for (const selector of priceSelectors) {
      const text = $(selector).first().text();
      const match = text.match(/[\d,]+\.?\d*/);
      if (match) {
        price = parseFloat(match[0].replace(',', ''));
        if (price > 0) break;
      }
    }

    // Fallback: search in common price patterns in page text
    if (!price) {
      const pageText = $.html();
      const matches = pageText.match(/\$\s*([\d,]+\.?\d*)/);
      if (matches) {
        price = parseFloat(matches[1].replace(',', ''));
      }
    }

    return price;
  } catch (error) {
    console.error('Error extracting price:', error.message);
    throw new Error('Could not fetch product price. Please verify the URL is correct.');
  }
}

// Address search API endpoint (Nominatim)
app.get('/api/search-addresses', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || query.length < 3) {
      return res.json([]);
    }

    const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 5,
        countrycodes: 'us,gb,ca,au',
      },
      headers: {
        'User-Agent': 'HalfPriceHubAddressFinder/1.0'
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error('Address search error:', error.message);
    res.json([]);
  }
});

// API endpoint for form submission
app.post('/api/submit-order', async (req, res) => {
  try {
    const {
      productLinks,
      size,
      paymentMethod,
      name,
      preferredContact,
      contactDetails,
      socialLinks,
    } = req.body;

    // Validate required fields
    if (!productLinks || !productLinks.length || !size || !paymentMethod || !address || !name || !email) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }

    // Extract price from first product link
    const productLink = Array.isArray(productLinks) ? productLinks[0] : productLinks;
    const originalPrice = await extractPrice(productLink);
    if (!originalPrice) {
      return res.status(400).json({ error: 'Could not extract price from the product link' });
    }

    const halfPrice = (originalPrice / 2).toFixed(2);

    // Send Discord notification
    await sendDiscordNotification({
      name,
      email,
      productLink: Array.isArray(productLinks) ? productLinks.join('\\n') : productLinks,
      originalPrice: originalPrice.toFixed(2),
      halfPrice,
      size,
      paymentMethod,
      address,
      socialLinks,
    });

    res.json({
      success: true,
      message: 'Order submitted successfully!',
      data: {
        originalPrice: originalPrice.toFixed(2),
        halfPrice,
      },
    });
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: error.message || 'Failed to process order' });
  }
});

// Global statistics
let stats = {
  totalVisitors: 0,
  visitorsToday: 0,
  ordersCount: 0,
  lastReset: new Date(),
};

// Reset daily stats at midnight
setInterval(() => {
  const now = new Date();
  if (now.getDate() !== stats.lastReset.getDate()) {
    stats.visitorsToday = 0;
    stats.lastReset = now;
  }
}, 60000); // Check every minute

// Country flag mapping
const countryFlags = {
  US: '🇺🇸',
  GB: '🇬🇧',
  CA: '🇨🇦',
  AU: '🇦🇺',
  DE: '🇩🇪',
  FR: '🇫🇷',
  JP: '🇯🇵',
  IN: '🇮🇳',
  BR: '🇧🇷',
  MX: '🇲🇽',
  EU: '🇪🇺'
};

function getFlagForCountry(countryCode) {
  if (!countryCode) return '🌐';
  const code = countryCode.toUpperCase();
  // Convert country code to flag emoji (region indicators)
  const codePointOffset = 127397;
  const codePoints = [...code].map(char => codePointOffset + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Visitor info endpoint
app.get('/api/visitor-info', async (req, res) => {
  try {
    const clientIP = req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
    const cleanIP = clientIP.split(',')[0].trim();

    // Try to get geolocation data
    let geoData = {
      ip: cleanIP,
      country: 'Unknown',
      countryCode: '--',
      city: 'Unknown',
      region: 'Unknown',
      timezone: 'UTC',
      isp: 'Unknown',
      flag: '🌐',
    };

    try {
      const geoResponse = await axios.get(`https://ipapi.co/json/`, {
        timeout: 5000,
        headers: { 'User-Agent': 'Half Price Hub-Dashboard' }
      });

      if (geoResponse.data) {
        geoData = {
          ip: geoResponse.data.ip || cleanIP,
          country: geoResponse.data.country_name || 'Unknown',
          countryCode: geoResponse.data.country_code || '--',
          city: geoResponse.data.city || 'Unknown',
          region: geoResponse.data.region || 'Unknown',
          timezone: geoResponse.data.timezone || 'UTC',
          isp: geoResponse.data.org || 'Unknown',
          flag: getFlagForCountry(geoResponse.data.country_code),
        };
      }
    } catch (geoError) {
      console.log('Geolocation service unavailable:', geoError.message);
    }

    // Update stats
    stats.totalVisitors++;
    stats.visitorsToday++;

    res.json({
      ...geoData,
      totalVisitors: stats.totalVisitors,
      visitorsToday: stats.visitorsToday,
      ordersCount: stats.ordersCount,
    });
  } catch (error) {
    console.error('Error getting visitor info:', error);
    res.json({
      ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown',
      country: 'Unknown',
      countryCode: '--',
      city: 'Unknown',
      region: 'Unknown',
      timezone: 'UTC',
      isp: 'Unknown',
      flag: '🌐',
      error: 'Geolocation unavailable',
    });
  }
});

// Statistics endpoint
app.get('/api/stats', (req, res) => {
  res.json(stats);
});

// Increment order count
app.post('/api/order-submitted', (req, res) => {
  stats.ordersCount++;
  res.json({ success: true });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
