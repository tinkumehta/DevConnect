// multer.config.js
import multer from 'multer'

// IMPORTANT: This MUST be memoryStorage, NOT diskStorage
const storage = multer.memoryStorage()

export const upload = multer({
    storage: storage, // Explicitly set storage
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        // Accept images only
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
            return cb(new Error('Only image files are allowed!'), false);
        }
        cb(null, true);
    }
})