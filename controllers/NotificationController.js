import {NotificationSchema} from "../models/NotificationSchema.js";
import {UserEngine} from "../controllers/UserController.js";
import mongoose from "mongoose"
const NotificationEngine = mongoose.model('Notification', NotificationSchema);


//TODO: CreateNotification(userId, msg, typeId, subjectId)
//TODO: Create the notification with the provided message, typeId, and subjectId
//TODO: Find the user of the given userId and push the newly created notificationId to the array of notificationIds

export function createNotification(userId,msg,typeId,subjectId) {
    let notificationId;
    let notificationObject = {
        seen: false,
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
        console.log("Notification created");
        notificationId = addNotification.id;
        console.log(notificationId + " NID")
        console.log(userId + " UID")
    })
    UserEngine.findByIdAndUpdate(userId, {$push: {notificationIds: {id: notificationId}}},{new:true})
}

//TODO: GetNotifications(req, res)
//TODO: req should contain variable: userId as parameter
//TODO: Find the user with the given userId. Get the notifications Ids of the user, store it in a variable
//TODO: Foreach of those notifs get the notification objects from database and return it as response.

export function GetNotification(req, res){
    // scan user database with the userId in req.userid?
}

//TODO: UpdateNotifications(req, res)
//TODO: req should contain variable: notifId as parameter
//TODO: Find the notification with the provided id and update the seen variable to true

export function UpdateNotifications(req, res){
    NotificationEngine.findByIdAndUpdate(req.params.id, {seen:true},{new:true},
        (err, updatedNotification)=>{
            if(err)
                res.send(err);
            res.send(updatedNotification);
        })
}
