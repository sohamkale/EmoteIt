import mongoose from "mongoose";
const Schema = mongoose.Schema;

const TranslationSchema = new Schema(
    {
        rid: { type: Number, required: true, unique: true},
        tableIdntfr: {type: String, required: true,},
        text: {type: String, required: true},
        depricated: false
    },{id: true, timestamps: true}



);

TranslationSchema.index({tableIdntfr: {type: String, required: true},rid: { type: Number, required: true} },{unique:true})


export {TranslationSchema}