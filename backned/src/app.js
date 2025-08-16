import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'

const app = express ()

app.use(
    cors({
        origin : process.env.CORS_ORIGIN,
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


app.use("/api/v1/users", userRouter)



export {app}