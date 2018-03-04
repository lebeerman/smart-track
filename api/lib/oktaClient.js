require('dotenv').config();
const okta = require('@okta/okta-sdk-nodejs');
const client = new okta.Client({
  orgUrl: 'https://dev-375655.oktapreview.com',
  token: process.env.OKTA_TOKEN
});

module.exports = client;
