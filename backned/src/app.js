import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const app = express ()

app.use(
    cors({
        origin : ['https://dev-connect-theta-seven.vercel.app/'],
        credentials : true
    })
)

app.use(express.json({limit : "25mb"}))
app.use(express.urlencoded({extended : true, limit : "15mb"}))
app.use(express.static("public"))
app.use(cookieParser())
app.use(morgan("dev")) 

// import routes

import userRouter from './routes/user.routes.js'
import tweetRouter from "./routes/tweet.routes.js"
import likeRouter from "./routes/like.routes.js"


app.get("/", (req, res) => res.send("Tinku kumar"));
app.use("/api/v1/users", userRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/likes", likeRouter)


export {app}