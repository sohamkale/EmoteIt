import {EmortionEngine} from "../models/EmortionSchema.js";
import {InsightEngine} from "../models/InsightSchema.js";
import {CreateNotification, GetUserFromToken} from "./UserController.js";
import {ObjectId} from "../config.js";
import {UserEngine} from "../models/UserSchema.js";


//EMORTION START
export function CreateEmortion(req, res) {
    let _emortion = req.body;

    // idToken comes from the client app
    const token = req.get("access-token");
    if (token == null) {
        res.status(401).send({message: "no user token"});
        return;
    }

    GetUserFromToken(token)
        .then((loggedInUser) => {
                if (!loggedInUser) {
                    res.status(401).send({message: 'logged in user not retrieved'});
                    return;
                }
                _emortion.createdBy = loggedInUser._id;

                //note: expire-time is expected from the front end! depending on what is selected
                let newEmortion = new EmortionEngine(_emortion);
                newEmortion.save().then((addedEmortion) => {
                    res.send(addedEmortion);
                }).catch((err) => {
                        console.log(`error adding emortion: ${err}`);
                        res.status(500).send(err);
                    }
                )
            }
        ).catch((err) => {
            console.log(`token user error: ${err}`);
            res.status(500).send(err);
        }
    )
}

export function GetEmortion(req, res) {
    //get logged in user
    const token = req.get('access-token');
    if (!token) {
        res.status(401).send('no token provided');
        return;
    }
    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send({message: 'logged in user not retrieved'});
                return;
            }

            EmortionEngine.findById(req.params.id)
                .populate(['createdBy', 'reactionIds'])
                .then(async (emortion) => {
                    if (!emortion) {
                        res.status(404).send({message: 'object not retrieved'});
                        return;
                    }

                    const revealed = await IsEmortionRevealed(emortion._id, loggedInUser._id);
                    if (!revealed) {
                        //remove secret
                        emortion.secret = null
                    }
                    res.send(emortion);
                }).catch((err) => {
                    console.log(`error adding emortion: ${err}`);
                    res.status(500).send(err);
                }
            )
        })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        );

}

export async function ReactEmortion(req, res) {
    //get logged in user
    const token = req.get('access-token');
    if (!token) {
        res.status(401).send('no token provided');
        return;
    }
    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send({message: 'logged in user not retrieved'});
                return;
            }
            EmortionEngine.findById(req.params.id).then((emortion) => {
                if (!emortion) {
                    res.status(404).send({message: 'object not retrieved'});
                    return;
                }
                if (emortion.reactionIds.includes(loggedInUser?._id.toString())) {
                    //remove it
                    EmortionEngine.findByIdAndUpdate(req.params.id, {$pull: {reactionIds: loggedInUser?._id}}, {new: true})
                        .then((updated) => {
                            res.send(updated);
                        }).catch((err) => {
                            console.log(`error reacting emortion: ${err}`);
                            res.status(500).send(err);
                        }
                    )
                } else {
                    EmortionEngine.findByIdAndUpdate(req.params.id, {$push: {reactionIds: loggedInUser?._id}}, {new: true})
                        .then((updated) => {
                            //add notification to user

                            res.send(updated);
                            CreateNotification(`${loggedInUser?.name} reacted to your emortion`,
                                emortion.createdBy,`emortion/${emortion?._id}`)   }).catch((err) => {
                            console.log(`error reacting emortion: ${err}`);
                            res.status(500).send(err);
                        }
                    )
                }
            })
        })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        );
}

export async function IsEmortionRevealed(emortionID, userId) {
    const emortion = await EmortionEngine.findById(emortionID).exec();

    if (!emortion) {
        return false
    }

    if (emortion.createdBy.toString() === userId.toString()) {
        return true
    }
    if (emortion.expiresAt < new Date()) {
        return true
    }
    /*for (let i = 0; i < emortion.insightUIds.length; i++) {
        InsightArray.push(emortion.insightUIds[i]);
    }*/
    if (emortion?.insightUIds.includes(userId)) {
        return true
    }
    return false

}

//EMORTION END


