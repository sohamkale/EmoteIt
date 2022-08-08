import {EmortionEngine} from "../models/EmortionSchema.js";
import {InsightEngine} from "../models/InsightSchema.js";
import {UserEngine} from "../models/UserSchema.js";
import {FriendshipEngine} from "../models/FriendshipSchema.js";
import {GetUserFromToken} from "./UserController.js";

export function GetStats (req,res){
    // CODE FOR FRIDAY TO FRIDAY
    // get next friday
    // let dayOfWeek = 5;//friday
    // let nextFriday = new Date();
    // let diff = nextFriday.getDay() - dayOfWeek;
    // if (diff > 0) {
    //     nextFriday.setDate(nextFriday.getDate() + 6);
    // }
    // else if (diff < 0) {
    //     nextFriday.setDate(nextFriday.getDate() + ((-1) * diff))
    // }
    // // prev friday
    // const t = new Date().getDate() + (6 - new Date().getDay() - 1)  - (new Date().getDay() === 6 ? 0 : 7);
    // const lastFriday = new Date();
    // lastFriday.setDate(t);
    //{createdAt: {$gte:lastFriday, $lte:nextFriday}} // FILTER FOR FRIDAY TO FRIDAY
    EmortionEngine.find({}, (err, emortion)=>{
        let emortionCount;
        let insightCount;
        let userCount;
        let relationCount;
        if(err){
            res.send(err);
        }
        emortionCount = emortion.length;
        InsightEngine.find({}, (err,insight)=>{
            if(err){
                res.send(err);
            }
            insightCount = insight.length;
            UserEngine.find({}, (err,user)=>{
                if(err){
                    res.send(err);
                }
                userCount = user.length
                FriendshipEngine.find({$and:[{typeId:1}, {statusId:1}]},
                    (err,friends)=>{
                    if(err){
                        res.send(err);
                    }
                    relationCount = friends.length;
                    res.send({
                        emortionCount: emortionCount,
                        insightCount:insightCount,
                        newUserCount:userCount,
                        newRelationshipCount:relationCount
                    })
                })
            })
        })
    })
}

export function GlobalLeaderboard(req,res){
    UserEngine.find({}).sort({score: -1}).limit(10).then((users)=>{
        if(!users){
            res.send("403 ERROR")
            return;
        }
        res.send(users)
        return;
    })
}

export function FriendshipLeaderboard(req, res) {
    const token = req.get('access-token')
    GetUserFromToken(token).then((loggedInUser)=>{
        FriendshipEngine.find({$and: [{$or: [{requesterUserId: loggedInUser._id}, {requesteeUserId: loggedInUser._id}]}, {statusId: 1}, {typeId: 1}]}).populate(['requesterUserId','requesteeUserId'])
            .then((friends)=>{
                let trueFriends = []

                for(let i = 0; i<friends.length;i++){
                    let friend;
                    if (friends[i].requesteeUserId?._id.toString() === loggedInUser?._id.toString())
                        friend = friends[i].requesterUserId;
                    else if (friends[i].requesterUserId?._id.toString() === loggedInUser?._id.toString())
                        friend = friends[i].requesteeUserId;
                    trueFriends.push(friend);

                }
                trueFriends = trueFriends.sort((x,y)=>y.score-x.score)
                res.send(trueFriends);
            })
    })
}
