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

const corsoptions = {
    origin: ["https://waneem-admin-86fa.vercel.app", "https://waneem-hotelbooking-fsl3za4oh-wakai-megumi.vercel.app", "https://waneem-hotelbooking.vercel.app", "https://waneem-admin-86fa-8xdesxash-wakai-megumi.vercel.app"],
    credentials: true,
    optionSuccessStatus: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
}

//middleware
app.use(cors(corsoptions))
app.use(cookieParser())

app.use(express.json())
//router
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/hotels', hotelRouter)
app.use('/api/v1/room', roomRouter)
app.use('/api/v1/booking', bookingrouter)


app.use('/api/v1/user', userRouter)

app.get(
    '/api/v1', (req, res) => {
        console.log('here')
        res.send('hello from express')
    }


)
console.log(process.env.ADMIN_URL, process.env.CLIENT_URL)


//error middleware

app.use(ErrorHandler)

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers("https://waneem-admin-86fa.vercel.app", "https://waneem-hotelbooking-fsl3za4oh-wakai-megumi.vercel.app", "https://waneem-hotelbooking.vercel.app", "https://waneem-admin-86fa-8xdesxash-wakai-megumi.vercel.app"));
    next();
});