//INSIGHT START
export function StartInsight(req, res) {
    let exists = false;
    // token comes from the client app
    const token = req.get("access-token");
    if (token == null) {
        res.status(401).send({message: "no user token"});
        return;
    }
    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send({message: 'logged in user not retrieved'});
                return;
            }
            EmortionEngine.findById({_id: req.params.id})
                .then((emortion) => {
                    if (!emortion) {
                        res.status(404).send({message: 'object not retrieved'});
                        return;
                    }

                    let currentDateTime = new Date();
                    if (currentDateTime > emortion.expiresAt) {
                        res.status(403).send({message: "emortion expired!"})
                        return;
                    }

                    if (emortion.insightUIds.includes(loggedInUser?._id)) {
                        exists = true;
                    }
                    if (exists === true) {
                        // run insight engine return insight
                        InsightEngine.findOne({$and: [{createdBy: loggedInUser?._id}, {emortionId: emortion._id}]})
                            .then((insight) => {
                                if (!insight) {
                                    res.status(404).send({message: 'object not retrieved'});
                                    return;
                                }
                                res.send(insight);
                                return;
                            })
                    } else {
                        // run insight engine create insight
                        let _responseString = [];
                        const split = emortion.secret?.split(' ');

                        for (let sIndex = 0; sIndex < split?.length; sIndex++) {
                            let filler = "_";
                            filler = filler.repeat(split[sIndex].length);
                            _responseString.push(filler);
                        }

                        // show 3 radnom letters
                        for (let i = 0; i < 3; i++) {
                            const _randomWordIndex = randomInt(0, _responseString.length-1);
                            let _word = _responseString[_randomWordIndex];
                            const _randomCharIndex = randomInt(0,_word.length-1);
                            // console.log(`${_randomWordIndex}, ${_randomCharIndex}`)
                            _word = _word.substring(0, _randomCharIndex) + split[_randomWordIndex][_randomCharIndex] + _word.substring(_randomCharIndex + 1);
                            _responseString[_randomWordIndex] = _word;
                        }

                        const insight = {
                            createdBy: loggedInUser?._id,
                            secret: emortion.secret,
                            accuracy: 0,
                            score: 0,
                            hintsTaken: 0,
                            response: _responseString,
                            emortionId: emortion._id,
                        }
                        let newInsight = new InsightEngine(insight)
                        newInsight.save()
                            .then((addedInsight) => {
                                EmortionEngine.findOneAndUpdate({_id: req.params.id}, {$push: {insightUIds: loggedInUser?._id.toString()}}, {new: true})
                                    .then(() => {
                                        res.send(addedInsight);
                                    })
                                    .catch((err) => {
                                            console.log(`error adding insight: ${err}`);
                                            res.status(500).send(err);
                                        }
                                    )

                            })
                            .catch((err) => {
                                    console.log(`error adding insight: ${err}`);
                                    res.status(500).send(err);
                                }
                            )
                    }
                })
                .catch((err) => {
                        console.log(`error starting insight: ${err}`);
                        res.status(500).send(err);
                    }
                )
        })
        .catch((err) => {
            console.log(`token user error: ${err}`);
            res.status(500).send(err);
        })
}

function randomInt(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export function TakeHintForInsight(req, res) {
    InsightEngine.findById(req.params.id).then((insight) => {
        if (!insight) {
            res.status(404).send({message: 'object not retrieved'});
            return;
        }
        insight.hintsTaken = 4;
        const _split = insight.secret.split(' ');
        let _responseArray = [];
        for (let sIndex = 0; sIndex < _split?.length; sIndex++) {
            let filler = "_";
            filler = filler.repeat(_split[sIndex].length);
            _responseArray.push(filler);
        }
        for (let i = 0; i < insight.secret.length / 2; i++) {
            const _randomWordIndex = randomInt(0, _responseArray.length-1);
            let _word = _responseArray[_randomWordIndex];
            const _randomCharIndex = randomInt(0,_word.length-1);
            // console.log(`${_randomWordIndex}, ${_randomCharIndex}`)
            _word = _word.substring(0, _randomCharIndex) + _split[_randomWordIndex][_randomCharIndex] + _word.substring(_randomCharIndex + 1);
            _responseArray[_randomWordIndex] = _word;
        }
        // console.log(_responseArray);
        insight.response = _responseArray;
        InsightEngine.findByIdAndUpdate(insight._id, insight, {new:true})
            .then((updated)=>{
                // console.log(updated)
                res.send(updated)
            })
    })
}

export async function SubmitInsight(req, res) {

    // idToken comes from the client app
    const token = req.get("access-token");
    if (token == null) {
        res.status(401).send({message: "no user token"});
        return;
    }

    let matchCounter = 0;
    let answerNumber = 0;
    let timeSubtract = 0;
    let subtractAnswerRank = 0;
    let finalScore = 0;
    let response = req.body.response
    let secret = req.body.secret?.split(' ');
    let startTime;

    for (let i = 0; i < response.length; i++) {
        if (response[i].toLowerCase() === secret[i].toLowerCase()) {
            matchCounter++;
        }
    }

    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send({message: 'logged in user not retrieved'});
                return;
            }

            // Get answer number
            EmortionEngine.findById(req.params.id)
                .then((emortion) => {
                    if (!emortion) {
                        res.status(404).send({message: 'object not retrieved'});
                        return;
                    }
                    answerNumber = emortion?.insightUIds?.length
                    subtractAnswerRank = (answerNumber - 1) * 2;

                    //get start time
                    InsightEngine.findOne({$and: [{createdBy: loggedInUser?._id}, {emortionId: req.params.id}]})
                        .then((insight) => {
                            if (!insight) {
                                res.status(404).send({message: 'object not retrieved'});
                                return;
                            }

                            startTime = insight.createdAt
                            let currTime = new Date()
                            let timeDifferential = Math.abs(currTime - startTime)

                            if (timeDifferential > 63000) {
                                res.status(500).send({message: "emortion expired"});
                                return;
                            }

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
                            if (timeDifferential === 55000) {
                                timeSubtract = 30;
                            }

                            finalScore = (matchCounter * 10) + (10) - (subtractAnswerRank) + (30) - (timeSubtract);
                            finalScore -= (insight.hintsTaken * 5); // each hint taken deduct 5 points
                            let returnObj = {
                                score: finalScore,
                                submittedAt: currTime,
                                response: req.body.response,
                                accuracy: matchCounter / secret.length,
                                timeTaken: timeDifferential,
                                deviceId: req.body.deviceId
                            }
                            InsightEngine.findByIdAndUpdate(insight._id.toString(), returnObj, {new: true})
                                .then(() => {

                                    //add the score to the user
                                    UserEngine.findByIdAndUpdate(loggedInUser?._id, {
                                        $inc: {
                                            score: finalScore,
                                            totalAnswerTimeMs: timeDifferential
                                        }
                                    }, {new: true})
                                        .then((finalUpdate) => {
                                            CreateNotification(`${loggedInUser?.name} submitted insight to your emortion`,
                                                emortion.createdBy,`emortion/${emortion?._id}`)
                                            res.send(finalUpdate);
                                        })
                                        .catch((err) => {
                                                console.log(`error submitting insight: ${err}`);
                                                res.status(500).send(err);
                                            }
                                        )
                                })
                                .catch((err) => {
                                        console.log(`error submitting insight: ${err}`);
                                        res.status(500).send(err);
                                    }
                                )
                        })
                        .catch((err) => {
                                console.log(`error submitting insight: ${err}`);
                                res.status(500).send(err);
                            }
                        )
                })
                .catch((err) => {
                        console.log(`error submitting insight: ${err}`);
                        res.status(500).send(err);
                    }
                )
        })
        .catch((err) => {
            console.log(`token user error: ${err}`);
            res.status(500).send(err);
        })
}

