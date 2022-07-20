import {EmortionSchema} from "../models/EmortionSchema.js";
import {InsightSchema} from "../models/InsightSchema.js";
import mongoose from "mongoose";
import {GetTokenUser, GetUserFromToken} from "./UserController.js";
import {GetProfileById} from "./ProfileController.js";
import {ObjectId} from "../config.js";

const EmortionEngine = mongoose.model('Emortion', EmortionSchema);
const InsightEngine = mongoose.model('Insight', InsightSchema);
const LoggedInUserUID = "1BE2WmbnyGWETpIuunJ4USPCvLz2";


export function CreateEmortion(req, res) {
    let _emortion = req.body;

    // idToken comes from the client app
    const idToken = req.get("access-token");
    if (idToken == null)
        res.status(401).send("no user token");
    else
        GetTokenUser(idToken, (user, err) => {
            if (err)
                res.status(500).send(err);
            else if (err == null && user == null)
                res.status(204).send("user not found!")
            else if (err == null) {
                const timeNow = new Date();
                _emortion.createdBy = user._id;
                const _expireOpt = _emortion.expireOpt;
                let _expireHours = _expireOpt == 1 ? 3 : _expireOpt == 2 ? 24 : 1; // 0 =1 hour, 1= 3 hours and 2= 24 hours. default = 1 hour
                _emortion.expiresAt = new Date(new Date().setHours(timeNow.getHours() + _expireHours));
                //note: expire-time is expected from the front end! depending on what is selected
                let newEmortion = new EmortionEngine(_emortion);
                newEmortion.save((err, addedEmortion) => {
                    if (err) {
                        console.log("Could not save to mongo!: " + err)
                        res.send(err);
                    } else {
                        res.send(addedEmortion);
                        console.log("Emortion saved to mongo!");
                    }
                })
            }
        })


}

export function GetEmortion(req, res) {
    EmortionEngine.findById({_id: req.params.id}, async (err, emortion) => {
        if (err)
            res.send(err);

        //get the createdBy user of emortion
        let createdByUser = await GetProfileById(emortion.createdBy);
        emortion.createdBy = createdByUser;

        //loggedin user id
        const loggedInUser = await GetUserFromToken(req.get('access-token'));
        if(!loggedInUser)
        {
            res.status(401).send('no access token');
            return
        }

        //if not visible to user, take away secret!
        const isRevealed = await IsEmortionRevealed(emortion._id, loggedInUser?._id);
        if (!isRevealed) {
            emortion.secret = "not revealed";
        }
        res.send(emortion);
    })
}

export function GetUserEmortions(req, res) {

    EmortionEngine.find({createdBy: new ObjectId(req.params.id)},
        async (err, emortions) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                //get the createdBy user of emortion
                for (const item of emortions) {
                    item.createdBy = await GetProfileById(item.createdBy);
                    //get the logged in user
                    const tokenUser = await GetUserFromToken(req.get("access-token"));
                    if (tokenUser == null) {
                        res.status(401).send('no access token');//
                        return;
                    }


                    const isRevealed = await IsEmortionRevealed(item._id, tokenUser?._id);
                    if(!isRevealed)
                        item.secret = null;
                }

                res.send(emortions);
            }
        })
}

export function GetEmortionReacts(req, res){
    console.log(req.params.id);
    EmortionEngine.findById(req.params.id,async (err,emortion)=>{
        let ReactionProfiles = [];
        if(err){
            console.log(err)
            res.send(err);
            return;
        } else{
            for(let i = 0; i<emortion.reactionIds.length;i++){
                const profile = await GetProfileById(emortion.reactionIds[i]);
                ReactionProfiles.push(profile);
            }
        }
        res.send(ReactionProfiles)
    })

}

export function GetInsightReacts(req,res){
    InsightEngine.findById(req.params.id, (err,insights)=>{
        let ReactionProfiles = []
        if(err){
            res.send(err);
            return;
        }
        else{
            for(let i = 0; i<insights.reactionIds.length;i++){
                const profile = GetProfileById(insights.reactionIds[i])
                ReactionProfiles.push(profile)
            }
        }
        res.send(ReactionProfiles)
    })
}

