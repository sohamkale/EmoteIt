import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const SecretEmortionResponseSchema = new Schema(
    {
        secretEmortionId: String,
        createdBy: String,
        response: [String],
        submittedAt: Date,
        deviceId: Number,
        deprecated: Boolean
    }, {id: true, timestamps: true}
);