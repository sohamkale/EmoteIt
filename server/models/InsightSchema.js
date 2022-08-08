import mongoose from "mongoose";
import {ObjectId} from "../config.js";
import {UserTableName} from "./UserSchema.js";
import {EmortionTableName} from "./EmortionSchema.js";
const Schema  = mongoose.Schema;
export const InsightTableName = "Insight";


export const InsightSchema = new Schema({
    createdBy: {type:ObjectId, ref: UserTableName},
    secret: String,
    accuracy: Number,
    score: Number,
    response: [String],
    hintsTaken: Number,
    timeTaken: Number,
    submittedAt: Date,
    deviceId: Number,
    emortionId: {type:ObjectId, ref: EmortionTableName},
    reactionIds: [{type:ObjectId, ref: UserTableName}],
    deprecated: false,
}, { id: true,  timestamps: true }
);

export const InsightEngine = mongoose.model(InsightTableName, InsightSchema);

