// schema and model for device profile
import { Schema, model, Document } from "mongoose";

interface Thresholds {
  upper: number;
  lower: number;
}

interface Profile extends Document {
  type: string;
  thresholds: Thresholds;
  window: number;
}

interface DeviceProfile {
  [key: string]: Profile[];
}

const ThresholdsSchema = new Schema<Thresholds>({
  upper: { type: Number, required: true },
  lower: { type: Number, required: true },
});

const ProfileSchema = new Schema<Profile>({
  type: { type: String, required: true },
  thresholds: { type: ThresholdsSchema, required: true },
  window: { type: Number, required: true },
});

const DeviceProfileSchema = new Schema<DeviceProfile>(
  { type: Schema.Types.Mixed },
  { strict: false }
);

export const DeviceProfileModel = model<DeviceProfile>(
  "DeviceProfile",
  DeviceProfileSchema
);
