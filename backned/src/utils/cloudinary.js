// cloudinary.js - COMPLETE CLEAN VERSION
import { v2 as cloudinary } from 'cloudinary'
import streamifier from 'streamifier'
import dotenv from "dotenv"
import fs from 'fs'

dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const uploadOnCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.buffer) {
          //  console.error("No file or buffer provided");
            return resolve(null);
        }

        console.log("Uploading file to Cloudinary:", file.originalname);

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "dev-connect"
            },
            (error, result) => {
                if (error) {
               //     console.error("Cloudinary upload error details:", error);
                    return reject(error);
                }
               // console.log("Cloudinary upload success:", result?.url);
                resolve(result);
            }
        );

        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
};