import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TranslationSchema = new Schema(
    {
        rid: {type: Number, required: true, unique: true},
        tableIdntfr: {type: String, required: true,},
        label: {type: String, required: true},
        symbols: {type: String},
        notes: {type: String},
        depricated: false
    }, {id: true, timestamps: true}
);

TranslationSchema.index({
    tableIdntfr: {type: String, required: true},
    rid: {type: Number, required: true}
}, {unique: true})


export {TranslationSchema}