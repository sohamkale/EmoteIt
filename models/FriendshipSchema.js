import mongoose from "mongoose";

const Schema = mongoose.Schema;

// schema definition:
//     (
//         {
//             fieldname: {
//                 type: number/text/boolean,
//                 required: 'You must enter this field!'
//             }
//         }
//     )

export const FriendshipSchema = new Schema(
    {
        // createdBy: { type: string, required: 'created by id for feedbacks are requried!'}
        requesterUserId: {type: String, required: true},
        requesteeUserId: {type: String, required: true},
        typeId: {type: Number, required: true},
        statusId: {type: Number, required: true}
    },{  id: true, timestamps: true }
);