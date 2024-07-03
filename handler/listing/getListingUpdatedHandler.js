const { MARKETPLACE_SERVER_URL, supportedEventTypes } = require('../../config');
const { PENDING_APPROVAL_STATE } = require('../../config/listing');
const axiosInstance = require('../../instances/axios');

const { LISTING_UPDATED } = supportedEventTypes;

module.exports = async event => {
  if (!event || !event.attributes) {
    console.error('Invalid event data');
    return;
  }

  const { resource, previousValues } = event.attributes;

  if (!previousValues || !previousValues.attributes) {
    console.error('Invalid previous values data');
    return;
  }

  const { state: previousState } = previousValues.attributes || {};

  if (previousState !== PENDING_APPROVAL_STATE) {
    console.error('Previous state is not pending approval');
    return;
  }

  try {
    const { id: listingId } = resource;
    const axios = axiosInstance(MARKETPLACE_SERVER_URL);

    await axios.put(`/api/events/listings/approve`, {
      listingId,
    });

    console.log(`Handle event [${LISTING_UPDATED}] listing (id: ${listingId.uuid}) successfully`);
  } catch (error) {
    console.error(`Handle event [${LISTING_UPDATED}] listing (id: ${listingId.uuid}) error`, error);
  }
};
