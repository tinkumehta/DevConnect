import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import dotenv from "dotenv"
import streamifier from 'streamifier'

dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET
});
//console.log(process.env.CLOUDINARY_API_KEY , "API KEY");


// COMPLETELY REPLACE your existing uploadOnCloudinary function with this:
export const uploadOnCloudinary = (file) => {
    return new Promise((resolve, reject) => {
        if (!file) {
            return resolve(null);
        }

        const uploadStream = cloudinary.uploader.upload_stream(
            {
                resource_type: "auto",
                folder: "dev-connect" // Optional
            },
            (error, result) => {
                if (error) {
                    console.error("Cloudinary upload error:", error);
                    return reject(error);
                }
                resolve(result);
            }
        );

        // Create readable stream from file buffer and pipe to uploadStream
        streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
};