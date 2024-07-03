const axios = require('axios');

const axiosInstance = url =>
  axios.create({
    baseURL: url,
    timeout: 5000,
    headers: {
      'Content-Type': 'application/transit+json',
    },
  });

module.exports = axiosInstance;
