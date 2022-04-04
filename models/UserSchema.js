import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const UserSchema = new Schema(
    {
        name: String,
        bio: String,
        totalAnswerTimeMs: Number,
        email: String,
        DOB: Date,
        score: Number,
        profileImage: String,
        notificationIds: [String],
        typeId: Number,
        uId: String,
    },{ id: true, _id: true, timestamps: true }
);