const { EventHubProducerClient } = require("@azure/event-hubs");

const connectionString = process.env.EVENTHUB_CONNECTION_STRING;
const eventhubName = process.env.EVENTHUB_NAME;

const main = async function () {
  const producer = new EventHubProducerClient(connectionString, eventhubName);

  const batch = await producer.createBatch();
  batch.tryAdd({ body: "First event" });

  await producer.sendBatch(batch);

  await producer.close();
};

main().catch((err) => {
  console.log(err);
});
