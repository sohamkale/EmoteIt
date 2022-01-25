import {FeedbackSchema} from "../models/FeedbackSchema.js";
import mongoose from "mongoose";
const FeedbackEngine = mongoose.model('Feedbacks', FeedbackSchema);

export function CreateFeedback(req, res){
    let _feedback = req.body;
    let newFeedback = new FeedbackEngine(_feedback);
    console.log(newFeedback);

    newFeedback.save((err, addedFeedback)=>{
        if(err)
        {
            console.log("Could not save to mongo!: "+err)
            res.send(err);
        }
        console.log("Feedback saved to mongo!");
        res.send(addedFeedback);
    })
}

export function GetNewFeedbacks(req, res){
    FeedbackEngine.find({
        statusId: 0
    },(err,feedbacks)=>{
        if(err)
            res.send(err);
        res.send(feedbacks);
    })
}

export function GetFeedbacks(req,res){
    FeedbackEngine.find({},(err,feedbacks)=>{
        if(err)
            res.send(err);
        res.send(feedbacks);
    })
}

export function UpdateFeedback(req, res){
    FeedbackEngine.findByIdAndUpdate(req.params.id, req.body,{new:true},
        (err, updatedFeedback)=>{
        if(err)
            res.send(err);
        res.send(updatedFeedback);
    })
}