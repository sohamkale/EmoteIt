import {GetUserFromToken} from "./UserController.js";
import {EmortionEngine} from "../models/EmortionSchema.js";
import {InsightEngine} from "../models/InsightSchema.js";
import {FriendshipEngine} from "../models/FriendshipSchema.js";
import {ObjectId} from "../config.js";
import {UserEngine} from "../models/UserSchema.js";
import {GetEmortion, IsEmortionRevealed} from "./EmortionController.js";
import {LevelEngine} from "../models/LevelSchema.js";

//search profiles
export function SearchProfiles(req, res) {
    const searchParam = req.query.key;
    UserEngine.find({$or: [{name: {$regex: new RegExp(searchParam, "i")}}, {email: {$regex: new RegExp(searchParam, "i")}}]},).limit(req.query.limit)
        .then((users) => {
            res.send(users);
        });

}

export function GetProfile(req, res) {
    const searchId = req.params.id;
    UserEngine.findOne({_id: searchId}).then(async (user) => {
        // const tokenUser = await GetUserFromToken(userToken);
        if (!user) {
            res.status(404).send({message: 'object not retrieved'});
            return;
        }
        const userId = user._id;

        //POST LIKES
        EmortionEngine.find({createdBy: userId}).sort({createdAt: -1})
            .then((emortions) => {
                let latestActive = null;
                let emortionLikes = 0;
                let emortionCount = emortions.length;
                if (emortionCount > 0)
                    latestActive = emortions[0].createdAt;
                for (let i = 0; i < emortions.length; i++) {
                    emortionLikes = emortionLikes + emortions[i].reactionIds.length;
                }


                //ANSWER LIKES
                //INSIGHT COUNT
                InsightEngine.find({createdBy: userId}).sort({submittedAt: -1})
                    .then((insights) => {
                        let insightLikes = 0;
                        let insightCount = insights.length;
                        let AccuracySum = 0;

                        if (insightCount > 0) {
                            if (latestActive == null || latestActive < insights[0].submittedAt)
                                latestActive = insights[0].submittedAt;
                        }
                        for (let i = 0; i < insights.length; i++) {
                            insightLikes = insightLikes + insights[i].reactionIds.length;
                            AccuracySum = AccuracySum + insights[i].accuracy;
                        }
                        let avgAccuracy = AccuracySum / insightCount;
                        //FRIENDSHIP COUNT!
                        FriendshipEngine.find({$and: [{$or: [{requesterUserId: userId}, {requesteeUserId: userId}]}, {status: 1}]})
                            .then((friendships) => {
                                let relationshipCount = friendships.length;
                                //LEVEL
                                LevelEngine.find({}).where('minScore').gt(user.score).then((levels) => {
                                    const userLevel = levels[0];
                                    let globalRank = -1;
                                    //GLOBAL RANK
                                    UserEngine.find({}).sort({score: -1})
                                        .then((users) => {
                                            users.forEach((x, index) => {
                                                if (x._id.toString() === userId.toString()) {
                                                    globalRank = index + 1;
                                                    let avgAnswerTime = user.totalAnswerTimeMs / insightCount;

                                                    //completed! Now send back the data!
                                                    const finalObject = {
                                                        latestActive,
                                                        globalRank,
                                                        userLevel,
                                                        relationshipCount,
                                                        avgAccuracy,
                                                        avgAnswerTime,
                                                        insightCount,
                                                        insightLikes,
                                                        emortionCount,
                                                        emortionLikes,
                                                        user
                                                    }
                                                    res.send(finalObject);
                                                    return;
                                                }
                                            })
                                        })
                                })
                            })
                    })
            })


    })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        )
}

//Get User's Emortions and Insights for Profile
export function GetUserEmortions(req, res) {
    const _userId = req.params.id;
    if (!_userId) {
        res.status(500).send('user not retrieved');
        return;
    }
    //get logged in user
    const token = req.get('access-token');
    if (!token) {
        res.status(401).send('no token provided');
        return;
    }

    GetUserFromToken(token)
        .then((loggedInUser) => {
            if (!loggedInUser) {
                res.status(401).send('logged in user not retrieved');
                return;
            }
            //Sort createdAt:-1, limit: req.query.limit, for items get profile,
            EmortionEngine.find({createdBy: new ObjectId(_userId)}).populate(['createdBy', 'reactionIds']).sort({createdAt: -1}).limit(req.query.limit)
                .then(async (emortions) => {
                    if (!emortions) {
                        res.status(401).send('logged in user not retrieved');
                        return;
                    }
                    for (const emortion of emortions) {
                        const revealed = await IsEmortionRevealed(emortion._id, loggedInUser._id);
                        if (!revealed) {
                            emortion.secret = null
                        }
                    }
                    res.send(emortions);
                })
        })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        )
}

export function BestEmortion(req, res) {
    let UID = req.params.id;
    EmortionEngine.find({createdBy: new ObjectId(UID)})
        .then(async (emortions) => {
            if (!emortions || emortions.length == 0) {
                res.send({});
                return;
            }
            let bestEmortion = emortions[0];
            for (let i = 1; i < emortions.length; i++) {
                if (bestEmortion.insightUIds.length < emortions[i].insightUIds.length) {
                    bestEmortion = emortions[i];
                }
            }
            req.params.id = bestEmortion?._id;
            GetEmortion(req, res);
        })
}

export function GetUserInsights(req, res) {
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
            InsightEngine.find({createdBy: new ObjectId(req.params.id)}).limit(req.query.limit).populate(['createdBy', 'reactionIds'])
                .then(async (insights) => {
                    let visibleInsights = []
                    if (!insights) {
                        res.status(404).send({message: 'object not retrieved'});
                        return;
                    }
                    for (let i = 0; i < insights.length; i++) {
                        const revealed = await IsEmortionRevealed(insights[i].emortionId, loggedInUser?._id);
                        if (revealed) {
                            visibleInsights.push(insights[i]);
                        }
                    }
                    res.send(visibleInsights)
                })
        })
        .catch((err) => {
                console.log(`token user error: ${err}`);
                res.status(500).send(err);
            }
        )
}



