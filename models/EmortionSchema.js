import mongoose from "mongoose";
const Schema  = mongoose.Schema;

export const EmortionSchema = new Schema({
    createdBy: String,
    updatedAt: Date,
    message: [String],
    secret: String,
    expireTime: Date,
    deprecated: false,
    categoryId: Number,
    privacyId: String,
    reactionIds: [String],
    insightIds: [String]
}, { id: true, _id: true, timestamps: true }
);