export function StartInsight(req, res) {
    let exists = false;
    const InsightArray = [];
    EmortionEngine.findById({_id: req.params.id},
        async (err, emortion) => {
            if (err) {
                res.send(err);
            } else {
                let currentDateTime = new Date().getTime();
                if(currentDateTime > emortion.expiresAt){
                    res.send("Emortion expired!")
                    console.log("Emortion expired!")
                    return;
                }
                for (let i = 0; i < emortion.insightUIDs.length; i++) {
                    InsightArray.push(emortion.insightUIDs[i]);
                }
            }

            //get the logged in user
            const tokenUser = await GetUserFromToken(req.get("access-token"));
            const loggedInUserId = tokenUser._id.toString();

            if (InsightArray.includes(loggedInUserId)) {
                exists = true;
            }
            if (exists === true) {
                // run insight engine return insight
                InsightEngine.findOne({$and: [{createdBy: new ObjectId(loggedInUserId)}, {emortionId: emortion._id}]}, // check this!!!!
                    (err, insight) => {
                        if (err) {
                            res.send(err);
                        } else {
                            console.log("Emortion Already Answered!")
                            res.send(insight);
                        }
                    })
            } else {
                // run insight engine create insight
                const sendInsight = {
                    createdBy: loggedInUserId,
                    secret: emortion.secret,
                    accuracy: 0,
                    score: 0,
                    hintsTaken: 0,
                    response: "",
                    emortionId: emortion._id,
                }
                let newInsight = new InsightEngine(sendInsight)
                newInsight.save((err, addedInsight) => {
                    if (err) {
                        res.send(err)
                    } else {
                        EmortionEngine.findOneAndUpdate({_id: req.params.id}, {$push: {insightUIDs: loggedInUserId}}, {new: true},
                            (err, updatedEmortion) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    console.log("Emortion has been updated with EmortionInsights ID!")
                                }
                            }
                        )
                        console.log("EmortionInsights has been started!")
                        res.send(addedInsight)
                    }
                })
            }
        })
}

export async function SubmitEmortionInsight(req, res) {
    let matchCounter = 0;
    let answerNumber = 0;
    let timeSubtract = 0;
    let subtractAnswerRank = 0;
    let finalScore = 0;
    let response = req.body.response.split(" ")
    let secret = req.body.secret.split(" ")
    let startTime;
    for (let i = 0; i < response.length; i++) {
        if (response[i] === secret[i]) {
            matchCounter++;
        }
    }

    //get the logged in user
    const tokenUser = await GetUserFromToken(req.get("access-token"));

    if (tokenUser == null) {
        res.status(401).send('no access token');
        return;
    }

    const loggedInUserId = tokenUser._id.toString();

    // Get answer number
    EmortionEngine.findById(req.params.id, async (err, emortion) => {
        answerNumber = emortion?.insightUIDs?.length
        subtractAnswerRank = (answerNumber - 1) * 2;

        //get the logged in user
        const tokenUser = await GetUserFromToken(req.get("access-token"));
        const loggedInUserId = tokenUser._id.toString();

        //get start time
        //check this
        InsightEngine.findOne({$and: [{createdBy: new ObjectId(loggedInUserId)}, {emortionId: req.params.id}]}, (err, insight) => {
            startTime = insight.createdAt
            let currTime = new Date()
            let timeDifferential = Math.abs(currTime - startTime)
            if (timeDifferential >= 10000) {
                timeSubtract = 5;
            }
            if (timeDifferential >= 20000) {
                timeSubtract = 10;
            }
            if (timeDifferential >= 30000) {
                timeSubtract = 15;
            }
            if (timeDifferential >= 40000) {
                timeSubtract = 20;
            }
            if (timeDifferential >= 50000) {
                timeSubtract = 25;
            }
            if (timeDifferential >= 60000) {
                timeSubtract = 30;
            }
            finalScore = (matchCounter * 10) + (10) - (subtractAnswerRank) + (30) - (timeSubtract);
            // console.log(finalScore)
            let returnObj = {
                score: finalScore,
                submittedAt: currTime,
                response: req.body.response,
                accuracy: finalScore / timeSubtract,
                timeTaken: timeDifferential
            }
            InsightEngine.findByIdAndUpdate(insight._id, returnObj, {new: true}, (err, updated) => {
                if (err) {
                    res.send(err)
                }
                console.log("Updated to insight table")
            })
            if (err) {
                res.send(err)
            }
            res.send(returnObj)
            console.log("Submitted Emortion!")
        })
    })
}

