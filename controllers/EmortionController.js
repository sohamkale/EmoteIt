import {EmortionSchema} from "../models/EmortionSchema.js";
import mongoose from "mongoose";
const EmortionEngine = mongoose.model('Emortion', EmortionSchema);

export function CreateEmortion(req, res){
    let _emortion = req.body;
    let newEmortion = new EmortionEngine(_emortion);
    newEmortion.save((err, addedEmortion)=>{
        if(err){
            console.log("Could not save to mongo!: "+err)
            res.send(err);
        }
        else{
            res.send(addedEmortion);
            console.log("Emortion saved to mongo!");
        }
    })
}

export function GetEmortion(req,res){
    EmortionEngine.findById({_id: req.params.id},
        (err,emortion)=>{
        if(err)
            res.send(err)
        res.send(emortion);
    })
}

export function GetUserEmortions(req, res){
    EmortionEngine.find({createdBy: req.params.id},
        (err,emortion)=>{
        if(err){
            console.log(err)
            res.send(err)
        }
        else{
            console.log("Emortions found!")
            res.send(emortion)
        }
    })
}