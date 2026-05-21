import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    shopLanguage: {
      type: String,
      enum: ["bn", "en"],
      default: "bn",
    },
  },
  { timestamps: true }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;
