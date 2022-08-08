import {FeedbackEngine} from "../models/FeedbackSchema.js";
import {GetUserFromToken} from "./UserController.js";


export function CreateFeedback(req, res) {

    //get logged in user
    const token = req.get('access-token');
    if (!token) {
        res.status(401).send('no token provided');
        return;
    }

    GetUserFromToken(token).then((loggedInUser) => {
        if (!loggedInUser) {
            res.status(401).send('logged in user not retrieved');
            return;
        }

        //create the feedback
        let _feedback = req.body;
        _feedback.createdBy = loggedInUser._id;
        let newFeedback = new FeedbackEngine(_feedback);

        newFeedback.save((err, addedFeedback) => {
            if (err) {
                console.log("Could not save to mongo!: " + err)
                res.send(err);
            }
            console.log("Feedback saved to mongo!");
            res.send(addedFeedback);
        })
    })


}

export async function GetNewFeedbacks(req, res) {
    FeedbackEngine.find({$or: [{statusId: 0}, {statusId: 1}, {statusId: 2}]}).populate('createdBy')
        .then((feedbacks)=>{
            res.send(feedbacks);
        });
}

export async function GetFeedbacks(req, res) {
    FeedbackEngine.find().populate('createdBy')
        .then((feedbacks)=>{
            res.send(feedbacks);
        });
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