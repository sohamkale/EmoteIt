import{TranslationSchema} from "../models/TranslationSchema.js";
import mongoose from "mongoose";
import {request} from "express";
const TranslationEngine = mongoose.model('Translation',TranslationSchema);

export function CreateTranslation(req, res){
    let _translation = req.body;
    _translation.tableIdntfr = req.params.tableIdntfr;

    let newTranslation = new TranslationEngine(_translation);
    console.log(newTranslation);


    newTranslation.save((err, addedTranslation)=>{
        if(err)
        {
            console.log("Could not save to mongo!:"+err)
            res.send(err);
        }

        console.log("Translation Saved to mongo!");
        res.send(addedTranslation);
    })
}


export function GetTranslation(req, res){
    // console.log(req.query.rid);
    TranslationEngine.find({tableIdntfr: req.params.tableIdntfr},(err, translation)=>{
        if(err)
            res.send(err);
        res.send(translation);
    })


}

export function UpdateTranslation(req, res){
    let _translation = req.body;
    TranslationEngine.findByIdAndUpdate(_translation._id, _translation,{new:true},
        (err, updatedTranslation)=>{
        if(err)
            res.send(err);
        res.send(updatedTranslation);
        })
}

export function GetAll(req,res){
    TranslationEngine.find({},(err,trans)=>{
        if(err){
            res.send(err)
        }
            res.send(trans)
    })
}
