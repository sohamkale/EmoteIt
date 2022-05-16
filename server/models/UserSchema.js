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
        typeId: Number,
        uid: String,
    },{  id: true, timestamps: true }
);