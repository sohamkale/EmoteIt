import mongoose from "mongoose";
import {UserSchema} from "../models/UserSchema.js";
import {NotificationSchema} from "../models/NotificationSchema.js";
import {GetTokenUser} from "./UserController.js";
import {EmortionSchema} from "../models/EmortionSchema.js";
import {InsightSchema} from "../models/InsightSchema.js";
import {FriendshipSchema} from "../models/FriendshipSchema.js";
import {LevelScehema} from "../models/LevelSchema";

export const UserEngine = mongoose.model('User', UserSchema);
const NotificationEngine = mongoose.model('Notification', NotificationSchema);
const EmortionEngine = mongoose.model('Emortion', EmortionSchema);
const InsightEngine = mongoose.model('Insight', InsightSchema);
const FriendshipEngine = mongoose.model('Friendship', FriendshipSchema);
const LevelEngine = mongoose.model('Level', LevelScehema);

export function SearchProfiles(req, res){
    const searchParam = req.query.key;
    UserEngine.find({$or:[{name:{$regex:new RegExp(searchParam,"i")}}, {email:{$regex:new RegExp(searchParam,"i")}}]},(err,users)=>{
        res.send(users);
    }).limit(req.query.limit);

}

export function GetProfile(req, res){
    const searchId = req.params.id;
    UserEngine.findOne({_id:searchId}).then((user,err)=>{
        res.send(user);
    }).catch((err)=>{
        res.status(500).send(err);
    })
}


//Notification Stuff
//TODO: CreateNotification(userId, msg, typeId, subjectId)
//TODO: Create the notification with the provided message, typeId, and subjectId
//TODO: Find the user of the given userId and push the newly created notificationId to the array of notificationIds

export function CreateNotification(userId,msg,typeId,subjectId) {
    let notificationObject = {
        message: msg,
        userId: userId,
        typeId: typeId,
        subjectId: subjectId
    }
    let newNotification = new NotificationEngine(notificationObject);
    newNotification.save({new:true},(err,addNotification)=>{
        if(err){
            console.log("Could not create notification!:" + err)
            res.send(err);
        }
        UserEngine.findOneAndUpdate(userId, {$push: {notificationIds:addNotification.id}},{new:true}, (err, updatedUser)=>{
            if(err)
                return err
            console.log("Added to array" + addNotification.id)
            return addNotification.id
        })
        console.log("Notification created");
    })
}

//TODO: GetNotifications(req, res)
//TODO: req should contain variable: userId as parameter
//TODO: Find the user with the given userId. Get the notifications Ids of the user, store it in a variable
//TODO: Foreach of those notifs get the notification objects from database and return it as response.

export function GetNotifications(req, res){

    const accessToken = req.get("access-token");
    GetTokenUser(accessToken, (user, err)=>{
        if(!user)
            res.status(401).send("user not retrieved!")
        else{
           NotificationEngine.find({userId: user._id},(err,notifications)=>{
               res.send(notifications);
           }).limit(req.query.limit);
        }

    })

}

//TODO: UpdateNotifications(req, res)
//TODO: req should contain variable: notifId as parameter
//TODO: Find the notification with the provided id and update the seen variable to true

export function UpdateNotifications(req, res){
    NotificationEngine.findByIdAndUpdate(req.body._id, {seen:true},{new:true},
        (err, updatedNotification)=>{
            if(err)
                res.send(err);
            res.send(updatedNotification);
        })
}


//TODO:: Takes in a straight mongo db table user object and performs the calculations and returns an extended user object!
// Putki Amar
export function ProcessProfileStats(userId, userScore){
    //POST LIKES
    EmortionEngine.find({createdBy: userId}, (err, emortions)=>{
        let postLikes = 0;
        let postCount = emortions.length;
        for(let i = 0; i<emortions.length;i++){
            postLikes = postLikes+emortions[i].reactionIds.length;
        }
        //ANSWER LIKES
        //INSIGHT COUNT
        InsightEngine.find({createdBy: UID},(err,insights)=>{
            let answerLikes = 0;
            let insightCount = insights.length;
            let AnswerTimeSum = 0;
            let AccuracySum = 0;
            for(let i = 0; i<insightCount.length; i++){
                answerLikes = answerLikes+insights[i].reactionIds.length;
                AnswerTimeSum = AnswerTimeSum + insights[i].timeTaken;
                AccuracySum = AccuracySum+insights[i].accuracy;
            }
            let avgAnswerTime = AnswerTimeSum/insightCount;
            let avgAccuracy = AccuracySum/insightCount;
            //FRIENDSHIP COUNT!
            FriendshipEngine.find({$and:[{$or:[{requesterUserId: userId},{requesteeUserId: userId}]}, {status:1}]}, (err,friendships)=>{
                let happyFriendCount = friendships.length;
                //LEVEL
                LevelEngine.find({},(err,levels)=>{
                    const userLevel = levels[0];
                    //GLOBAL RANK
                    UserEngine.find({},(err, users)=>{

                    }).sort({score:-1})
                }).where(minScore).gt(userScore)
            })
        })
    })
}

