import { Kafka, EachMessagePayload } from "kafkajs";
import { DeviceProfileModel } from "../models/deviceModel";
import { InboundDataEventModel } from "../models/eventModel";
import { config } from "../config/config";

interface DataItem {
  deviceId: string;
  data: {
    type: string;
    value: number;
  };
}
interface Thresholds {
  upper: number;
  lower: number;
}
interface ProfileObject {
  type: string;
  thresholds: Thresholds;
  window: number;
}

// setup Kafka consumer
const kafka = new Kafka({
  clientId: "device-monitor",
  brokers: config.kafkaBrokers,
});
const consumer = kafka.consumer({ groupId: "device-monitor-group" });

// connect to kafka and subscribe to topic
const connectConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "device-data", fromBeginning: true });
};

// retrieve profile based on deviceId and dataType
const findDeviceProfile = async (
  deviceId: string,
  dataType: string
): Promise<ProfileObject | null> => {
  const profile = await DeviceProfileModel.findOne({
    [deviceId]: { $exists: true },
  });
  if (!profile) return null;
  return (
    profile[deviceId].find((obj: ProfileObject) => obj.type === dataType) ||
    null
  );
};

// retrieve events that occurred within the time window from the current time
const findRecentEvents = async (
  deviceId: string,
  dataType: string,
  window: number
) => {
  return await InboundDataEventModel.find({
    deviceId,
    "data.type": dataType,
    timestamp: {
      $gte: new Date(Date.now() - window * 1000),
    },
  });
};

// save anomaly event
const saveAnomalyEvent = async (dataItem: DataItem) => {
  const event = new InboundDataEventModel({
    deviceId: dataItem.deviceId,
    data: {
      type: dataItem.data.type,
      value: dataItem.data.value,
    },
    timestamp: new Date(),
  });
  await event.save();
  console.log(
    `Anomaly detected and event saved for device ${dataItem.deviceId}`
  );
};

/* process Kafka message, check for anomalies based on device thresholds,
  and save anomaly event if detected */
const processMessage = async ({ message }: EachMessagePayload) => {
  try {
    const dataItem: DataItem = JSON.parse(message.value?.toString() || "");
    console.log("Processing:", { dataItem });
    const {
      deviceId,
      data: { type, value },
    } = dataItem;

    const deviceProfile = await findDeviceProfile(deviceId, type);
    if (!deviceProfile) {
      console.log(`No profile found for device ${deviceId}`);
      return;
    }

    const events = await findRecentEvents(deviceId, type, deviceProfile.window);

    const isAnomaly =
      events.length > 0 &&
      (value > deviceProfile.thresholds.upper ||
        value < deviceProfile.thresholds.lower);

    if (isAnomaly) await saveAnomalyEvent(dataItem);
  } catch (error) {
    console.log("Error processing Kafka message:", error);
  }
};

// connect Kafka consumer and process each message
const consume = async () => {
  await connectConsumer();
  await consumer.run({
    eachMessage: processMessage,
  });
};

consume().catch((error) => console.log("Error in Kafka consumer:", error));
