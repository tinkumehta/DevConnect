import dotenv from 'dotenv'
import connectDb from './db/index.js'
import app from "./app.js"

dotenv.config({
    path : "./.env",
})

 // connnect to DB before handling requests
 await connectDb()

// this is work on localhost i deploy this project they don't be need

// .then(() => {
//     app.listen(process.env.PORT || 8000 , () => {
//         console.log(`Server is running at port : ${process.env.PORT}`);
        
//     })
// })
// .catch((err) => {
//     console.log("Mongo db failed !!!", err);
    
// })

// export default app;