import {NotificationSchema} from "../models/NotificationSchema";
import mongoose from "mongoose"
const NotificationEngine = mongoose.model('Notification', NotificationSchema);
export function  GetNotifications(req, res){
    NotificationEngine.find({},(err,notifications)=>{
        if(err)
            res.send(err);
        res.send(notifications);
    })
}