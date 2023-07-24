import mongoose from "mongoose";


export const connectDB=()=>{
    mongoose.connect(process.env.MONGO_URL, {
        dbName: "backend_for_dashboard",
    })
        .then(() => console.log("Database Connected"))
        .catch((e) => console.log(e))
}


