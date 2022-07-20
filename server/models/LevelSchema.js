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

export const LevelScehema = new Schema(
    {
        createdBy: { type: Object, },
        minScore: {type: Number, required: true},
        levelIndex:{type:Number, required: true},
        Color: {type: String, required: true},
        name: {type: String, required: true}
    },{  id: true, timestamps: true }
);