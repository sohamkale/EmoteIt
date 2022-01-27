import {GetNotification, UpdateNotifications, createNotification} from "../controllers/NotificationController.js";

export default function notificationRoutes(server){
    server.route('/notifications') // param stuff use to get data edit data to reflect param
        .post((req,res) =>{
        const data = GetNotification();
        res.send(data);
    })
    server.route('/notifications/:id')
        .put(UpdateNotifications)
    server.route('/notifications/:user')
        .post(GetNotification)
}