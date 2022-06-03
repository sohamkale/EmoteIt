import {FeedbackSchema} from "../models/FeedbackSchema.js";
import mongoose from "mongoose";
import {GetTokenUser} from "./UserController.js";
import {GetProfileById} from "./ProfileController.js";

const FeedbackEngine = mongoose.model('Feedbacks', FeedbackSchema);

export function CreateFeedback(req, res) {

    const accessToken = req.get("access-token");

    GetTokenUser(accessToken, (user, err) => {
        if (err)
            res.status(500).send(err);
        else if (err == null && user == null)
            res.status(401).send("user not found!")
        else if (err == null) {
            //create the feedback
            let _feedback = req.body;
            _feedback.createdBy = user._id;
            let newFeedback = new FeedbackEngine(_feedback);
            console.log(newFeedback);

            newFeedback.save((err, addedFeedback) => {
                if (err) {
                    console.log("Could not save to mongo!: " + err)
                    res.send(err);
                }
                console.log("Feedback saved to mongo!");
                res.send(addedFeedback);
            })

        }
    })


}

export async function GetNewFeedbacks(req, res) {
    let feedbacks = [];
    feedbacks = await FeedbackEngine.find({$or:[{statusId:0}, {statusId:1},{statusId: 2}]});

    let finalArray = [];

    for (let f of feedbacks){
        let profile = await GetProfileById(f.createdBy);
        f.createdBy = profile.name;
        finalArray.push(f);
    }
    res.send(finalArray);

    /*FeedbackEngine.find({
        statusId: 0
    },(err,feedbacks)=>{
        if(err)
            res.send(err);

        await

        res.send(feedbacks);
    })*/
}

export async function GetFeedbacks(req, res) {
    let feedbacks = [];
    feedbacks = await FeedbackEngine.find({});
    let finalArray = [];

    for (let f of feedbacks){
        let profile = await GetProfileById(f.createdBy);
        f.createdBy = profile.name;
        finalArray.push(f);
    }
    res.send(finalArray);
}

export function UpdateFeedback(req, res) {
    const _feedback = req.body;
    FeedbackEngine.findByIdAndUpdate(_feedback.id, _feedback, {new: true},
        (err, updatedFeedback) => {
            if (err)
                res.send(err);
            res.send(updatedFeedback);
        })
}