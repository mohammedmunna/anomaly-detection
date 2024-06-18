import { Request, Response } from "express";
import EventService from "../services/eventService";

export default class EventController {
  // get events
  static async getEvents(req: Request, res: Response) {
    try {
      const events = await EventService.getEvents();
      const formattedResults = events.map((e) => [e._id, e.count]);
      res.json(formattedResults);
    } catch (error) {
      console.log("Error getting event:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // create event
  static async createEvent(req: Request, res: Response) {
    const {
      deviceId,
      data: { type, value },
    } = req.body;
    if (!deviceId || !type || !value) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    try {
      const event = await EventService.createEvent(deviceId, type, value);
      res.status(201).json(event);
    } catch (error) {
      console.log("Error creating event:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
