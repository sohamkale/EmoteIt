import mongoose from "mongoose";
import {ObjectId} from "../config.js";
import {UserTableName} from "./UserSchema.js";

const Schema = mongoose.Schema;
export const FriendshipTableName = "Friendship";


export const FriendshipSchema = new Schema(
    {
        // createdBy: { type: string, required: 'created by id for feedbacks are requried!'}
        requesterUserId: {type: ObjectId, ref: UserTableName},
        requesteeUserId: {type: ObjectId, ref: UserTableName},
        typeId: {type: Number, required: true},
        statusId: {type: Number, default: 0}
    },{  id: true, timestamps: true }
);

export const FriendshipEngine = mongoose.model(FriendshipTableName, FriendshipSchema);
