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

export const FeedbackSchema = new Schema(
    {
        // createdBy: { type: string, required: 'created by id for feedbacks are requried!'}
        createdBy: String,
        updatedBy: String,
        objectTypeId: Number,
        typeId: {type: Number, required: true},
        subjectId: {type: String},
        message: {type: String, required: true},
        statusId: {type: Number, default: 0}
    }, {id: true, timestamps: true}
);