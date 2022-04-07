import mongoose from "mongoose";
const Schema  = mongoose.Schema;

export const InsightSchema = new Schema({
    createdBy: String,
    secret: String,
    accuracy: Number,
    score: Number,
    response: String,
    hintsTaken: Number,
    submittedAt: Date,
    deviceId: Number,
    emortionId: String,
    reactionIds: [String],
    deprecated: false,
}, { id: true,  timestamps: true }
);
