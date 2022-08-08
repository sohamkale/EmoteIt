import mongoose from "mongoose";
import {ObjectId} from "../config.js";
import {UserTableName} from "./UserSchema.js";
const Schema  = mongoose.Schema;
export const EmortionTableName = "Emortion";

export const EmortionSchema = new Schema({
    createdBy: {type: ObjectId, ref: UserTableName},
    updatedBy: String,
    message: [{type: String, required:true}],
    secret: {type:String, required: true},
    expiresAt: Date,
    deprecated: {type: Boolean, default: false},
    categoryId: Number,
    privacyId: {type: Number, default: 0},
    reactionIds: [{type:ObjectId, ref: UserTableName}],
    insightUIds: [{type:ObjectId, ref: UserTableName}]
}, { id: true, timestamps: true }
);

export const EmortionEngine = mongoose.model(EmortionTableName, EmortionSchema);