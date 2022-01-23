import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TranslationSchema = new Schema(
    {
        rid: { type: Number, required: true, index: true},
        tableIdntfr: {type: String, required: true, index: true},
        text: {type: String, required: true},
        depricated: false
    },{id: true, _id:true, timestamps: true}



);

// TranslationSchema.index({tableIdntfr: {type: String, required: true},rid: { type: Number, required: true} },{unique:true})


export {TranslationSchema}