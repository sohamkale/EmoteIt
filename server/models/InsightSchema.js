import mongoose from "mongoose";
const Schema  = mongoose.Schema;

export const InsightSchema = new Schema({
    createdBy: Object,
    secret: String,
    accuracy: Number,
    score: Number,
    response: [String],
    hintsTaken: Number,
    timeTaken: Number,
    submittedAt: Date,
    deviceId: Number,
    emortionId: String,
    reactionIds: [String],
    deprecated: false,
}, { id: true,  timestamps: true }
);
