module.exports.transitions = {
  TRANSITION_AUTO_CANCEL_FROM_DISPUTED: 'transition/auto-cancel-from-disputed',
  TRANSITION_CANCEL_FROM_DISPUTED: 'transition/cancel-from-disputed',
  TRANSITION_EXPIRE_CUSTOMER_REVIEW_PERIOD: 'transition/expire-customer-review-period',
  TRANSITION_EXPIRE_PROVIDER_REVIEW_PERIOD: 'transition/expire-provider-review-period',
  TRANSITION_REVIEW_2_BY_CUSTOMER: 'transition/review-2-by-customer',
  TRANSITION_REVIEW_2_BY_PROVIDER: 'transition/review-2-by-provider',
  TRANSITION_SELLER_RECEIVED_RETURN: 'transition/seller-received-return',
};

module.exports.transactionEvents = {
  CANCEL: 'cancel',
  CONFIRM_PAYMENT: 'confirm-payment',
  PUBLISH_REVIEW: 'publish-review',
};
