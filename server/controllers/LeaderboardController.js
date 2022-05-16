import mongoose from "mongoose"
import {UserSchema} from "../models/UserSchema.js";
import {EmortionSchema} from "../models/EmortionSchema.js";
import {InsightSchema} from "../models/InsightSchema.js";
import {FriendshipSchema} from "../models/FriendshipSchema.js";
const UserEngine = mongoose.model('User', UserSchema)
const EmortionEngine = mongoose.model('Emortion', EmortionSchema)
const InsightEngine = mongoose.model('Insight', InsightSchema)
const FriendshipEngine = mongoose.model('Friendship', FriendshipSchema)
export function GetStats (req,res){
    // get next friday
    let dayOfWeek = 5;//friday
    let nextFriday = new Date();
    let diff = nextFriday.getDay() - dayOfWeek;
    if (diff > 0) {
        nextFriday.setDate(nextFriday.getDate() + 6);
    }
    else if (diff < 0) {
        nextFriday.setDate(nextFriday.getDate() + ((-1) * diff))
    }
    // prev friday
    const t = new Date().getDate() + (6 - new Date().getDay() - 1)  - (new Date().getDay() === 6 ? 0 : 7);
    const lastFriday = new Date();
    lastFriday.setDate(t);
    EmortionEngine.find({createdAt: {$gte:lastFriday, $lte:nextFriday}}, (err, emortion)=>{
        let emortionCount;
        let insightCount;
        let userCount;
        let relationCount;
        if(err){
            res.send(err);
        }
        emortionCount = emortion.length;
        InsightEngine.find({createdAt: {$gte:lastFriday, $lte:nextFriday}}, (err,insight)=>{
            if(err){
                res.send(err);
            }
            insightCount = insight.length;
            UserEngine.find({createdAt:{$gte:lastFriday, $lte:nextFriday}}, (err,user)=>{
                if(err){
                    res.send(err);
                }
                userCount = user.length
                FriendshipEngine.find({$and:[{typeId:1}, {statusId:1}, {createdAt:{$gte:lastFriday, $lte:nextFriday}}]},
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
export function TopThree(req,res){
   InsightEngine.aggregate([ {
        $group: {
            _id: "$createdBy",
            total: {$sum: "$score"}
        }
    }],
        (err,result)=>{
            if(err){
                res.send(err);
            }
            else{
                res.send(result)
            }
       }
   )
}