import { Request, Response } from "express";
import DeviceService from "../services/deviceService";

// helper function to check if an object has specific keys
function hasKeys(obj: any, keys: string[]): boolean {
  return keys.every((key) => obj.hasOwnProperty(key));
}

// helper function to validate the thresholds object
function validateThresholds(thresholds: any): boolean {
  if (
    typeof thresholds !== "object" ||
    !hasKeys(thresholds, ["upper", "lower"])
  ) {
    return false;
  }
  const { upper, lower } = thresholds;
  return (
    typeof upper === "number" &&
    upper >= 0 &&
    typeof lower === "number" &&
    lower >= 0
  );
}

// helper function to validate profile array
function validateProfileArray(profileArray: any): boolean {
  if (!Array.isArray(profileArray)) {
    return false;
  }

  return profileArray.every((item) => {
    if (
      typeof item !== "object" ||
      !hasKeys(item, ["type", "thresholds", "window"])
    ) {
      return false;
    }

    const { type, thresholds, window } = item;

    return (
      type === "load" &&
      validateThresholds(thresholds) &&
      typeof window === "number"
    );
  });
}

export default class DeviceController {
  // get device profiles
  static async getProfiles(req: Request, res: Response) {
    try {
      const profiles = await DeviceService.getProfiles();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }

  // create device profile
  static async createProfile(req: Request, res: Response) {
    const profileData = req.body;

    // ensure key exists in the request body
    const keys = Object.keys(profileData);
    if (keys.length === 0) {
      return res
        .status(400)
        .json({ message: "Validation error", error: "Request body is empty" });
    }

    // validate key value
    for (const key of keys) {
      const value = profileData[key];
      if (!validateProfileArray(value)) {
        return res.status(400).json({
          message: `Validation error`,
          error: `Invalid value for ${key}`,
        });
      }
    }

    try {
      const newProfile = await DeviceService.createProfile(profileData);
      res.status(201).json(newProfile);
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  }
}
