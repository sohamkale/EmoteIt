import {EmortionSchema} from "../models/EmortionSchema.js";
import {InsightSchema} from "../models/InsightSchema.js";
import mongoose from "mongoose";

const EmortionEngine = mongoose.model('Emortion', EmortionSchema);
const InsightEngine = mongoose.model('Insight', InsightSchema);
const LoggedInUserUID = "1BE2WmbnyGWETpIuunJ4USPCvLz2";

export function CreateEmortion(req, res) {
    let _emortion = req.body;
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

export function GetEmortion(req, res) {
    EmortionEngine.findById({_id: req.params.id},
        (err, emortion) => {
            if (err)
                res.send(err)
            res.send(emortion);
        })
}

export function GetUserEmortions(req, res) {
    EmortionEngine.find({createdBy: req.params.id},
        (err, emortion) => {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                console.log("Emortions found!")
                res.send(emortion)
            }
        })
}

export function StartInsight(req, res) {
    let exists = false;
    const InsightArray = [];
    EmortionEngine.findById({_id: req.params.id},
        (err, emortion) => {
            if (err) {
                res.send(err);
            } else {
                for (var i = 0; i < emortion.insightUIDs.length; i++) {
                    InsightArray.push(emortion.insightUIDs[i]);
                }
            }
            if (InsightArray.includes(LoggedInUserUID)) {
                exists = true;
            }
            if (exists === true) {
                // run insight engine return insight
                InsightEngine.find({emortionId: emortion._id, createdBy: LoggedInUserUID},
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
                    createdBy: LoggedInUserUID,
                    secret: emortion.secret,
                    accuracy: 0,
                    score: 0,
                    response: "",
                    emortionId: emortion._id,
                }
                let newInsight = new InsightEngine(sendInsight)
                newInsight.save((err, addedInsight) => {
                    if (err) {
                        res.send(err)
                    } else {
                        EmortionEngine.findOneAndUpdate({_id: req.params.id}, {$push: {insightUIDs: LoggedInUserUID}}, {new: true},
                            (err, updatedEmortion) => {
                                if (err) {
                                    res.send(err);
                                } else {
                                    console.log("Emortion has been updated with Insight ID!")
                                }
                            }
                        )
                        console.log("Insight has been started!")
                        res.send(addedInsight)
                    }
                })
            }
        })
}

export function SubmitEmortionInsight(req, res) {
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
    // Get answer number
    EmortionEngine.findById(req.params.emortionId, (err, emortion) => {
        answerNumber = emortion?.insightUIDs?.length
        subtractAnswerRank = (answerNumber - 1) * 2;

        //get start time
        InsightEngine.find({createdBy: LoggedInUserUID, emortionId: req.params.emortionId}, (err, insight) => {
            startTime = insight[0].createdAt
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
            console.log(finalScore)
            let returnObj = {
                score: finalScore,
                submittedAt: currTime,
                accuracy: finalScore / timeSubtract
            }
            InsightEngine.findByIdAndUpdate(insight[0]._id, returnObj, {new: true}, (err, updated) => {
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
    InsightEngine.find({emortionId: req.params.emortionId}, async (err, insight) => {
        if (err) {
            eRes.send(err)
        }
        await IsEmortionVisible(req.params.emortionId, LoggedInUserUID, (res) => {
            if (res) {
                eRes.send(insight)
            } else {
                eRes.send([])
            }
        });
    }).limit(req.query.limit)
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
        if (emortion.expireTime < new Date()) {
            return callBack(true)
        }
        for (var i = 0; i < emortion.insightUIDs.length; i++) {
            InsightArray.push(emortion.insightUIDs[i]);
        }
        if (InsightArray.includes(UID)) {
            return callBack(true)
        }
        return callBack(false)
    })
}

