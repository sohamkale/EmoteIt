import mongoose from "mongoose";
const Schema  = mongoose.Schema;

export const EmortionSchema = new Schema({
    createdBy: String,
    updatedBy: String,
    message: [String],
    secret: String,
    expireTime: Date,
    deprecated: false,
    categoryId: Number,
    privacyId: String,
    reactionIds: [String],
    insightUIDs: [String]
}, { id: true, timestamps: true }
);