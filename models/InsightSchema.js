import mongoose from "mongoose";
const Schema  = mongoose.Schema;

export const InsightSchema = new Schema({
    createdBy: String,
    secret: String,
    accuracy: Number,
    score: Number,
    response: String,
    submittedAt: Date,
    deviceId: Number,
    emortionId: String,
    reactionIds: [String],
    deprecated: false,
}, { id: true, _id: true, timestamps: true }
);
