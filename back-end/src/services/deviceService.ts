import { DeviceProfileModel } from "../models/deviceModel";

export default class DeviceService {
  // retrieve all device profiles from collection
  static async getProfiles() {
    return DeviceProfileModel.find();
  }

  // save new device profile to collection
  static async createProfile(profile: any) {
    const newProfile = new DeviceProfileModel(profile);
    await newProfile.save();
    return newProfile;
  }
}
