import cloudinary from "../config/cloudinary.config.js";
import streamifier from "streamifier";

const uploadSingle = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "products" },
      (err, result) => {
        if (err) return reject(err);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(stream);
  });
};

export const uploadMultipleToCloudinary = async (files) => {
  const uploadPromises = files.map((file) =>
    uploadSingle(file.buffer)
  );

  return await Promise.all(uploadPromises);
};