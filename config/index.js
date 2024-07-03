module.exports.ADMIN_FLEX_ACCOUNT_ID = process.env.ADMIN_FLEX_ACCOUNT_ID;
module.exports.TIME_TO_SCHEDULE = process.env.TIME_TO_SCHEDULE || 0;
module.exports.PADDING_TIME_MINUTES = process.env.PADDING_TIME_MINUTES || 5;
module.exports.MARKETPLACE_SERVER_URL = process.env.MARKETPLACE_SERVER_URL;

module.exports.supportedEventTypes = {
  LISTING_UPDATED: 'listing/updated',
  TRANSACTION_TRANSITIONED: 'transaction/transitioned',
};
