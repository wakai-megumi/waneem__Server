import express from 'express'
import dotenv from "dotenv"
import hotelRouter from './routers/hotel.route.js'
import userRouter from './routers/user.route.js'
import authRouter from './routers/auth.route.js'
import roomRouter from './routers/rooms.route.js'
import bookingrouter from './routers/booking.route.js'

import cookieParser from 'cookie-parser'
import cors from 'cors'
import ErrorHandler from './utils/ErrorHandler.js'
dotenv.config()

export const app = express();
app.use(cookieParser())
app.set("trust proxy", 1)


//middleware
app.use(cors({
    origin: "https://waneem-admin.onrender.com",
    credentials: true,
    optionSuccessStatus: true,
    methods: "*",
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(express.json())
//router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/hotels', hotelRouter)
app.use('/api/v1/room', roomRouter)
app.use('/api/v1/booking', bookingrouter)


app.use('/api/v1/user', userRouter)

const toke = "Sdfsdfsd"
app.get(
    '/api/v1', (req, res) => {
        console.log(toke)
        console.log('here')
        res.status(200).cookie("access_token", toke, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true
        }).send('hello from express')
        console.log(res)
    }


)
console.log(process.env.ADMIN_URL, process.env.CLIENT_URL)


//error middleware

app.use(ErrorHandler)

