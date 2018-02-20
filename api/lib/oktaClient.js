const okta = require('@okta/okta-sdk-nodejs');
const client = new okta.Client({
  orgUrl: 'dev-375655.oktapreview.com',
  token: '002ivEToJGZDN7hnlQSyWOAz-3-mbo1dZ4F0chhVQA'
});

module.exports = client;
