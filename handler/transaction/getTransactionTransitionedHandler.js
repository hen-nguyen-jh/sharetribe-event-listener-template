const { transactionEvents, transitions } = require('../../config/transaction');
const getCancelTransactionHandler = require('./getEventTransactionHandler');

const {
  TRANSITION_AUTO_CANCEL_FROM_DISPUTED,
  TRANSITION_CANCEL_FROM_DISPUTED,
  TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD,
  TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD,
  TRANSITION_REVIEW_2_BY_CUSTOMER,
  TRANSITION_REVIEW_2_BY_PROVIDER,
  TRANSITION_SELLER_RECEIVED_RETURN,
} = transitions;

module.exports = async event => {
  const { lastTransition } = event.attributes.resource.attributes;

  switch (lastTransition) {
    case TRANSITION_REVIEW_2_BY_CUSTOMER:
    case TRANSITION_REVIEW_2_BY_PROVIDER:
    case TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD:
    case TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD:
      console.log('Handle event publish review transaction');
      return getCancelTransactionHandler(event, transactionEvents.PUBLISH_REVIEW);
    case TRANSITION_CANCEL_FROM_DISPUTED:
    case TRANSITION_AUTO_CANCEL_FROM_DISPUTED:
    case TRANSITION_SELLER_RECEIVED_RETURN:
      console.log('Handle event cancel transaction');
      return getCancelTransactionHandler(event, transactionEvents.CANCEL);
    default:
      return null;
  }
};
