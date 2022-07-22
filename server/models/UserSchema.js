import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new Schema(
    {
        name: String,
        bio: String,
        totalAnswerTimeMs: {type:Number, default:0},
        email: String,
        DOB: Date,
        score: {type: Number, default: 0},
        profileImage: String,
        typeId: Number,
        pictureUrl: String,
        uid: String,
    }, {id: true, timestamps: true}
);