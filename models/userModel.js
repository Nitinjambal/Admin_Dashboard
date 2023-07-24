import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    username:{type: String,required:true,unique:true},
    email: { type: String, unique: true,required:true },
    password: { type: String, required:true},
    createAt: {
        type: Date,
        default: Date.now,
    }
})

export const User = mongoose.model("User", Schema);