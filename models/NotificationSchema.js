import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const NotificationSchema = new Schema(
    {
        seen: false,
        message: String,
            ownerId: String,
        userId:{type: String, required:true},
        typeId: { type: Number, required: true },
        subjectId: { type: String, required: true },
    }, { id: true,  timestamps: true }
);