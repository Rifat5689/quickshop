import { asyncHandler } from "../../utils/asyncHandler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import Settings from "./settings.model.js";

const getOrCreateSettings = async () => {
  let settings = await Settings.findOne().lean();
  if (!settings) {
    settings = await Settings.create({ shopLanguage: "bn" });
    settings = settings.toObject();
  }
  return settings;
};

const getPublicShopSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.status(200).json(
    new ApiResponse(
      200,
      { shopLanguage: settings.shopLanguage },
      "Shop settings fetched"
    )
  );
});

const getAdminShopSettings = asyncHandler(async (req, res) => {
  const settings = await getOrCreateSettings();
  res.status(200).json(new ApiResponse(200, settings, "Settings fetched"));
});

const updateShopSettings = asyncHandler(async (req, res) => {
  const { shopLanguage } = req.body;
  const update = {};

  if (shopLanguage !== undefined) {
    update.shopLanguage = shopLanguage;
  }

  const settings = await Settings.findOneAndUpdate({}, update, {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true,
  });

  res.status(200).json(new ApiResponse(200, settings, "Settings updated"));
});

export { getPublicShopSettings, getAdminShopSettings, updateShopSettings };
