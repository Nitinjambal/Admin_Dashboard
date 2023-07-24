import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import jwt from "jsonwebtoken"





//Register
export const register = async (req, res,next) => {
    try {
        const { username, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return next(new ErrorHandler("User Already exist", 404))

        const hashedPassword = await bcrypt.hash(password, 10)
        user = await User.create({
            username,
            email,
            password: hashedPassword,
        })

        sendCookie(user, res, "Registered Successfully", 201);

    } catch (error) {
        console.log('error:', error)

    }


}



//login
export const login = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) return next(new ErrorHandler("Invalid User or Password", 404))

        const isMatchPassword = await bcrypt.compare(password, user.password);


        if (!isMatchPassword ) {
            return res.status(404).json({
            success: false,
            message: "Invalid Email or Password"
        })
    }

        sendCookie(user, res, `Welcome back ${user.username}`, 200);
    } catch (error) {
       next(error)
    }

}



//Get_My_Profile
export const getMyProfile = (req, res) => {
    res.status(200).json({
        status: true,
        user: req.user,
    })
}

//Logout User

export const logout=(req,res)=>{
    res.status(200).cookie("token","",{
        expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,

    }).json({
        status: true,
        message: "Logout Succussfully"
    })
}
