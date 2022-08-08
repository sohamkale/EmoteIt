import mongoose from "mongoose";
import {ObjectId} from "../config.js";
import {UserTableName} from "./UserSchema.js";

const Schema = mongoose.Schema;
const FeedbackTableName = "Feedback"

export const FeedbackSchema = new Schema(
    {
        createdBy: {type: ObjectId, ref: UserTableName},
        updatedBy: String,
        objectTypeId: Number,
        typeId: {type: Number, required: true},
        subjectId: {type: String},
        message: {type: String, required: true},
        statusId: {type: Number, default: 0}
    }, {id: true, timestamps: true}
);


export const FeedbackEngine = mongoose.model(FeedbackTableName, FeedbackSchema);