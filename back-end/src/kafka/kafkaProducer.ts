import { Kafka } from "kafkajs";
import { config } from "../config/config";

// setup Kafka producer
const kafka = new Kafka({
  clientId: "device-monitor",
  brokers: config.kafkaBrokers,
});
const producer = kafka.producer();

// generate random deviceId
const generateRandomDeviceId = () => {
  const deviceIds = ["abc", "xyz", "def", "ghi"];
  const randomIndex = Math.floor(Math.random() * deviceIds.length);
  return deviceIds[randomIndex];
};

// generate random number between 80 and 100
const generateRandomValue = () => {
  return Math.floor(Math.random() * 21) + 80;
};

// send Kafka message containing random device data
const produce = async () => {
  const message = {
    deviceId: generateRandomDeviceId(),
    data: {
      type: "load",
      value: generateRandomValue(),
    },
  };

  try {
    await producer.send({
      topic: "device-data",
      messages: [{ value: JSON.stringify(message) }],
    });
    console.log("Message sent:", message);
  } catch (error) {
    console.log("Error in Kafka producer:", error);
  }
};

// connect to Kafka producer and produce message every 5 seconds
const startProducing = async () => {
  await producer.connect();
  setInterval(produce, 5000);
};

startProducing().catch((error) => {
  console.log("Error in Kafka producer:", error);
});
