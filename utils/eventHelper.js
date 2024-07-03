const moment = require("moment");

const {
  ADMIN_FLEX_ACCOUNT_ID,
  TIME_TO_SCHEDULE,
  PADDING_TIME_MINUTES,
} = require("../config");
const integrationSdk = require("../instances/integrationSdk");
const { denormalisedResponseEntities } = require("./data");

/**
 * Retrieves the last event sequence ID from the stored in configured admin account.
 *
 * @return {Promise<number>} The event sequence ID
 * @throws {Error} If there is an error while retrieving the event sequence ID.
 */
const retrieveLastEventSequenceId = async () => {
  try {
    const response = await integrationSdk.users.show({
      id: ADMIN_FLEX_ACCOUNT_ID,
    });
    const users = denormalisedResponseEntities(response);
    const { eventSequenceId } = users[0]?.attributes.profile.metadata || {};

    return eventSequenceId;
  } catch (error) {
    console.error("Failed to get event sequence ID:", error);
    throw error;
  }
};

/**
 * Extracts the last event sequence ID from the provided events.
 *
 * @param {Array} events The events to extract the last sequence ID from
 * @returns {number} The last event sequence ID
 */
const extractLastEventSequenceId = (events) => {
  if (!events?.length) return;

  const lastEvent = events[events.length - 1];
  const { sequenceId } = lastEvent.attributes || {};

  return sequenceId;
};

/**
 * Updates the last event sequence ID in the configured admin account.
 *
 * @param {Array} events The events to update the last sequence ID for
 * @returns
 */
module.exports.updateLastSequenceId = async (events) => {
  const lastSequenceId = extractLastEventSequenceId(events);

  if (!lastSequenceId) {
    console.error(
      "No event sequence ID found in the provided events. Will not update the admin account."
    );
    return;
  }

  try {
    await integrationSdk.users.updateProfile({
      id: ADMIN_FLEX_ACCOUNT_ID,
      metadata: {
        eventSequenceId: lastSequenceId,
      },
    });
  } catch (error) {
    console.error("Failed to update event sequence ID:", error);
    throw error;
  }
};

/**
 * Fetches events from sharetribe
 *
 * @param {string[]} eventTypes Event types
 * @returns {Promise<Array>} Events
 */
module.exports.fetchFlexEvents = async (eventTypes) => {
  try {
    const eventSequenceId = await retrieveLastEventSequenceId();

    const queryParams = {
      eventTypes: eventTypes.join(","),
      ...(eventSequenceId
        ? { startAfterSequenceId: eventSequenceId }
        : {
            createdAtStart: moment()
              .subtract(
                Number(TIME_TO_SCHEDULE) + Number(PADDING_TIME_MINUTES),
                "minutes"
              )
              .toDate(),
          }),
    };

    const response = await integrationSdk.events.query(queryParams);
    const events = denormalisedResponseEntities(response);

    return events;
  } catch (error) {
    console.error("Fetch event failed:", error);
    throw error;
  }
};