export function GetInsightsOfEmortion(req, eRes) {
    //fix this
    InsightEngine.find({emortionId: req.params.id}, async (err, insights) => {
        if (err) {
            eRes.send(err)
        }

        //get the logged in user
        const tokenUser = await GetUserFromToken(req.get("access-token"));
        const loggedInUserId = tokenUser._id.toString();

        //get the createdBy user of emortion
        for (const item of insights) {
            item.createdBy = await GetProfileById(item.createdBy);
        }

        await IsEmortionVisible(req.params.id, loggedInUserId, (res) => {
            if (res) {
                //add the created by users
                eRes.send(insights)
            } else {
                eRes.send([])
            }
        });
    }).limit(req.query.limit)
}

export async function CheckEmortionVisibility(req,res){
    const tokenUser = await GetUserFromToken(req.get('access-token'));
    const isRevealed = await IsEmortionRevealed(req.params.id, tokenUser._id);
    //Checking if it is visible, thus opposite
    res.send(isRevealed);
}

export function GetUserInsight(req, eRes) {
    InsightEngine.find({createdBy: req.params.userId}, async (err, insight) => {
        let VisibleInsights = []
        if (err) {
            eRes.send(err)
        }
        for (let i = 0; i < insight.length; i++) {
            await EmortionEngine.findById(insight[i].emortionId).exec().then(async (emortion) => {
                await IsEmortionVisible(emortion, LoggedInUserUID, (res) => {
                    if (res) {
                        VisibleInsights.push(insight[i])
                    }
                })
            })
        }
        eRes.send(VisibleInsights)
    }).limit(req.query.limit)
}

export async function ReactInsight(req, res) {
    const userToken = req.get('access-token');
    const loggedInUser = await GetUserFromToken(userToken);

    InsightEngine.findByIdAndUpdate(req.params.id, {$push: {reactionIds: loggedInUser?._id}}, {new: true},
        (err, updated) => {
            if (err) {
                res.send(err)
            } else {
                console.log("Reacted to EmortionInsights!")
                res.send(updated)
            }
        })
}

export function TakeHint(req, res) {
    InsightEngine.findByIdAndUpdate(req.params.id, {$inc: {hintsTaken: 1}}, {new: true},
        (err, updated) => {
            if (err) {
                res.send(err);
            } else {
                console.log("Hint Taken!")
                res.send(updated)
            }
        })
}

export async function ReactEmortion(req, res) {
    const userToken = req.get('access-token');
    const loggedInUser = await GetUserFromToken(userToken);

    EmortionEngine.findById(req.params.id,(err, emortion)=>{
        if(emortion.reactionIds.includes(loggedInUser?._id.toString())){
            //remove it
            EmortionEngine.findByIdAndUpdate(req.params.id, {$pull: {reactionIds: loggedInUser?._id}}, {new: true},
                (err, updated) => {
                    if (err) {
                        res.send(err);
                        return;
                    } else {
                        console.log("Reacted to Emortion!")
                        res.send(updated);
                        return;
                    }
                })
        }
        else {
            EmortionEngine.findByIdAndUpdate(req.params.id, {$push: {reactionIds: loggedInUser?._id}}, {new: true},
                (err, updated) => {
                    if (err) {
                        res.send(err);
                        return;
                    } else {
                        console.log("Reacted to Emortion!")//
                        res.send(updated)
                        return;

                    }
                })
        }
    })


}

async function IsEmortionVisible(emortionID, UID, callBack) {
    const InsightArray = []
    const query = EmortionEngine.findById(emortionID).exec();
    await query.then((emortion) => {
        if (!emortion) {
            return callBack(false)
        }
        if (emortion.createdBy === UID) {
            return callBack(true)
        }
        if (emortion.expiresAt < new Date()) {
            return callBack(true)
        }
        for (let i = 0; i < emortion.insightUIDs.length; i++) {
            InsightArray.push(emortion.insightUIDs[i]);
        }
        if (InsightArray.includes(UID)) {
            return callBack(true)
        }
        return callBack(false)
    })
}

async function IsEmortionRevealed(emortionID, UID) {
    const InsightArray = []
    const emortion = await EmortionEngine.findById(emortionID).exec();

    if (!emortion) {
        return false
    }

    if (emortion.createdBy.toString() == UID.toString()) {
        return true
    }
    if (emortion.expiresAt < new Date()) {
        return true
    }
    /*for (let i = 0; i < emortion.insightUIDs.length; i++) {
        InsightArray.push(emortion.insightUIDs[i]);
    }*/
    if (emortion?.insightUIDs.includes(UID)) {
        return true
    }
    return false

}


