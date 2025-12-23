require('dotenv').config();          // must be first
const paypal = require('paypal-rest-sdk');  // make sure paypal is defined

// sanitize env variables
const mode = (process.env.PAYPAL_MODE || 'sandbox').trim();
const clientId = (process.env.PAYPAL_CLIENT_ID || '').trim();
const clientSecret = (process.env.PAYPAL_CLIENT_SECRET || '').trim();

console.log("✅ PayPal mode after trim:", mode);

paypal.configure({
  mode: mode,        // must be 'sandbox' or 'live'
  client_id: clientId,
  client_secret: clientSecret
});

module.exports = paypal;
