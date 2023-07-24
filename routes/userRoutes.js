import express from "express";
import { getMyProfile, login, logout, register } from "../controllers/userControllers.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();


//Register user
router.post("/new", register)



//Login user
router.post("/login", login)


//Get_My_profile

router.get("/myProfile", isAuthenticated, getMyProfile)

router.get("/logout", logout)



export default router;