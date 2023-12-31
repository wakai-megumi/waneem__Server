import CreateError from "./CreateError.js";
import jwt from "jsonwebtoken"

export const Sendtoken = async (user, res, statusCode = 200, message, next) => {


    try {
        const token = await jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "180d" })

        if (!token) return res.status(400).json({ success: false, message: "token not generated" })

        res.cookie("access_token", token, {
            httpOnly: true,
            maxAge: 180 * 24 * 60 * 60 * 1000,
            sameSite: "none",
            secure: true,
        });
        return res.status(statusCode).json({
            success: true,
            message: message || 'login successfull',
            user: user,

        })
    } catch (err) {
        console.log(err)
        return next(err)
    }



}




