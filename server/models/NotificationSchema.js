import mongoose from "mongoose";
import {ObjectId} from "../config.js";
import {UserTableName} from "./UserSchema.js";

const Schema = mongoose.Schema;
const NotificationTableName = "Notification";
const NotificationSchema = new Schema(
    {
        seen: {type: Boolean, default: false},
        message: String,
        owner: {type: ObjectId, ref: UserTableName},
        link: {type: String, required: true},
    }, {id: true, timestamps: true}
);

export const NotificationEngine = mongoose.model(NotificationTableName, NotificationSchema);
