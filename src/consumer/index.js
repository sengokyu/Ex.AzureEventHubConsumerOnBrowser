const { EventHubConsumerClient } = require("@azure/event-hubs");

const consumerGroup = process.env.EVENTHUB_CONSUMER_GROUP;
const connectionString = process.env.EVENTHUB_CONNECTION_STRING;
const eventhubName = process.env.EVENTHUB_NAME;

const main = async function () {
  const client = new EventHubConsumerClient(
    consumerGroup,
    connectionString,
    eventhubName
  );
  const subscription = client.subscribe({
    processEvents: async (events, context) => {
      for (const event of events) {
        console.log(event);
      }
    },
    processError: async (err, context) => {
      console.error(err);
    },
  });

  return subscription;
};

let subscription = undefined;

window.addEventListener("load", async () => {
  subscription = await main().catch((err) => {
    console.log(err);
  });
});

window.addEventListener("beforeunload", () => {
  if (subscription) {
    subscription.close();
  }
});
