import mongoose from "mongoose";

const Schema = mongoose.Schema;



export const FriendshipSchema = new Schema(
    {
        // createdBy: { type: string, required: 'created by id for feedbacks are requried!'}
        requesterUserId: {type: Object, required: true},
        requesteeUserId: {type: Object, required: true},
        typeId: {type: Number, required: true},
        statusId: {type: Number, default: 0}
    },{  id: true, timestamps: true }
);