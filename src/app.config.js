export default {
  url: 'https://dev-375655.oktapreview.com',
  issuer: 'https://dev-375655.oktapreview.com',
  redirect_uri: window.location.origin + '/implicit/callback',
  client_id: '0oae2nm0diDWGUMxM0h7'
};

/*
const config = {
development: {
url: 'https://dev-375655.oktapreview.com',
issuer: 'https://dev-375655.oktapreview.com',
redirect_uri: window.location.origin + 'implicit/callback',
client_id: '0oae2nm0diDWGUMxM0h7'
},
production: {
url: 'https://dev-375655.oktapreview.com',
issuer: 'https://dev-375655.oktapreview.com',
redirect_uri: window.location.origin + 'implicit/callback',
client_id: '0oaecgiivxnjKc6IX0h7'
}
};

const env = process.env.NODE_ENV || 'development';
console.log(config[env]);
export default config[env]
*/