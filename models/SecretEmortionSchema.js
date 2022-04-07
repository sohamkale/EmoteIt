import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const SecretEmortionSchema = new Schema(
    {
        createdBy: String,
            secret: String,
            secretEmortion: [String],
            expiresAt: Date,
            responseUIds: [String]
    },{  id: true, timestamps: true }
);