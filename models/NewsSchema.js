import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const NewsSchema = new Schema(
    {
        text: String,
        createdBy: String,
        updatedBy: String,
        deprecated: {type:Boolean, default:false}
    },{id: true, timestamps: true}

);