export function GetInsights(req, res) {
    const token = req.get('access-token');
    if (!token) {
        res.status(401).send('no token provided');
        return;
    }
    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send({message: 'logged in user not retrieved'});
                return;
            }
            InsightEngine.find({$and:[{emortionId: new ObjectId(req.params.id)},{submittedAt:{$ne:null}}]}).limit(req.query.limit).populate(['createdBy', 'reactionIds'])
                .then(async (insights) => {
                    if (!insights) {
                        res.status(404).send({message: 'object not retrieved'});
                        return;
                    }
                    const revealed = await IsEmortionRevealed(req.params.id, loggedInUser?._id);
                    if (!revealed) {
                        res.send([]);
                        return;
                    }
                    res.send(insights);
                })
                .catch((err) => {
                        console.log(`error obtaining insights of emortion: ${err}`);
                        res.status(500).send(err);
                    }
                )
        }).catch((err) => {
            console.log(`token user error: ${err}`);
            res.status(500).send(err);
        }
    );
}

export async function ReactInsight(req, res) {
    const token = req.get("access-token");
    if (token == null) {
        res.status(401).send({message: "no user token"});
        return;
    }

    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send({message: 'logged in user not retrieved'});
                return;
            }

            InsightEngine.findById(req.params.id).then((insight) => {
                if (insight.reactionIds.includes(loggedInUser?._id.toString())) {
                    //remove it
                    InsightEngine.findByIdAndUpdate(req.params.id, {$pull: {reactionIds: loggedInUser?._id}}, {new: true})
                        .then((updated) => {
                            res.send(updated);
                            return;
                        })
                        .catch((err) => {
                                console.log(`error reacting insight: ${err}`);
                                res.status(500).send(err);
                            }
                        )
                } else {
                    InsightEngine.findByIdAndUpdate(req.params.id, {$push: {reactionIds: loggedInUser?._id}}, {new: true})
                        .then((updated) => {
                            CreateNotification(`${loggedInUser?.name} reacted to your insight`,
                                insight.createdBy,`emortion/${insight?.emortionId}`)
                            res.send(updated);
                            return;
                        })
                        .catch((err) => {
                                console.log(`error reacting insight: ${err}`);
                                res.status(500).send(err);
                            }
                        )
                }
            })
        })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        )


}

export function GetDailyEmortion(req,res) {
    const dailyUser = new ObjectId("62ef72a49ce46d98e5cf3602");
    //Get the date range
    //End of today
    const todayEnd = new Date();
    todayEnd.setUTCHours(23,59,59,0);
    const token = req.get("access-token");
    if (token == null) {
        res.status(401).send({message: "no user token"});
        return;
    }
    GetUserFromToken(token).then((loggedInUser)=>{
        if (!loggedInUser) {
            res.status(401).send({message: 'logged in user not retrieved'});
            return;
        }
        EmortionEngine.findOne({$and:[{expiresAt: todayEnd}, {createdBy:dailyUser}]}).populate(['createdBy', 'reactionIds']).then(
            async (emortion)=>{
                if(!emortion){
                    res.send("Daily Emortion not found")
                    return;
                }
                const revealed = await IsEmortionRevealed(emortion._id, loggedInUser._id);
                if (!revealed) {
                    //remove secret
                    emortion.secret = null
                }
                res.send(emortion)
            }
        )
    })
}


//INSIGHT END

//end of emortion controller
















