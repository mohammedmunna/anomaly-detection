// schema and model for inbound data event
import { Schema, model, Document } from "mongoose";

interface Data {
  type: string;
  value: number;
}

interface InboundDataEvent extends Document {
  deviceId: string;
  data: Data;
  timestamp: Date;
}

const DataSchema = new Schema<Data>(
  {
    type: { type: String, required: true },
    value: { type: Number, required: true },
  },
  { _id: false }
);

const InboundDataEventSchema = new Schema<InboundDataEvent>({
  deviceId: { type: String, required: true },
  data: { type: DataSchema, required: true },
  timestamp: { type: Date, default: Date.now, required: true },
});

export const InboundDataEventModel = model<InboundDataEvent>(
  "InboundDataEvent",
  InboundDataEventSchema
);
