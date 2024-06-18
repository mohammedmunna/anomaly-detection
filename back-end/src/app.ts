import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import DeviceController from "./controllers/deviceController";
import EventController from "./controllers/eventController";

const app = express();

app.use(cors());
app.use(bodyParser.json());

// routes
app.get("/profiles", DeviceController.getProfiles);
app.post("/profiles", DeviceController.createProfile);
app.get("/events", EventController.getEvents);
app.post("/events", EventController.createEvent);

export default app;
