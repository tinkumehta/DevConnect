import multer from 'multer'

// const storage = multer.diskStorage({
//     destination : function (req, file, cb){
//         cb(null, './public/temp')
//     },
//     filename : function (req, file, cb){
//         cb(null, file.originalname)
//     }
// })

// export const upload = multer({
//     storage
// })



// Use memory storage instead of disk storage

const storage = multer.memoryStorage()

export const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    }
})