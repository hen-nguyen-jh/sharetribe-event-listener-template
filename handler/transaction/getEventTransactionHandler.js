const { MARKETPLACE_SERVER_URL } = require('../../config');
const axiosInstance = require('../../instances/axios');

module.exports = async (event, type) => {
  const transactionId = event.attributes.resourceId.uuid;

  const axios = axiosInstance(MARKETPLACE_SERVER_URL);

  return axios
    .put(`/api/events/transactions/${transactionId}`, {
      eventType: type,
    })
    .then(() => {
      console.log(`Handle event [${type}] transaction (id: ${transactionId}) successfully`);
    })
    .catch(error => {
      console.error(`Handle [${type}] transaction (id: ${transactionId}) error`, error);
    });
};
