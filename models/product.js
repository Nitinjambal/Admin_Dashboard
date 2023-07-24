import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    image: { type: String },
    title: { type: String, required: true},
    description: { type: String, required: true },
    createAt: {
        type: Date,
        default: Date.now,
    }
})

export const Product = mongoose.model("Product", Schema);