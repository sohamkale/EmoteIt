import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const NewsSchema = new Schema(
    {
        text: String,
        title: String,
        createdBy: Object,
        updatedBy: String,
        deprecated: {type:Boolean, default:false}
    },{id: true, timestamps: true}

);