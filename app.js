import express from "express";
import userRouter from "./routes/userRoutes.js";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import productRouter from "./routes/productRoutes.js"
import cors from "cors"




export const app = express();

config({
    path:"./data/config.env"
})


//middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))


app.use("/api/v1/users", userRouter);
app.use("/api/v1/products",productRouter)


app.get('/', (req, res) => {
    res.send("Nice working")
})


