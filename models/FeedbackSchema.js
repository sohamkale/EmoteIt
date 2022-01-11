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
        objectTypeId: Number,
        typeId: { type: Number, required: true },
        subjectId: { type: String, required: true },
        message: { type: String, required: true },
        statusId: { type: Number, default: 0 }
    }, { id: true, _id: true, timestamps: true }
);