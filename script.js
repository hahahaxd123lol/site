// Hardcoded Discord webhook URL for owner-only webhook tests and order alerts
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1487764732168638525/LRYjNMK1CXBEO9JK0_hO-7DYoB8i7XS4agj7JEFbMlZfmlCnWisN4JZ4UlrFlwJ2pMs3';

// Initialize address autocomplete using Nominatim (free, no API key needed)
let debounceTimer;
let selectedPlace = null;

async function sendDiscordWebhook(content) {
  try {
    const res = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content }),
    });

    if (!res.ok) {
      throw new Error(`Webhook returned ${res.status}`);
    }

    return true;
  } catch (err) {
    console.error('Discord webhook error:', err);
    return false;
  }
}

function initializeAddressAutocomplete() {
  const addressInput = document.getElementById('address');
  const suggestionsDiv = document.getElementById('addressSuggestions');
  const addressDisplay = document.getElementById('addressFull');

  // Handle input with debouncing


  // Hide suggestions when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.matches('#address')) {
      suggestionsDiv.classList.add('hidden');
    }
  });
}

async function fetchAddressSuggestions(query, suggestionsDiv, addressInput, addressDisplay) {
  try {
    const response = await fetch(`/api/search-addresses?q=${encodeURIComponent(query)}`);
    const results = await response.json();

    suggestionsDiv.innerHTML = '';

    if (!results || results.length === 0) {
      suggestionsDiv.classList.add('hidden');
      return;
    }

    results.forEach((result) => {
      const div = document.createElement('div');
      div.className = 'address-suggestion-item';
      div.textContent = result.display_name;
      div.addEventListener('click', () => {
        selectedPlace = result.place_id;
        addressInput.value = result.display_name;
        addressDisplay.value = result.display_name;
        suggestionsDiv.classList.add('hidden');
      });
      suggestionsDiv.appendChild(div);
    });

    suggestionsDiv.classList.remove('hidden');
  } catch (error) {
    console.error('Error fetching address suggestions:', error);
    suggestionsDiv.classList.add('hidden');
  }
}

// Initialize when page loads
window.addEventListener('load', initializeAddressAutocomplete);

// Dynamic product links + contact method update + tech checkbox
document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.getElementById('addProductBtn');
  const container = document.getElementById('productLinksContainer');
  const contactSelect = document.getElementById('preferredContact');
  const contactInput = document.getElementById('contactDetails');
  const techCheckbox = document.getElementById('techOrder');
  const sizeInput = document.getElementById('size');
  
  if (addBtn && container) {
    addBtn.addEventListener('click', function() {
      const currentCount = container.querySelectorAll('.product-link-input').length;
      if (currentCount >= 5) {
        alert('Maximum 5 product links allowed.');
        return;
      }
      
      const newRow = document.createElement('div');
      newRow.className = 'product-link-row';
      newRow.innerHTML = '<input type="url" class="product-link-input" placeholder="https://example.com/product" required>';
      container.appendChild(newRow);
    });
  }
  
  if (contactSelect && contactInput) {
    contactSelect.addEventListener('change', function() {
      const method = this.value;
      const examples = {
        'email': 'your.email@example.com',
        'discord': 'yourdiscord#1234',
        'instagram': 'yourusername',
        'snapchat': 'yourusername',
        'telegram': '@yourusername'
      };
      contactInput.placeholder = examples[method] || 'Enter your contact details';
    });
  }

  if (techOrder && sizeGroup) {
    techOrder.addEventListener('change', function() {
      sizeGroup.style.display = this.value === 'yes' ? 'none' : 'block';
    });
  }
});

// Handle form submission
document.getElementById('orderForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const loading = document.getElementById('loading');
  const errorMessage = document.getElementById('errorMessage');

  // Clear previous messages
  errorMessage.classList.add('hidden');
  loading.classList.remove('hidden');
  submitBtn.disabled = true;

  try {
    // Collect product links
    const productLinks = Array.from(document.querySelectorAll('.product-link-input'))
      .map(input => input.value.trim())
      .filter(url => url);

    if (productLinks.length === 0) {
      throw new Error('At least one product link is required');
    }

    // Use the formatted address display
    const address = document.getElementById('addressFull').value || document.getElementById('address').value;
    
    if (!address) {
      throw new Error('Please select an address from suggestions');
    }


  const techOrder = document.getElementById('techOrder').value;
    const sizeValue = techOrder === 'yes' ? 'Tech Order - One Size' : document.getElementById('size').value;
    
    const data = {
      productLinks: productLinks,  // Array instead of single
      size: sizeValue,
      paymentMethod: document.getElementById('paymentMethod').value,
      name: document.getElementById('name').value,
      preferredContact: document.getElementById('preferredContact').value,
      contactDetails: document.getElementById('contactDetails').value,
      socialLinks: document.getElementById('socialLinks').value || '',
    };


    const response = await fetch('/api/submit-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit order');
    }

    // Redirect to confirmation page
    window.location.href = `/order-confirmation.html?success=true&price=${result.data.originalPrice}&half=${result.data.halfPrice}`;

    // Send confirmation webhook
    const hookContent = `Order submitted: ${data.name} (${data.email}), Products: ${productLinks.join(', ')}, ${data.address}`;
    sendDiscordWebhook(hookContent);

    // Update stats
    fetch('/api/order-submitted', { method: 'POST' }).catch(e => console.log('Stats not updated'));

  } catch (error) {
    console.error('Error:', error);
    loading.classList.add('hidden');
    document.getElementById('errorText').textContent = error.message;
    errorMessage.classList.remove('hidden');
    submitBtn.disabled = false;
  }
});



