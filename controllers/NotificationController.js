import {NotificationSchema} from "../models/NotificationSchema";
import mongoose from "mongoose"
const NotificationEngine = mongoose.model('Notification', NotificationSchema);


//TODO: CreateNotification(userId, msg, typeId, subjectId)
//TODO: Create the notification with the provided message, typeId, and subjectId
//TODO: Find the user of the given userId and push the newly created notificationId to the array of notificationIds



//TODO: GetNotifications(req, res)
//TODO: req should contain variable: userId as parameter
//TODO: Find the user with the given userId. Get the notifications Ids of the user, store it in a variable
//TODO: Foreach of those notifs get the notification objects from database and return it as response.


//TODO: UpdateNotifications(req, res)
//TODO: req should contain variable: notifId as parameter
//TODO: Find the notification with the provided id and update the seen variable to true
/*
export function  GetNotifications(req, res){
    NotificationEngine.find({},(err,notifications)=>{
        if(err)
            res.send(err);
        res.send(notifications);
    })
}*/
