require('dotenv').config();

module.exports = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GOOGLE_API_KEY,
};
