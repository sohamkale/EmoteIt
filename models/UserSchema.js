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
        notificationIds: {type : Array},
        typeId: Number
    },{ id: true, _id: true, timestamps: true }
);