import { InboundDataEventModel } from "../models/eventModel";

export default class EventService {
  /* retrieve aggregated data from collection, group events by deviceId 
  and sort them by count in descending order */
  static async getEvents() {
    return InboundDataEventModel.aggregate([
      { $group: { _id: "$deviceId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
  }

  // save new event to collection
  static async createEvent(deviceId: string, type: string, value: number) {
    const newEvent = new InboundDataEventModel({
      deviceId,
      data: {
        type,
        value,
      },
      timestamp: new Date(),
    });
    await newEvent.save();
    return newEvent;
  }
}
