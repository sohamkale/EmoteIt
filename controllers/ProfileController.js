import mongoose from "mongoose";
import {UserSchema} from "../models/UserSchema.js";
import {NotificationSchema} from "../models/NotificationSchema.js";
import {GetTokenUser} from "./UserController.js";

export const UserEngine = mongoose.model('User', UserSchema);
const NotificationEngine = mongoose.model('Notification', NotificationSchema);

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
export function ProcessProfileStats(user){

}
