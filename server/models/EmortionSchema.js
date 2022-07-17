import mongoose from "mongoose";
const Schema  = mongoose.Schema;

export const EmortionSchema = new Schema({
    createdBy: Object,
    updatedBy: String,
    message: [String],
    secret: String,
    expiresAt: Date,
    deprecated: {type: Boolean, default: false},
    categoryId: Number,
    privacyId: {type: Number, default: 0},
    reactionIds: {type: [String], default: []},
    insightUIDs: {type: [String], default: []}
}, { id: true, timestamps: true }
);