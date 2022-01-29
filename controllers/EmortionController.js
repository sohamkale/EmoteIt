import {EmortionSchema} from "../models/EmortionSchema.js";
import mongoose from "mongoose";
const EmortionEngine = mongoose.model('Emortion', EmortionSchema);

export function CreateEmortion(req, res){
    let _emortion = req.body;
    let newEmortion = new EmortionEngine(_emortion);
    newEmortion.save((err, addedEmortion)=>{
        if(err)
            console.log("Could not save to mongo!: "+err)
            res.send(err);
        res.send(addedEmortion);
        console.log("Emortion saved to mongo!");
    })
}