const { supportedEventTypes } = require("./config");
const {
  fetchFlexEvents,
  updateLastSequenceId,
} = require("./utils/eventHelper");
const getListingUpdatedHandler = require("./handler/listing/getListingUpdatedHandler");
const getTransactionTransitionedHandler = require("./handler/transaction/getTransactionTransitionedHandler");

module.exports = async () => {
  try {
    const events = await fetchFlexEvents(Object.values(supportedEventTypes));
    updateLastSequenceId(events);

    const jobs = events.reduce((jobs, event) => {
      const { eventType } = event.attributes;
      const { TRANSACTION_TRANSITIONED, LISTING_UPDATED } = supportedEventTypes;

      switch (eventType) {
        case TRANSACTION_TRANSITIONED:
          console.log("Transaction transitioned event");
          jobs.push(getTransactionTransitionedHandler(event));
          break;
        case LISTING_UPDATED:
          console.log("Listing updated event");
          jobs.push(getListingUpdatedHandler(event));
          break;
        default:
          console.log("Event not supported");
          break;
      }

      return jobs;
    }, []);

    if (!jobs.length) {
      console.log("No events to handle");
      return;
    }

    await Promise.allSettled(jobs);
  } catch (error) {
    console.error("Event listener has error", error);
    throw error;
  }
};
